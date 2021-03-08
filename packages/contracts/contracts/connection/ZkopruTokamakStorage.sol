// SPDX-License-Identifier: MIT
pragma solidity = 0.6.12;

import "../lib/Types.sol";

/// @title The storage that integrates zkopru and tokamak
contract ZkopruTokamakStorage {

    address public operator;

    bool public constant isLayer2 = true;
    bool public constant isZkopru = true;

    address public layer2Registry;
    address public seigManager;
    address public l2RewardManager;
    address public watchTower;

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
    modifier nonZero(address _addr) {
        require(_addr != address(0), "WatchLogic: zero address");
        _;
    }

    constructor() public {
        operator = msg.sender;
    }
}
