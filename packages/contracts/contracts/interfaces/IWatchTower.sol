// SPDX-License-Identifier: MIT
pragma solidity = 0.6.12;

interface IWatchTower {
    function isZkopru(address) external view returns (bool);
    function addZkopru(address) external ;
    function isRegisteredZkopru(address) external view returns (bool);
}