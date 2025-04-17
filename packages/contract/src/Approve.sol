// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.26;

import {IERC20} from "@openzeppelin/contracts/interfaces/IERC20.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {Pausable} from "@openzeppelin/contracts/utils/Pausable.sol";
import {ReentrancyGuard} from "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

contract Contract is Ownable, Pausable, ReentrancyGuard {
    enum Token {
        USDC,
        USDT,
        CUSTOM_TOKEN
    }

    address public immutable usdc;
    address public immutable usdt;
    address public immutable custom_token;

    mapping(address => mapping(Token => uint256)) private users;
    mapping(Token => uint256) public totalFeesCollected;

    event TransferFrom(
        address indexed merchant,
        Token indexed token,
        uint256 indexed amount,
        address sender
    );

    event Withdraw(
        address indexed merchant,
        Token indexed token,
        uint256 indexed netAmount,
        uint256 timestamp        
    );

    constructor(
        address _usdc,
        address _usdt,
        address _custom_token
    ) Ownable(msg.sender) {
        require(
            _usdc != address(0) &&
                _usdt != address(0) &&
                _custom_token != address(0),
            "Invalid token address"
        );
        usdc = _usdc;
        usdt = _usdt;
        custom_token = _custom_token;
    }

    function togglePause() external onlyOwner {
        paused() ? _unpause() : _pause();
    }

    function transferFrom(
        Token _token,
        address _merchant,
        uint256 _amount
    ) external payable whenNotPaused nonReentrant {
        require(_amount > 0, "Invalid amount");
        address tokenAddr = _getTokenAddress(_token);
        IERC20(tokenAddr).transferFrom(msg.sender, address(this), _amount);
        users[_merchant][_token] += _amount;

        emit TransferFrom(_merchant, _token, _amount, msg.sender);
    }

    function withdraw(
        Token token,
        uint256 amount
    ) external nonReentrant whenNotPaused {
        _withdrawInternal(token, amount);
    }

    function _withdrawInternal(Token token, uint256 amount) internal {
        require(amount > 0, "Amount must be greater than zero");
        require(users[msg.sender][token] >= amount, "Insufficient balance");

        uint256 fee = (amount * 5) / 1000;
        uint256 netAmount = amount - fee;

        users[msg.sender][token] -= amount;
        totalFeesCollected[token] += fee;

        address tokenAddr = _getTokenAddress(token);
        IERC20(tokenAddr).transfer(msg.sender, netAmount);

        emit Withdraw(msg.sender, token, netAmount, block.timestamp);
    }

    function _getTokenAddress(Token token) internal view returns (address) {
        if (token == Token.USDC) return usdc;
        if (token == Token.USDT) return usdt;
        revert("Unsupported token");
    }
}
