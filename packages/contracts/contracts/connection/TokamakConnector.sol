// SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity = 0.6.12;

import { ISeigManager } from "../interfaces/ISeigManager.sol";
import { ILayer2Registry } from "../interfaces/ILayer2Registry.sol";
import { IWatchTower } from "../interfaces/IWatchTower.sol";
import { IZkopruTokamakConnector } from "../interfaces/IZkopruTokamakConnector.sol";
import { IERC20 } from  "@openzeppelin/contracts/token/ERC20/IERC20.sol";

import "./ZkopruTokamakStorage.sol";
import "./ZkopruTokamakEvent.sol";

/// @title The connector that integrates zkopru and tokamak
contract TokamakConnector
    is ZkopruTokamakStorage, ZkopruTokamakEvent
    {

    constructor() public {
        operator = msg.sender;
    }

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
        layer2Registry = ILayer2Registry(_layer2Registry);
        seigManager = ISeigManager(_seigManager);
        l2RewardManager = IL2RewardManager(_l2RewardManager);
        watchTower = IWatchTower(_watchTower);
    }

    function conenctTokamak()
        public onlyOperator
    {
        /// add zkopru, coordinatable  to watchTower
        watchTower.addZkopru(address(this));
    }

    /// For Layer2
    function currentFork() external view returns (uint256) {
        return 1;
    }
    function lastEpoch(uint256 forkNumber) external view returns (uint256){
        return 1;
    }

    function changeOperator(address _newOperator) external onlyOperatorOrSeigManager {
        operator = _newOperator;
        emit OperatorChanged(_newOperator);
    }

    /// For Seig
    /// @notice Call updateSeigniorage on SeigManager
    /// @return Whether or not the execution succeeded
    function updateSeigniorage() external returns (bool) {
        require(address(seigManager) != address(0), "TokamakConnector: SeigManager is zero");

        return seigManager.updateSeigniorage();
    }

    /// @notice Retrieves the total staked balance on this candidate
    /// @return totalsupply Total staked amount on this candidate
    function totalStaked()
        external
        view
        returns (uint256 totalsupply)
    {
        IERC20 coinage = _getCoinageToken();
        return coinage.totalSupply();
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
        IERC20 coinage = _getCoinageToken();
        return coinage.balanceOf(_account);
    }

    function _getCoinageToken() internal view returns (IERC20) {

        IERC20 c = IERC20(seigManager.coinages(address(this)));

        require(address(c) != address(0), "TokamakConnector: coinage is zero");

        return c;
    }

    function isProposableTokamak(address proposerAddr) public view returns (bool) {
        require(watchTower.isRegisteredZkopru(address(this)), "TokamakConnector: unregistered zkopru");

        if(seigManager.stakeOf(address(this), proposerAddr) >= l2RewardManager.minimumForProposal())
            return true;
        else
            return false;
    }


}
