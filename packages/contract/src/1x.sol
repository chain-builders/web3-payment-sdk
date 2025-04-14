// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {IERC20} from "@openzeppelin/contracts/interfaces/IERC20.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {Pausable} from "@openzeppelin/contracts/utils/Pausable.sol";

import "./lib/Error.sol";
import "./lib/Event.sol";

contract Contract is Ownable, Pausable {
    address public immutable usdc;

    mapping(address userAddress => uint256 amount) users;

    constructor(address _usdc) Ownable(msg.sender) {
        require(_usdc != address(0), "Invalid USDC address");
        usdc = _usdc;
    }

    function pauseToggle() external onlyOwner {
        if (paused()) {
            _unpause();
        } else {
            _pause();
        }
    }

    function pay(address _to, uint256 amount) external whenNotPaused {
        require(_to != address(0), "Invalid recipient address");
        require(amount > 0, "Amount must be greater than zero");

        uint256 balance = users[msg.sender];
        require(balance >= amount, "Insufficient balance");

        users[msg.sender] -= amount;
        users[_to] += amount;

        emit Event.Payment(msg.sender, _to, amount);
    }

    function payFiat(address _to, uint256 amount) external whenNotPaused {
        require(_to != address(0), "Invalid recipient address");
        require(amount > 0, "Amount must be greater than zero");

        uint256 balance = users[msg.sender];
        require(balance >= amount, "Insufficient balance");

        users[msg.sender] -= amount;
        users[_to] += amount;

        emit Event.PaymentFiat(msg.sender, _to, amount);
    }

    function withdraw(uint256 amount) external whenNotPaused {
        require(amount > 0, "Amount must be greater than zero");
        uint256 balance = users[msg.sender];
        require(balance >= amount, "Insufficient balance");

        uint256 fee = (amount * 5) / 1000; // Calculate 0.5% fee
        uint256 amountAfterFee = amount - fee;

        IERC20 usdcToken = IERC20(usdc);
        bool success = usdcToken.transfer(msg.sender, amountAfterFee);
        require(success, "Transfer failed");

        users[msg.sender] -= amount;

        emit Event.Withdraw(msg.sender, amountAfterFee);
    }

    function withdrawFiat(uint256 amount) external whenNotPaused {
        require(amount > 0, "Amount must be greater than zero");
        uint256 balance = users[msg.sender];
        require(balance >= amount, "Insufficient balance");

        uint256 fee = (amount * 5) / 1000; // Calculate 0.5% fee
        uint256 amountAfterFee = amount - fee;

        IERC20 usdcToken = IERC20(usdc);
        bool success = usdcToken.transfer(msg.sender, amountAfterFee);
        require(success, "Transfer failed");

        users[msg.sender] -= amount;

        emit Event.WithdrawFiat(msg.sender, amountAfterFee);
    }
    function deposite(uint256 amount) external whenNotPaused {
        require(amount >= 0, "Amount must be greater than zero");
        IERC20 usdcToken = IERC20(usdc);
        uint256 balance = usdcToken.balanceOf(msg.sender);
        require(balance >= amount, "Insufficient balance");

        uint256 allowance = usdcToken.allowance(msg.sender, address(this));
        require(
            allowance >= amount,
            "Allowance is less than the donation amount"
        );

        bool success = usdcToken.transferFrom(
            msg.sender,
            address(this),
            amount
        );
        require(success, "Transfer failed");

        users[msg.sender] += amount;
    }

    function getBalance(address user) external view returns (uint256) {
        return users[user];
    }

    function internalTransfer(
        address _to,
        uint256 _amount
    ) external whenNotPaused {
        require(_to != address(0), "Invalid recipient address");
        require(_amount > 0, "Amount must be greater than zero");

        uint256 senderBalance = users[msg.sender];
        require(senderBalance >= _amount, "Insufficient balance");

        users[msg.sender] -= _amount;
        users[_to] += _amount;

        emit Event.InternalTransfer(msg.sender, _to, _amount);
    }
}
