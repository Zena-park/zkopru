// SPDX-License-Identifier: MIT
pragma solidity = 0.6.12;


contract ZkopruTokamakEvent  {

    event OperatorChanged(address _newOperator);

    event ConnectTokamak(
        address indexed deployer,
        address indexed zkopru,
        string  name
        );

    event ClaimedReward(
        address indexed from,
        uint256  amount
        );

    event IncreasedReward(
        address indexed from,
        uint256  amount
        );

    event DecreasedReward(
        address indexed from,
        uint256  amount
        );
}
