// SPDX-License-Identifier: MIT
pragma solidity = 0.6.12;

import "@openzeppelin/contracts/access/AccessControl.sol";
import "./WatchStorage.sol";

import { ERC165 } from "@openzeppelin/contracts/introspection/ERC165.sol";

contract WatchTowerProxy is WatchStorage, AccessControl, ERC165 {

    address internal _implementation;
    bool public pauseProxy;

    event Upgraded(address indexed implementation);
    event ChangedStore(address indexed store);

    modifier onlyOwner() {
        require(hasRole(DEFAULT_ADMIN_ROLE, msg.sender), "WatchTowerProxy: msg.sender is not an admin");
        _;
    }

    constructor(
        address _impl,
        address _seigManager,
        address _layer2Registry
    ) public {
        require(
            _impl != address(0)
            || _seigManager != address(0)
            || _layer2Registry != address(0) ,
            "WatchTowerProxy: input is zero"
        );
        _implementation = _impl;
        seigManager = ISeigManager(_seigManager);
        layer2Registry = ILayer2Registry(_layer2Registry);

        _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _setupRole(DEFAULT_ADMIN_ROLE, address(this));
    }

    /// @notice Set pause state
    /// @param _pause true:pause or false:resume
    function setProxyPause(bool _pause) external onlyOwner {
        pauseProxy = _pause;
    }

    /// @notice Set implementation contract
    /// @param impl New implementation contract address
    function upgradeTo(address impl) external onlyOwner {
        require(_implementation != address(0), "WatchTowerProxy: input is zero");
        require(_implementation != impl, "WatchTowerProxy: The input address is same as the state");
        _implementation = impl;
        emit Upgraded(impl);
    }

    function implementation() public view returns (address) {
        return _implementation;
    }

    /*
    fallback () external payable virtual {

        _fallback();
    } */

    fallback () external payable virtual {
        address _impl = implementation();
        require(_impl != address(0) && !pauseProxy, "WatchTowerProxy: impl is zero OR proxy is false");

        assembly {
            // Copy msg.data. We take full control of memory in this inline assembly
            // block because it will not return to Solidity code. We overwrite the
            // Solidity scratch pad at memory position 0.
            calldatacopy(0, 0, calldatasize())

            // Call the implementation.
            // out and outsize are 0 because we don't know the size yet.
            let result := delegatecall(gas(), _impl, 0, calldatasize(), 0, 0)

            // Copy the returned data.
            returndatacopy(0, 0, returndatasize())

            switch result
            // delegatecall returns 0 on error.
            case 0 { revert(0, returndatasize()) }
            default { return(0, returndatasize()) }
        }
    }
}
