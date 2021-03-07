// SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity = 0.6.12;

interface IL2RewardVault {
    function setTON(address _ton) external;
    function setWTON(address _wton) external;
    function approveTON(address _to, uint256 _amount) external;
    function approveWTON(address _to, uint256 _amount) external;
    function approveERC20(address _token, address _to, uint256 _amount) external;
    function claimTON(address _to, uint256 _amount) external;
    function claimWTON(address _to, uint256 _amount) external;
    function claimERC20(address _token, address _to, uint256 _amount) external;
}
