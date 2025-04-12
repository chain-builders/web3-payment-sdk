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
    
}