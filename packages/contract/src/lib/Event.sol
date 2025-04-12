// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

library Event {
    event OrderCreate(
        address indexed sender,
        uint256 senderFee,
        uint256 rate,        
        uint256 amount,
        string messageHash
    );

    event OrderRefunded(
        bytes32 orderId,
        address sender,
        uint256 amount,
        address refundAddress
    );
    
    event Withdraw(
        address to,
        uint256 amount
    )
}