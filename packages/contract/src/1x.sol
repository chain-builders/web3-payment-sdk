// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.26;

import {IERC20} from "@openzeppelin/contracts/interfaces/IERC20.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {Pausable} from "@openzeppelin/contracts/utils/Pausable.sol";
import {ReentrancyGuard} from "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import {SafeERC20} from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

contract Contract is Ownable, Pausable, ReentrancyGuard {
    using SafeERC20 for IERC20;

    enum Token {
        USDC,
        USDT,
        ETH
    }

    address public immutable usdc;
    address public immutable usdt;

    mapping(address => mapping(Token => uint256)) private users;
    mapping(Token => uint256) public totalFeesCollected;

    event Deposit(address indexed user, Token indexed token, uint256 amount);
    event Payment(
        address indexed from,
        address indexed to,
        Token indexed token,
        uint256 amount,
        bool isFiat
    );
    event Withdraw(
        address indexed user,
        Token indexed token,
        uint256 indexed netAmount,
        uint256 fee,
        bool isFiat
    );
    event InternalTransfer(
        address indexed from,
        address indexed to,
        Token indexed token,
        uint256 amount
    );
    event OwnerTokenWithdraw(
        address indexed token,
        address indexed to,
        uint256 indexed amount
    );
    event Received(address indexed sender, uint256 indexed amount);

    constructor(address _usdc, address _usdt) Ownable(msg.sender) {
        require(
            _usdc != address(0) && _usdt != address(0),
            "Invalid token address"
        );
        usdc = _usdc;
        usdt = _usdt;
    }

    function togglePause() external onlyOwner {
        paused() ? _unpause() : _pause();
    }

    function deposit(
        Token token,
        uint256 amount
    ) external payable nonReentrant whenNotPaused {
        require(
            amount > 0 || (token == Token.ETH && msg.value > 0),
            "Invalid amount"
        );

        if (token == Token.ETH) {
            require(msg.value == amount, "ETH amount mismatch");
        } else {
            address tokenAddr = _getTokenAddress(token);
            IERC20(tokenAddr).safeTransferFrom(
                msg.sender,
                address(this),
                amount
            );
        }

        users[msg.sender][token] += amount;
        emit Deposit(msg.sender, token, amount);
    }

    function pay(
        address to,
        Token token,
        uint256 amount,
        bool isFiat
    ) external nonReentrant whenNotPaused {
        _transferInternal(msg.sender, to, token, amount);
        emit Payment(msg.sender, to, token, amount, isFiat);
    }

    function withdraw(
        Token token,
        uint256 amount,
        bool isFiat
    ) external nonReentrant whenNotPaused {
        _withdrawInternal(token, amount, isFiat);
    }

    function internalTransfer(
        address to,
        Token token,
        uint256 amount
    ) external nonReentrant whenNotPaused {
        _transferInternal(msg.sender, to, token, amount);
        emit InternalTransfer(msg.sender, to, token, amount);
    }

    function getBalance(
        address user,
        Token token
    ) external view returns (uint256) {
        return users[user][token];
    }

    function ownerWithdrawTokens(
        address token,
        uint256 amount,
        address to
    ) external onlyOwner nonReentrant {
        require(to != address(0), "Invalid recipient");
        require(amount > 0, "Invalid amount");

        if (token == address(0)) {
            (bool sent, ) = payable(to).call{value: amount}("");
            require(sent, "ETH transfer failed");
        } else {
            IERC20(token).safeTransfer(to, amount);
        }

        emit OwnerTokenWithdraw(token, to, amount);
    }

    // =============================
    // Internal Helpers
    // =============================

    function _getTokenAddress(Token token) internal view returns (address) {
        if (token == Token.USDC) return usdc;
        if (token == Token.USDT) return usdt;
        revert("Unsupported token");
    }

    function _transferInternal(
        address from,
        address to,
        Token token,
        uint256 amount
    ) internal {
        require(to != address(0), "Invalid recipient");
        require(amount > 0, "Amount must be greater than zero");
<<<<<<< HEAD
        address tokenAddr = _getTokenAddress(token);
        require(users[from][token] >= amount, "Insufficient balance");
        users[from][token] -= amount;
        users[to][token] += amount;
        IERC20(tokenAddr).transferFrom(from, to, amount);
=======
        
        if (token == Token.ETH) {
            require(users[from][token] >= amount, "Insufficient balance");
            users[from][token] -= amount;
            users[to][token] += amount;
        } else {
            // address tokenAddr = _getTokenAddress(token);
            require(users[from][token] >= amount, "Insufficient balance");
            users[from][token] -= amount;
            users[to][token] += amount;
            // IERC20(tokenAddr).safeTransferFrom(from, to, amount);
        }
>>>>>>> e333570f5c1d159db7a8fdaebcf13fc090efe930
    }

    function _withdrawInternal(
        Token token,
        uint256 amount,
        bool isFiat
    ) internal {
        require(amount > 0, "Amount must be greater than zero");
        require(users[msg.sender][token] >= amount, "Insufficient balance");

        uint256 fee = (amount * 5) / 1000;
        uint256 netAmount = amount - fee;

        users[msg.sender][token] -= amount;
        totalFeesCollected[token] += fee;

        if (token == Token.ETH) {
            (bool sent, ) = payable(msg.sender).call{value: netAmount}("");
            require(sent, "ETH transfer failed");
        } else {
            address tokenAddr = _getTokenAddress(token);
            IERC20(tokenAddr).safeTransfer(msg.sender, netAmount);
        }

        emit Withdraw(msg.sender, token, netAmount, fee, isFiat);
    }

    // =============================
    // Fallbacks
    // =============================

    receive() external payable {
        emit Received(msg.sender, msg.value);
    }

    fallback() external payable {
        emit Received(msg.sender, msg.value);
    }
}
