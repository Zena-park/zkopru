// SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity = 0.6.12;

import { IConsensusProvider } from "./interfaces/IConsensusProvider.sol";
import { ISeigManager } from "../interfaces/ISeigManager.sol";
import { IL2RewardManager } from "../interfaces/IL2RewardManager.sol";
import { IWatchTower } from "../interfaces/IWatchTower.sol";

/**
 * @dev Sample contract to implement for proposer qulification verify.
 */
contract ZkopruTokamakProvider is IConsensusProvider {

    ISeigManager public seigManager;
    IL2RewardManager public l2RewardManager;
    IWatchTower public watchTower;

    constructor(
        address _seigManager,
        address _l2RewardManager,
        address _watchTower
    ) public
    {
        require(
            _seigManager != address(0)
            || _l2RewardManager != address(0)
            || _watchTower != address(0),
            "ZkopruTokamakProvider: input is zero"
        );
        seigManager = ISeigManager(_seigManager);
        l2RewardManager = IL2RewardManager(_l2RewardManager);
        watchTower = IWatchTower(_watchTower);
    }

    modifier validSeigManager() {
        require(address(seigManager) != address(0), "ZkopruTokamakProvider: invalid SeigManagere");
        _;
    }

    function openRoundIfNeeded() public override {
        return;
    }

    function lockForUpgrade(uint roundIndex) public override {
        return;
    }

    /**
     * @notice Only proposers who have staked the tone in the zkopru layer2 can use the propose and finalize function.
     */
    function isProposable(address proposer) public view override returns (bool) {
        require(watchTower.isZkopru(msg.sender), "ZkopruTokamakProvider: unregistered zkopru(sender)");

        if(seigManager.stakeOf(msg.sender, proposer) >= l2RewardManager.minimumForProposal())
            return true;
        else
            return false;
    }

}
