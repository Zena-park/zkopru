// SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity = 0.6.12;

import { ISeigManager } from "../interfaces/ISeigManager.sol";
import { ILayer2Registry } from "../interfaces/ILayer2Registry.sol";
import { IWatchTower } from "../interfaces/IWatchTower.sol";
import { IL2RewardManager } from "../interfaces/IL2RewardManager.sol";
import { ISeigManager } from "../interfaces/ISeigManager.sol";

/// @title The storage that integrates zkopru and tokamak
contract ZkopruTokamakStorage {

    address public operator;
    string public memo;
    bool public constant isLayer2 = true;
    bool public constant isZkopru = true;

    ILayer2Registry public layer2Registry;
    ISeigManager public seigManager;
    IL2RewardManager public l2RewardManager;
    IWatchTower public watchTower;

    uint256 public rewards;
    uint256 public accumulatedReward;
    mapping(address => uint256) rewardsAccount;
    mapping(address => uint256) accumulatedRewardAccount;

    modifier onlyOperatorOrSeigManager () {
        require(msg.sender == operator || msg.sender == address(seigManager));
        _;
    }
    modifier onlyOperator() {
        require(msg.sender == operator);
        _;
    }
}
