// SPDX-License-Identifier: MIT
pragma solidity = 0.6.12;

interface IZkopruTokamakConnector {

  function isZkopru() external view returns (bool);
  function updateSeiginorage() external;
  function conenctTokamak(string memory) external;
  function isProposableTokamak(address proposerAddr) external view returns (bool);

  function operator() external view returns (address);
  function isLayer2() external view returns (bool);
  function currentFork() external view returns (uint256);
  function lastEpoch(uint256 forkNumber) external view returns (uint256);
  function changeOperator(address _operator) external;
}
