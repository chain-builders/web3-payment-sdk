// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {IERC20} from "@openzeppelin/contracts/interfaces/IERC20.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {Pausable} from "@openzeppelin/contracts/utils/Pausable.sol";

import "./lib/Error.sol";
import "./lib/Event.sol";

contract Contract is Ownable, Pausable {
    address public immutable USDC_BASE =
        0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913;

    mapping(address userAddress => uint256 amount) users;

    constructor() Ownable(msg.sender) {}

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

    // function payEth(address _to, uint _amount) external whenNotPaused {
    //     require(_to != address(0), "Invalid recipient address");
    //     require(_amount > 0, "Amount must be greater than zero");
    //     require(address(this).balance >= _amount, "Insufficient contract balance");

    //     (uint256 fee, uint256 amountAfterFee) = calculateFee(_amount);

    //     (bool sent, ) = _to.call{value: amountAfterFee}("");
    //     require(sent, "ETH transfer failed");

    //     emit Event.Payment(msg.sender, _to, amountAfterFee);
    // }

    function withdraw(uint256 amount) external whenNotPaused {
        require(amount > 0, "Amount must be greater than zero");
        uint256 balance = users[msg.sender];
        require(balance >= amount, "Insufficient balance");

        uint256 fee = (amount * 5) / 1000; // Calculate 0.5% fee
        uint256 amountAfterFee = amount - fee;

        IERC20 usdc = IERC20(USDC_BASE);
        bool success = usdc.transfer(msg.sender, amountAfterFee);
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

        IERC20 usdc = IERC20(USDC_BASE);
        bool success = usdc.transfer(msg.sender, amountAfterFee);
        require(success, "Transfer failed");

        users[msg.sender] -= amount;

        emit Event.WithdrawFiat(msg.sender, amountAfterFee);
    }
    function deposite(uint256 amount) external whenNotPaused {
        require(amount >= 0, "Amount must be greater than zero");
        IERC20 usdc = IERC20(USDC_BASE);
        uint256 balance = usdc.balanceOf(msg.sender);
        require(balance >= amount, "Insufficient balance");

        uint256 allowance = usdc.allowance(msg.sender, address(this));
        require(
            allowance >= amount,
            "Allowance is less than the donation amount"
        );

        bool success = usdc.transferFrom(msg.sender, address(this), amount);
        require(success, "Transfer failed");

        users[msg.sender] += amount;
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
