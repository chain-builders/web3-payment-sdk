// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.26;

import "forge-std/Test.sol";
import "../src/Approve.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MockERC20 is ERC20 {
    constructor(string memory name, string memory symbol) ERC20(name, symbol) {}

    function mint(address to, uint256 amount) external {
        _mint(to, amount);
    }
}

contract ApproveTest is Test {
    Contract public approveContract;
    MockERC20 public usdc;
    MockERC20 public usdt;
    address public owner;
    address public user;

    function setUp() public {
        owner = address(this);
        user = address(0x123);

        // Deploy mock tokens
        usdc = new MockERC20("USD Coin", "USDC");
        usdt = new MockERC20("Tether", "USDT");

        // Deploy the Approve contract
        approveContract = new Contract(address(usdc), address(usdt));

        // Mint tokens to the user
        usdc.mint(user, 1000 * 10 ** 18);
        usdt.mint(user, 1000 * 10 ** 18);
    }

    function testTransferFrom() public {
        vm.startPrank(user);

        // Approve the contract to spend USDC
        usdc.approve(address(approveContract), 500 * 10 ** 18);

        // Transfer USDC to the contract
        approveContract.transferFrom(Contract.Token.USDC, address(this), 500 * 10 ** 18);

        // Check the user's balance in the contract
        uint256 balance = approveContract.getBalance(user, Contract.Token.USDC);
        assertEq(balance, 500 * 10 ** 18);

        vm.stopPrank();
    }

    function testWithdraw() public {
        vm.startPrank(user);

        // Approve and transfer USDC to the contract
        usdc.approve(address(approveContract), 500 * 10 ** 18);
        approveContract.transferFrom(Contract.Token.USDC, address(this), 500 * 10 ** 18);

        // Withdraw USDC from the contract
        approveContract.withdraw(Contract.Token.USDC);

        // Check the user's balance in the contract
        uint256 balance = approveContract.getBalance(user, Contract.Token.USDC);
        assertEq(balance, 0);

        // Check the user's USDC balance
        uint256 userBalance = usdc.balanceOf(user);
        assertEq(userBalance, 1000 * 10 ** 18);

        vm.stopPrank();
    }

    function testTogglePause() public {
        // Pause the contract
        approveContract.togglePause();
        assertTrue(approveContract.paused());

        // Unpause the contract
        approveContract.togglePause();
        assertFalse(approveContract.paused());
    }

    function testRevertWhenPaused() public {
        // Pause the contract
        approveContract.togglePause();

        vm.startPrank(user);

        // Attempt to transfer tokens while paused
        vm.expectRevert();
        approveContract.transferFrom(Contract.Token.USDC, address(this), 500 * 10 ** 18);

        vm.stopPrank();
    }
}