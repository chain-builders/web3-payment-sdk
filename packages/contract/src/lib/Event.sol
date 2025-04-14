// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

library Event {
    event Payment(
        address indexed sender,
        address to,
        uint256 amount
    ); 

    event PaymentFiat(
        address indexed sender,
        address to,
        uint256 amount
    ); 
    
    event Withdraw(
        address indexed to,
        uint256 amount
    );

    event WithdrawFiat(
        address indexed to, 
        uint256 amount
        );

    event InternalTransfer(
        address indexed sender,
        address to,
        uint256 amount
    );
}