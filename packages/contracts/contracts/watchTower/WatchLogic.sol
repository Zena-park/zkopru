// SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity = 0.6.12;

import "@openzeppelin/contracts/access/AccessControl.sol";
import "./WatchStorage.sol";

import { SafeMath } from "@openzeppelin/contracts/math/SafeMath.sol";
import { IZkopruTokamakConnector } from "../interfaces/IZkopruTokamakConnector.sol";

contract WatchLogic is WatchStorage, AccessControl {
    using SafeMath for uint256;

    event AddedZkopru(
        address indexed zkopru
    );

    event AddedWatcher(
        address indexed watcher
    );

    modifier nonZero(address _addr) {
        require(_addr != address(0), "WatchLogic: zero address");
        _;
    }

    modifier onlyOwner() {
        require(hasRole(DEFAULT_ADMIN_ROLE, msg.sender), "WatchTowerProxy: msg.sender is not an admin");
        _;
    }

    /// @notice Set SeigManager contract address
    /// @param _seigManager New SeigManager contract address
    function setSeigManager(address _seigManager) external onlyOwner nonZero(address(_seigManager)) {
        seigManager = ISeigManager(_seigManager);
    }


    function setLayer2Registry(address _layer2Registry) external onlyOwner nonZero(address(_layer2Registry)) {
        layer2Registry = ILayer2Registry(_layer2Registry);
    }

    function totalCountWatchers(uint256 kind) public view returns (uint256) {
        address[] storage info =  watchersByKind[kind];

        return info.length;
    }

    function totalCountLayer2s(uint256 kind) public view returns (uint256){
        address[] storage info =  layer2sByKind[kind];
        return info.length;
    }

     function isRegisteredZkopru(address _zkopru)
        public view nonZero(_zkopru) returns (bool)
     {
        Layer2s storage info = layer2s[_zkopru];

        if(info.kind == Layer2sKind.ZKOPRU) return true;
        else return false;
    }

    function addZkopru(address _zkopru) public nonZero(msg.sender){

        IZkopruTokamakConnector zkopru = IZkopruTokamakConnector(_zkopru);

        require( zkopru.isZkopru(), "WatchTowerProxy: _zkopru is not zkopru" );
        require(
            msg.sender == zkopru.operator()
            || msg.sender == _zkopru, "WatchTowerProxy: sender is not operator" );

        Layer2s storage info = layer2s[msg.sender];
        require(
            info.kind == Layer2sKind.NONE ,
            "WatchTowerProxy: already added zkopru"
        );

        info.kind = Layer2sKind.ZKOPRU;
        // coordinatables[msg.sender] = coordinatable;

        emit AddedZkopru(msg.sender);
    }

    function addWatcher( address _watcher , uint256 _kind ) public {
        require(
            _kind != uint256(Layer2sKind.NONE)
            && _kind < uint256(Layer2sKind.UNDEFINED) ,
            "WatchTowerProxy: kind is NONE "
        );

        Watcher storage info = watchers[_watcher];
        require(
            info.kind == Layer2sKind.NONE,
            "WatchTowerProxy: already added watcher"
        );
        info.kind = Layer2sKind(_kind);

        emit AddedWatcher( _watcher );
    }


}