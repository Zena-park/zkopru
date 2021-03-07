// SPDX-License-Identifier: MIT
pragma solidity = 0.6.12;

interface IL2RewardManager {
    function rewardPerProposal() external view returns (uint256);
    function rewardPerFinalize() external view returns (uint256);
    function rewardPerValidate() external view returns (uint256);
    function minimumForProposal() external view returns (uint256);
    function claim(address _to, uint256 _amount)  external ;
}