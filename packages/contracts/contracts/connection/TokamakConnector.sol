// SPDX-License-Identifier: MIT
pragma solidity = 0.6.12;

import { IL2RewardManager } from "../interfaces/IL2RewardManager.sol";
import { ISeigManager } from "../interfaces/ISeigManager.sol";
import { ILayer2Registry } from "../interfaces/ILayer2Registry.sol";
import { IWatchTower } from "../interfaces/IWatchTower.sol";
import { IERC20 } from  "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import { Storage } from "../zkopru/storage/Storage.sol";
import "./ZkopruTokamakStorage.sol";
import "./ZkopruTokamakEvent.sol";
import "./ConnectRewardBase.sol";

/// @title The connector that integrates zkopru and tokamak
contract TokamakConnector
    is Storage, ZkopruTokamakStorage, ZkopruTokamakEvent, ConnectRewardBase
    {

    function setTokamakConnector(
        address _layer2Registry,
        address _seigManager,
        address _l2RewardManager,
        address _watchTower
    )
        public onlyOperator
    {
        require(
            _layer2Registry != address(0)
            || _seigManager != address(0)
            || _l2RewardManager != address(0)
            || _watchTower != address(0),
            "TokamakConnector: setTokamak input is zero"
        );
        layer2Registry =  _layer2Registry;
        seigManager = _seigManager;
        l2RewardManager = _l2RewardManager;
        watchTower = _watchTower;
    }

    function connectWatchTower()
        public onlyOperator
    {
        /// add zkopru, coordinatable  to watchTower
        IWatchTower(watchTower).addZkopru(address(this));
    }
    /*
    /// For Layer2
    function currentFork() external pure returns (uint256) {
        return 1;
    }
    function lastEpoch(uint256 ) external pure returns (uint256){
        return 1;
    }
    */
    function changeOperator(address _newOperator) external onlyOperatorOrSeigManager {
        operator = _newOperator;
        emit OperatorChanged(_newOperator);
    }

    /// For Seig
    /// @notice Call updateSeigniorage on SeigManager
    /// @return Whether or not the execution succeeded
    function updateSeigniorage() external returns (bool) {
        require(seigManager != address(0), "TokamakConnector: SeigManager is zero");

        return ISeigManager(seigManager).updateSeigniorage();
    }

    /*
    /// @notice Retrieves the total staked balance on this candidate
    /// @return totalsupply Total staked amount on this candidate
    function totalStaked()
        external
        view
        returns (uint256 totalsupply)
    {
        address coinage = _getCoinageToken();
        return IERC20(coinage).totalSupply();
    }

    /// @notice Retrieves the staked balance of the account on this candidate
    /// @param _account Address being retrieved
    /// @return amount The staked balance of the account on this candidate
    function stakedOf(
        address _account
    )
        external
        view
        returns (uint256 amount)
    {
        address coinage = _getCoinageToken();
        return IERC20(coinage).balanceOf(_account);
    }

    function _getCoinageToken() internal view returns (address ) {

        address coinageAddress = ISeigManager(seigManager).coinages(address(this));
        require(coinageAddress != address(0), "TokamakConnector: coinage is zero");

        return coinageAddress;
    }
    */
    function isProposableTokamak(address proposerAddr) public view returns (bool) {
        require(IWatchTower(watchTower).isRegisteredZkopru(address(this)), "TokamakConnector: unregistered zkopru");

        if(ISeigManager(seigManager).stakeOf(address(this), proposerAddr) >= IL2RewardManager(l2RewardManager).minimumForProposal())
            return true;
        else
            return false;
    }

}
