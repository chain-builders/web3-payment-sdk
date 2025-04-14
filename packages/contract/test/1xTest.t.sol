// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Test.sol";
import "../src/1x.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

// Mock USDC token
contract MockUSDC is ERC20 {
    constructor() ERC20("Mock USDC", "mUSDC") {}

    function mint(address to, uint256 amount) external {
        _mint(to, amount);
    }
}

contract ContractTest is Test {
    Contract public contractInstance;
    MockUSDC public usdc;

    address owner = address(this);
    address user1 = address(0x1);
    address user2 = address(0x2);

    function setUp() public {
        usdc = new MockUSDC();
        contractInstance = new Contract(address(usdc));

        // Mint and approve tokens
        usdc.mint(user1, 1_000e6); // 1,000 USDC
        vm.prank(user1);
        usdc.approve(address(contractInstance), type(uint256).max);
    }

    function testDeposit() public {
        vm.prank(user1);
        contractInstance.deposite(500e6);

        assertEq(usdc.balanceOf(address(contractInstance)), 500e6);
        assertEq(contractInstance.getBalance(user1), 500e6);
    }

    function testWithdraw() public {
        vm.prank(user1);
        contractInstance.deposite(1000e6);

        vm.prank(user1);
        contractInstance.withdraw(600e6);

        // Fee: 3 USDC, user receives 597
        assertEq(usdc.balanceOf(user1), 597e6);
        assertEq(contractInstance.getBalance(user1), 400e6); // 1000 - 600
    }

    function testWithdrawFiat() public {
        vm.prank(user1);
        contractInstance.deposite(1000e6);

        vm.prank(user1);
        contractInstance.withdraw(600e6);

        // Fee: 3 USDC, user receives 597
        assertEq(usdc.balanceOf(user1), 597e6);
        assertEq(contractInstance.getBalance(user1), 400e6); // 1000 - 600
    }

    function testPay() public {
        vm.prank(user1);
        contractInstance.deposite(500e6);

        vm.prank(user1);
        contractInstance.pay(user2, 200e6);

        assertEq(contractInstance.getBalance(user1), 300e6);
        assertEq(contractInstance.getBalance(user2), 200e6);
    }

    function testPayFiat() public {
        vm.prank(user1);
        contractInstance.deposite(700e6);

        vm.prank(user1);
        contractInstance.payFiat(user2, 300e6);

        assertEq(contractInstance.getBalance(user1), 400e6);
        assertEq(contractInstance.getBalance(user2), 300e6);
    }

    function testInternalTransfer() public {
        vm.prank(user1);
        contractInstance.deposite(600e6);

        vm.prank(user1);
        contractInstance.internalTransfer(user2, 250e6);

        assertEq(contractInstance.getBalance(user1), 350e6);
        assertEq(contractInstance.getBalance(user2), 250e6);
    }

    function testPauseToggle() public {
        contractInstance.pauseToggle();
        assertTrue(contractInstance.paused());

        vm.expectRevert();
        vm.prank(user1);
        contractInstance.deposite(100e6);

        contractInstance.pauseToggle();
        assertFalse(contractInstance.paused());

        vm.prank(user1);
        contractInstance.deposite(100e6);
    }

    function testInvalidUSDCConstructorReverts() public {
        vm.expectRevert("Invalid USDC address");
        new Contract(address(0));
    }
}
