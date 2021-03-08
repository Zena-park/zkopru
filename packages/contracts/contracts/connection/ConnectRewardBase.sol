// SPDX-License-Identifier: MIT
pragma solidity = 0.6.12;

import { IL2RewardManager } from "../interfaces/IL2RewardManager.sol";
import "./ZkopruTokamakStorage.sol";
import "./ZkopruTokamakEvent.sol";

contract ConnectRewardBase is ZkopruTokamakStorage, ZkopruTokamakEvent {

    /// @notice Set L2Rewardmanager contract address
    /// @param _l2RewardManager New L2Rewardmanager contract address
    function setL2Rewardmanager(address _l2RewardManager) public onlyOperator {
        require(_l2RewardManager != address(0), "ConnectRewardBase: input is zero");
        l2RewardManager = _l2RewardManager;
    }

    function claim(uint256 amount)
        external
    {
        require(amount > 0, "ConnectRewardBase: amount is zero");
        require(
            rewardsAccount[msg.sender] >= amount
            && rewards >= amount,
            "ConnectRewardBase: balanceOfReward is less than amount"
        );

        rewards -= amount;
        rewardsAccount[msg.sender] -= amount;

        IL2RewardManager(l2RewardManager).claim(msg.sender, amount);

        emit ClaimedReward(msg.sender, amount);
    }

    function totalReward() external view returns (uint256 amount)
    {
        return rewards;
    }

    function balanceOfReward(address account) external view returns (uint256 amount)
    {
        return rewardsAccount[account];
    }

    function proposeReward(address account) external nonZero(l2RewardManager) returns (bool)
    {
        require(msg.sender == address(this), "ConnectRewardBase: proposeReward sender is not accept") ;
        uint256 amount = IL2RewardManager(l2RewardManager).rewardPerProposal();
        if (amount > 0) {
            increaseReward(account, amount);
            return true;
        } else {
            return false;
        }
    }

    function finalizeReward(address account) external nonZero(l2RewardManager) returns (bool)
    {
        require(msg.sender == address(this), "ConnectRewardBase: finalizeReward sender is not accept") ;
        uint256 amount = IL2RewardManager(l2RewardManager).rewardPerFinalize();
        if (amount > 0) {
            increaseReward(account, amount);
            return true;
        } else {
            return false;
        }
    }

    function increaseReward(address account, uint256 amount) internal
    {
        require(amount > 0, "ConnectRewardBase: _increaseReward amount is zero");
        rewards += amount;
        rewardsAccount[account] += amount;
        accumulatedReward += amount;
        accumulatedRewardAccount[account] += amount;

        emit IncreasedReward(account, amount);
    }

    function decreaseReward(address account, uint256 amount) internal
    {
        require(amount > 0, "ConnectRewardBase: _decreaseReward amount is zero");
        rewards -= amount;
        rewardsAccount[account] -= amount;
        accumulatedReward -= amount;
        accumulatedRewardAccount[account] -= amount;

        emit DecreasedReward(account, amount);
    }
}
