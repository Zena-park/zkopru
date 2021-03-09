// SPDX-License-Identifier: MIT
pragma solidity = 0.6.12;

interface ITokamakConnector {

  function claim(uint256 amount) external;
  function setL2Rewardmanager(address _l2RewardManager) external;
  function proposeReward(address account) external returns (bool);
  function finalizeReward(address account) external returns (bool);

  function updateSeiginorage() external;
  function connectWatchTower() external;
  function isProposableTokamak(address proposer) external view returns (bool);

  function changeOperator(address _operator) external;
  function setTokamakConnector(
        address layer2Registry,
        address seigManager,
        address l2RewardManager,
        address watchTower
    ) external ;

  function isZkopru() external view returns (bool);
  function operator() external view returns (address);
  function isLayer2() external view returns (bool);
  function currentFork() external view returns (uint256);
  function lastEpoch(uint256 forkNumber) external view returns (uint256);
  function totalStaked() external view returns (uint256 totalsupply);
  function stakedOf(address account) external view returns (uint256 totalsupply);

}
