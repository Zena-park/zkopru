// SPDX-License-Identifier: MIT
pragma solidity = 0.6.12;

import "@openzeppelin/contracts/access/AccessControl.sol";
import { IL2RewardVault } from "../interfaces/IL2RewardVault.sol";
import { IWatchTower } from "../interfaces/IWatchTower.sol";

contract L2RewardManager is AccessControl {

    uint256 public rewardPerProposal;
    uint256 public rewardPerFinalize;
    uint256 public rewardPerValidate;
    uint256 public minimumForProposal;

    IL2RewardVault public l2RewardVault;
    IWatchTower public watchTower;

    modifier onlyOwner() {
        require(hasRole(DEFAULT_ADMIN_ROLE, msg.sender), "L2RewardManager: msg.sender is not an admin");
        _;
    }

    modifier onlyRegisteredZkopru() {
        require(watchTower.isRegisteredZkopru(msg.sender), "L2RewardManager: msg.sender is not a registered zkopru");
        _;
    }

    modifier nonZero(address _addr) {
        require(_addr != address(0), "L2RewardManager: zero address");
        _;
    }

    constructor(
        address _l2RewardVault,
        address _watchTower
    )
        public
    {
        require(
            _l2RewardVault != address(0)
            || _watchTower != address(0) ,
            "L2RewardManager: input is zero"
        );

        l2RewardVault = IL2RewardVault(_l2RewardVault);
        watchTower = IWatchTower(_watchTower);

        rewardPerProposal = 1000000000000000000;
        rewardPerFinalize = 1000000000000000000;
        rewardPerValidate = 1000000000000000000;
        minimumForProposal = 100000000000000000000000000000;

        _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
    }

    function setL2RewardVault(address _l2RewardVault) public onlyOwner nonZero(_l2RewardVault){
        l2RewardVault = IL2RewardVault(_l2RewardVault);
    }

    function claim(address _to, uint256 _amount)
        public nonZero(address(l2RewardVault)) nonZero(address(watchTower)) onlyRegisteredZkopru()
    {

        l2RewardVault.claimTON(_to, _amount) ;
    }

}
