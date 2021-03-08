// SPDX-License-Identifier: MIT
pragma solidity = 0.6.12;

import { Watcher, Layer2s , Layer2sKind } from "../lib/Types.sol";

import { ILayer2Registry } from "../interfaces/ILayer2Registry.sol";
import { ISeigManager } from "../interfaces/ISeigManager.sol";

contract WatchStorage {

    ILayer2Registry public layer2Registry;
    ISeigManager public seigManager;
    address public zkopruLayer2Factory;

    mapping(address => Watcher) internal watchers;
    mapping(address => Layer2s) internal layer2s;
    // mapping(address => address) internal coordinatables;


    mapping(uint256 => address[]) internal watchersByKind;
    mapping(uint256 => address[]) internal layer2sByKind;

    modifier validLayer2Registry() {
        require(address(layer2Registry) != address(0), "WatchStorage: invalid Layer2Registry");
        _;
    }

    modifier validSeigManager() {
        require(address(seigManager) != address(0), "WatchStorage: invalid SeigManagere");
        _;
    }


}
