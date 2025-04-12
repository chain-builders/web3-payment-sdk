// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {IERC20} from "@openzeppelin/contracts/interfaces/IERC20.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {Pausable} from "@openzeppelin/contracts/utils/Pausable.sol";

import "./lib/Error.sol";
import "./lib/Event.sol";

contract Contract is Ownable, Pausable {
    address public immutable usdc;

    struct Order {
        address sender;
        uint256 senderFee;
        uint96 rate;
        bool  isFulfilled;
        bool isRefunded;
        address refundAddress;
        uint256  amount;
    }

    mapping(bytes32 => Order) private orders;
    mapping(address => uint256) private _nonce;    

    constructor (address _usdc) Ownable(msg.sender) {
        require(_usdc != address(0), "Invalid USDC Address");
        usdc = _usdc;
    }

    function pause() external onlyOwner {
        _pause();
    }

    function onPause() external onlyOwner {
        _unpause();
    }

    function createOrder(
        uint256 _amount,
        uint96 _rate,
        uint256 _senderFee,
        address _refundAddress,
        string calldata messageHash
    ) external whenNotPaused returns (bytes32 orderId) {
        //check that are required

        //validate MessageHash
    	require(bytes(messageHash).length != 0, 'InvalidMessageHash');

        // transfer token from msg.sender to contract
        IERC20(usdc).transferFrom(msg.sender, address(this), _amount + _senderFee);

        // increase users nonce to avoid replay attacks
		_nonce[msg.sender]++;

        	// generate transaction id for the transaction
		orderId = keccak256(abi.encode(msg.sender, _nonce[msg.sender]));

        orders[orderId] = Order({
            sender: msg.sender,
            senderFee: _senderFee,
            rate: _rate,
            isFulfilled: false,
            isRefunded: false,
            refundAddress: _refundAddress,
            amount: _amount
        });

        emit Event.OrderCreate(
            orders[orderId].sender,
            _senderFee,
            _rate,
            orders[orderId].amount,
            messageHash           
        );

        

    }


}
