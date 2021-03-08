// SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity = 0.6.12;

import "../libraries/Types.sol";
import { IConsensusProvider } from "../../consensus/interfaces/IConsensusProvider.sol";
import { SNARK } from "../libraries/SNARK.sol";
import { Storage } from "./Storage.sol";
import { SMT254 } from "../libraries/SMT.sol";
import { ZkopruTokamakStorage } from "../../connection/ZkopruTokamakStorage.sol";

import { IL2RewardManager } from "../../interfaces/IL2RewardManager.sol";
import { ISeigManager } from "../../interfaces/ISeigManager.sol";
import { IWatchTower } from "../../interfaces/IWatchTower.sol";
import { IERC20 } from  "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract Reader is Storage, ZkopruTokamakStorage {
    function genesis() public view returns (bytes32) {
        return chain.genesis;
    }

    function latest() public view returns (bytes32) {
        return chain.latest;
    }

    function proposedBlocks() public view returns (uint256) {
        return chain.proposedBlocks;
    }

    function parentOf(bytes32 header) public view returns (bytes32) {
        return chain.parentOf[header];
    }

    function utxoRootOf(bytes32 header) public view returns (uint256) {
        return chain.utxoRootOf[header];
    }

    function withdrawalRootOf(bytes32 header) public view returns (uint256) {
        return chain.withdrawalRootOf[header];
    }

    function finalizedUTXORoots(bytes32 utxoRoot) public view returns (bool) {
        return chain.finalizedUTXORoots[uint256(utxoRoot)];
    }

    function proposers(address addr) public view returns (uint256 stake, uint256 reward, uint256 exitAllowance) {
        Proposer memory proposer = chain.proposers[addr];
        stake = proposer.stake;
        reward = proposer.reward;
        exitAllowance = proposer.exitAllowance;
    }

    function proposals(bytes32 proposalId) public view returns (bytes32 header, uint256 challengeDue, bool slashed) {
        Proposal memory proposal = chain.proposals[proposalId];
        header = proposal.headerHash;
        challengeDue = proposal.challengeDue;
        slashed = chain.slashed[proposal.headerHash];
    }

    function finalized(bytes32 headerHash) public view returns (bool) {
        return chain.finalized[headerHash];
    }

    function slashed(bytes32 headerHash) public view returns (bool) {
        return chain.slashed[headerHash];
    }

    function stagedDeposits() public view returns (bytes32 merged, uint256 fee) {
        MassDeposit memory massDeposit = chain.stagedDeposits;
        merged = massDeposit.merged;
        fee = massDeposit.fee;
    }

    function stagedSize() public view returns (uint256) {
        return chain.stagedSize;
    }

    function massDepositId() public view returns (uint256) {
        return chain.massDepositId;
    }

    function committedDeposits(bytes32 massDepositHash) public view returns (uint256) {
        return chain.committedDeposits[massDepositHash];
    }

    function withdrawn(bytes32 leaf) public view returns (bool) {
        return chain.withdrawn[leaf];
    }

    function migrations(bytes32 migrationHash) public view returns (bool) {
        return chain.migrations[migrationHash];
    }

    function registeredERC20s(address tokenAddr) public view returns (bool) {
        return chain.registeredERC20s[tokenAddr];
    }

    function registeredERC721s(address tokenAddr) public view returns (bool) {
        return chain.registeredERC721s[tokenAddr];
    }

    function getVk(uint8 numOfInputs, uint8 numOfOutputs) public view returns (
        uint256[2] memory alpha1,
        uint256[2][2] memory beta2,
        uint256[2][2] memory gamma2,
        uint256[2][2] memory delta2,
        uint256[2][] memory ic
    ) {
        uint256 txSig = Types.getSNARKSignature(numOfInputs, numOfOutputs);
        SNARK.VerifyingKey memory vk = vks[txSig];
        alpha1[0] = vk.alpha1.X;
        alpha1[1] = vk.alpha1.Y;
        beta2[0] = vk.beta2.X;
        beta2[1] = vk.beta2.Y;
        gamma2[0] = vk.gamma2.X;
        gamma2[1] = vk.gamma2.Y;
        delta2[0] = vk.delta2.X;
        delta2[1] = vk.delta2.Y;
        ic = new uint256[2][](vk.ic.length);
        for(uint256 i = 0; i < vk.ic.length; i++) {
            ic[i] = [vk.ic[i].X, vk.ic[i].Y];
        }
    }

    function latestProposalBlock(address coordinator) public view returns (uint256) {
        uint256 exitAllowance = chain.proposers[coordinator].exitAllowance;
        return exitAllowance >= CHALLENGE_PERIOD ? exitAllowance - CHALLENGE_PERIOD : 0;
    }

    /**
     * @dev Copy of `isProposable()` in Coordinatable.sol
     */
    /*function isProposable(address proposerAddr) public view returns (bool) {
        Proposer memory  proposer = Storage.chain.proposers[proposerAddr];
        // You can add more consensus logic here
        if (proposer.stake >= MINIMUM_STAKE) {
            return IConsensusProvider(consensusProvider).isProposable(proposerAddr);
        } else {
            return false;
        }
    }*/

    /**
     * @dev Copy of `isValidRef()` in TxValidator.sol
     */
    function isValidRef(bytes32 l2BlockHash, uint256 ref)
    public
    view
    returns (bool)
    {
        if (Storage.chain.finalizedUTXORoots[ref]) {
            return true;
        }
        bytes32 parentBlock = l2BlockHash;
        for (uint256 i = 0; i < REF_DEPTH; i++) {
            parentBlock = Storage.chain.parentOf[parentBlock];
            if (Storage.chain.utxoRootOf[parentBlock] == ref) {
                return true;
            }
        }
        return false;
    }

    function isProposable(address proposerAddr)
    public
    view
    returns (bool) {
        Proposer memory  proposer = Storage.chain.proposers[proposerAddr];

        if(IWatchTower(watchTower).isRegisteredZkopru(address(this))){
            if(ISeigManager(seigManager).stakeOf(address(this), proposerAddr) >= IL2RewardManager(l2RewardManager).minimumForProposal())
                return true;
            else
                return false;
        }else{
            return false;
        }
    }

    function reward(address account)
    public
    view
    returns (uint256) {
        return rewardsAccount[account];
    }

    /// @notice Retrieves the total staked balance on this candidate
    /// @return totalsupply Total staked amount on this candidate
    function totalStaked()
        external
        view
        returns (uint256 totalsupply)
    {
        address coinage = ISeigManager(seigManager).coinages(address(this));
        require(coinage != address(0), "TokamakConnector: coinage is zero");
        return IERC20(coinage).totalSupply();
    }

    function stakedOf(
        address _account
    )
        external
        view
        returns (uint256 amount)
    {
        address coinage = ISeigManager(seigManager).coinages(address(this));
        require(coinage != address(0), "TokamakConnector: coinage is zero");
        return IERC20(coinage).balanceOf(_account);
    }

    function proposeReward(address account) external nonZero(l2RewardManager)
    {
        require(msg.sender == address(this), "TokamakConnector: proposeReward sender is not accept") ;
        uint256 amount = IL2RewardManager(l2RewardManager).rewardPerProposal();
        if (amount > 0) increaseReward(account, amount);
    }

    function finalizeReward(address account) external nonZero(l2RewardManager)
    {
        require(msg.sender == address(this), "ConnectRewardBase: finalizeReward sender is not accept") ;
        uint256 amount = IL2RewardManager(l2RewardManager).rewardPerFinalize();
        if (amount > 0) increaseReward(account, amount);
    }

    function increaseReward(address account, uint256 amount) internal
    {
        require(amount > 0, "TokamakConnector: _increaseReward amount is zero");
        rewards += amount;
        rewardsAccount[account] += amount;
        accumulatedReward += amount;
        accumulatedRewardAccount[account] += amount;
        // emit IncreasedReward(account, amount);
    }

    /// For Layer2
    function currentFork() external pure returns (uint256) { return 1; }
    function lastEpoch(uint256 ) external pure returns (uint256){ return 1; }

}
