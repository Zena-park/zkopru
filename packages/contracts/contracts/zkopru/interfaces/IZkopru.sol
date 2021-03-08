// SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity = 0.6.12;

interface IZkopru {
    function isProposable(address proposerAddr) external view returns (bool);
    function proposeReward(address account) external ;
    function finalizeReward(address account) external ;
    function totalStaked()
        external
        view
        returns (uint256 totalsupply);

    function stakedOf(
        address _account
    )
        external
        view
        returns (uint256 amount);

}