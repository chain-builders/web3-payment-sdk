// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.26;

import {IERC20} from "@openzeppelin/contracts/interfaces/IERC20.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {Pausable} from "@openzeppelin/contracts/utils/Pausable.sol";

contract Contract is Ownable, Pausable {
    address public immutable usdc;

    mapping(address => uint256) private users;

    event Deposit(address indexed user, uint256 amount);
    event Payment(
        address indexed from,
        address indexed to,
        uint256 amount,
        bool isFiat
    );
    event Withdraw(
        address indexed user,
        uint256 netAmount,
        uint256 fee,
        bool isFiat
    );
    event InternalTransfer(
        address indexed from,
        address indexed to,
        uint256 amount
    );
    event OwnerTokenWithdraw(
        address indexed token,
        address indexed to,
        uint256 amount
    );

    constructor(address _usdc) Ownable(msg.sender) {
        require(_usdc != address(0), "Invalid USDC address");
        usdc = _usdc;
    }

    /**
     * @notice Toggle pause/unpause (onlyOwner)
     */
    function togglePause() external onlyOwner {
        paused() ? _unpause() : _pause();
    }

    /**
     * @notice Deposit USDC into internal balance
     * @param amount Amount of USDC (must be approved first)
     */
    function deposit(uint256 amount) external whenNotPaused {
        require(amount > 0, "Amount must be greater than zero");

        IERC20 usdcToken = IERC20(usdc);
        require(
            usdcToken.allowance(msg.sender, address(this)) >= amount,
            "Insufficient allowance"
        );

        bool success = usdcToken.transferFrom(
            msg.sender,
            address(this),
            amount
        );
        require(success, "Transfer failed");

        users[msg.sender] += amount;

        emit Deposit(msg.sender, amount);
    }

    /**
     * @notice Pay another user using internal balance
     * @param to Recipient address
     * @param amount Amount to transfer
     * @param isFiat Whether this is a fiat-type payment (for analytics/logs)
     */
    function pay(
        address to,
        uint256 amount,
        bool isFiat
    ) external whenNotPaused {
        _transferInternal(msg.sender, to, amount);
        emit Payment(msg.sender, to, amount, isFiat);
    }

    /**
     * @notice Withdraw from internal balance to wallet (0.5% fee)
     * @param amount Amount to withdraw
     * @param isFiat Whether this is a fiat-type withdrawal (for logs)
     */
    function withdraw(uint256 amount, bool isFiat) external whenNotPaused {
        _withdrawInternal(amount, isFiat);
    }

    /**
     * @notice Transfer internal balance from sender to recipient (system logic)
     * @param to Address to credit
     * @param amount Amount to transfer
     */
    function internalTransfer(
        address to,
        uint256 amount
    ) external whenNotPaused {
        _transferInternal(msg.sender, to, amount);
        emit InternalTransfer(msg.sender, to, amount);
    }

    /**
     * @notice View internal balance of a user
     * @param user Address to query
     */
    function getBalance(address user) external view returns (uint256) {
        return users[user];
    }

    /**
     * @notice Owner can withdraw any ERC20 tokens from contract (e.g. fees, stuck tokens)
     * @param token ERC20 token address
     * @param amount Amount to withdraw
     * @param to Destination address
     */
    function ownerWithdrawTokens(
        address token,
        uint256 amount,
        address to
    ) external onlyOwner {
        require(to != address(0), "Invalid recipient address");
        require(amount > 0, "Amount must be greater than zero");

        IERC20(token).transfer(to, amount);
        emit OwnerTokenWithdraw(token, to, amount);
    }

    // ========================================
    // Internal Helpers
    // ========================================

    function _transferInternal(
        address from,
        address to,
        uint256 amount
    ) internal {
        require(to != address(0), "Invalid recipient");
        require(amount > 0, "Amount must be greater than zero");
        require(users[from] >= amount, "Insufficient balance");

        users[from] -= amount;
        users[to] += amount;
    }

    function _withdrawInternal(uint256 amount, bool isFiat) internal {
        require(amount > 0, "Amount must be greater than zero");
        require(users[msg.sender] >= amount, "Insufficient balance");

        uint256 fee = (amount * 5) / 1000;
        uint256 netAmount = amount - fee;

        IERC20 usdcToken = IERC20(usdc);
        require(usdcToken.transfer(msg.sender, netAmount), "Transfer failed");

        users[msg.sender] -= amount;

        emit Withdraw(msg.sender, netAmount, fee, isFiat);
    }
}
