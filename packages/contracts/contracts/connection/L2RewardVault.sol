// SPDX-License-Identifier: MIT
pragma solidity = 0.6.12;

import "@openzeppelin/contracts/access/AccessControl.sol";
import { IERC20 } from  "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import { SafeMath } from "@openzeppelin/contracts/math/SafeMath.sol";
import { SafeERC20 } from "@openzeppelin/contracts/token/ERC20/SafeERC20.sol";
import { IWTON } from "../interfaces/IWTON.sol";
import { IL2RewardManager } from "../interfaces/IL2RewardManager.sol";

contract L2RewardVault is AccessControl {
    using SafeMath for uint256;
    using SafeERC20 for IERC20;

    IERC20 public ton;
    IERC20 public wton;
    IL2RewardManager public l2RewardManager;

    //////////////////////////////
    // Events
    //////////////////////////////

    event Claimed(address indexed token, address indexed to, uint256 indexed amount);
    event Approved(address indexed token, address indexed to, uint256 indexed amount);

    modifier onlyOwner() {
        require(hasRole(DEFAULT_ADMIN_ROLE, msg.sender), "L2RewardVault: msg.sender is not an admin");
        _;
    }

    constructor(address _ton, address _wton) public {
        require(_ton != address(0)
            || _wton != address(0),
            "L2RewardVault: input is zero"
        );
        ton = IERC20(_ton);
        wton = IERC20(_wton);

        _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
    }

    /// @notice Set L2RewardManager address
    /// @param _l2RewardVault IL2RewardManager address
    function setL2RewardManager(address _l2RewardVault) external onlyOwner {
        require(_l2RewardVault != address(0), "L2RewardVault: input is zero");
        l2RewardManager = IL2RewardManager(_l2RewardVault);

        _setupRole(DEFAULT_ADMIN_ROLE, _l2RewardVault);
    }

    /// @notice Set TON address
    /// @param _ton TON address
    function setTON(address _ton) external onlyOwner {
        require(_ton != address(0), "L2RewardVault: input is zero");
        ton = IERC20(_ton);
    }

    /// @notice Set WTON address
    /// @param _wton WTON address
    function setWTON(address _wton) external onlyOwner {
        require(_wton != address(0), "L2RewardVault: input is zero");
        wton = IERC20(_wton);
    }

    /// @notice Approves TON to specific address
    /// @param _to Address to be approved
    /// @param _amount Approving TON amount
    function approveTON(address _to, uint256 _amount) external onlyOwner {
        ton.safeApprove(_to, _amount);
        emit Approved(address(ton), _to, _amount);
    }

    /// @notice Approves WTON to specific address
    /// @param _to Address to be approved
    /// @param _amount Approving WTON amount
    function approveWTON(address _to, uint256 _amount) external onlyOwner {
        wton.safeApprove(_to, _amount);
        emit Approved(address(wton), _to, _amount);
    }

    /// @notice Approves ERC20 token to specific address
    /// @param _token Token address
    /// @param _to Address to be approved
    /// @param _amount Approving ERC20 token amount
    function approveERC20(address _token, address _to, uint256 _amount) external onlyOwner {
        IERC20(_token).safeApprove(_to, _amount);
        emit Approved(address(_token), _to, _amount);
    }

    /// @notice Transfers TON to specific address
    /// @param _to Address to receive
    /// @param _amount Transfer TON amount
    function claimTON(address _to, uint256 _amount) external onlyOwner {
        uint256 tonBalance = ton.balanceOf(address(this));
        uint256 wtonBalance = wton.balanceOf(address(this));
        require(
            tonBalance.add(_toWAD(wtonBalance)) >= _amount,
            "L2RewardVault: not enough balance"
        );

        uint256 tonAmount = _amount;
        if (tonBalance < _amount) {
            tonAmount = tonBalance;
            uint256 wtonAmount = _toRAY(_amount.sub(tonBalance));

            require(
                IWTON(address(wton)).swapToTONAndTransfer(_to, wtonAmount),
                "L2RewardVault: failed to swap and transfer wton"
            );
        }

        ton.safeTransfer(_to, tonAmount);
        emit Claimed(address(ton), _to, _amount);
    }

    /// @notice Transfers WTON to specific address
    /// @param _to Address to receive
    /// @param _amount Transfer WTON amount
    function claimWTON(address _to, uint256 _amount) external onlyOwner {
        uint256 tonBalance = ton.balanceOf(address(this));
        uint256 wtonBalance = wton.balanceOf(address(this));
        require(
            _toRAY(tonBalance).add(wtonBalance) >= _amount,
            "L2RewardVault: not enough balance"
        );

        uint256 wtonAmount = _amount;
        if (wtonBalance < _amount) {
            uint256 tonAmount = _toWAD(_amount.sub(wtonBalance));
            wtonAmount = wtonBalance;

            ton.safeApprove(address(wton), tonAmount);
            require(
                IWTON(address(wton)).swapFromTONAndTransfer(_to, tonAmount),
                "L2RewardVault: failed to swap and transfer ton"
            );
        }

        wton.safeTransfer(_to, wtonAmount);
        emit Claimed(address(wton), _to, _amount);
    }

    /// @notice Transfers ERC20 token to specific address
    /// @param _to Address to receive
    /// @param _amount Transfer ERC20 token amount
    function claimERC20(address _token, address _to, uint256 _amount) external onlyOwner {
        require(IERC20(_token).balanceOf(address(this)) >= _amount, "L2RewardVault: not enough balance");
        IERC20(_token).safeTransfer(_to, _amount);
        emit Claimed(address(wton), _to, _amount);
    }

    function _toRAY(uint256 v) internal pure returns (uint256) {
        return v * 10 ** 9;
    }

    function _toWAD(uint256 v) internal pure returns (uint256) {
        return v / 10 ** 9;
    }
}