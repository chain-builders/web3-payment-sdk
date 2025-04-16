// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.26;

import "forge-std/Test.sol";
import "../src/1x.sol";
import {IERC20} from "@openzeppelin/contracts/interfaces/IERC20.sol";
import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";

// Mock ERC20 token for testing
contract MockToken is ERC20 {
    constructor(string memory name, string memory symbol) ERC20(name, symbol) {
        _mint(msg.sender, 1000000 * 10**18); // Mint 1M tokens
    }

    function mint(address to, uint256 amount) external {
        _mint(to, amount);
    }
}

contract ContractTest is Test {
    Contract private paymentContract;
    MockToken private usdc;
    MockToken private usdt;
    
    address private owner = address(1);
    address private user1 = address(2);
    address private user2 = address(3);
    
    uint256 private constant INITIAL_BALANCE = 10000 * 10**18;
    
    event Deposit(address indexed user, Contract.Token indexed token, uint256 amount);
    event Payment(
        address indexed from,
        address indexed to,
        Contract.Token indexed token,
        uint256 amount,
        bool isFiat
    );
    event Withdraw(
        address indexed user,
        Contract.Token indexed token,
        uint256 indexed netAmount,
        uint256 fee,
        bool isFiat
    );
    event InternalTransfer(
        address indexed from,
        address indexed to,
        Contract.Token indexed token,
        uint256 amount
    );
    
    function setUp() public {
        vm.startPrank(owner);
        
        // Deploy mock tokens
        usdc = new MockToken("USD Coin", "USDC");
        usdt = new MockToken("USD Tether", "USDT");
        
        // Deploy payment contract
        paymentContract = new Contract(address(usdc), address(usdt));
        
        // Setup user balances
        usdc.transfer(user1, INITIAL_BALANCE);
        usdt.transfer(user1, INITIAL_BALANCE);
        usdc.transfer(user2, INITIAL_BALANCE);
        usdt.transfer(user2, INITIAL_BALANCE);
        
        // Fund contract with ETH
        vm.deal(owner, 100 ether);
        vm.deal(user1, 10 ether);
        vm.deal(user2, 10 ether);
        
        vm.stopPrank();
    }
    
    // =============================
    // Constructor Tests
    // =============================
    
    function testConstructor() public view {
        assertEq(paymentContract.usdc(), address(usdc));
        assertEq(paymentContract.usdt(), address(usdt));
    }
    
    function testConstructorZeroAddress() public {
        vm.expectRevert("Invalid token address");
        new Contract(address(0), address(usdt));
        
        vm.expectRevert("Invalid token address");
        new Contract(address(usdc), address(0));
    }
    
    // =============================
    // Ownership and Pause Tests
    // =============================
    
    function testOwnership() public view {
        assertEq(paymentContract.owner(), owner);
    }
    
    function testTogglePause() public {
        vm.prank(owner);
        paymentContract.togglePause();
        assertTrue(paymentContract.paused());
        
        vm.prank(owner);
        paymentContract.togglePause();
        assertFalse(paymentContract.paused());
    }
    
    function testTogglePauseNotOwner() public {
        vm.prank(user1);
        vm.expectRevert(abi.encodeWithSelector(Ownable.OwnableUnauthorizedAccount.selector, user1));
        paymentContract.togglePause();
    }
    
    // =============================
    // Deposit Tests
    // =============================
    
    function testDepositETH() public {
        uint256 depositAmount = 1 ether;
        
        vm.prank(user1);
        vm.expectEmit(true, true, true, true);
        emit Deposit(user1, Contract.Token.ETH, depositAmount);
        paymentContract.deposit{value: depositAmount}(Contract.Token.ETH, depositAmount);
        
        assertEq(paymentContract.getBalance(user1, Contract.Token.ETH), depositAmount);
    }
    
    function testDepositETHAmountMismatch() public {
        vm.prank(user1);
        vm.expectRevert("ETH amount mismatch");
        paymentContract.deposit{value: 1 ether}(Contract.Token.ETH, 2 ether);
    }
    
    function testDepositUSDC() public {
        uint256 depositAmount = 100 * 10**18;
        
        vm.startPrank(user1);
        usdc.approve(address(paymentContract), depositAmount);
        
        vm.expectEmit(true, true, true, true);
        emit Deposit(user1, Contract.Token.USDC, depositAmount);
        paymentContract.deposit(Contract.Token.USDC, depositAmount);
        vm.stopPrank();
        
        assertEq(paymentContract.getBalance(user1, Contract.Token.USDC), depositAmount);
    }
    
    function testDepositUSDT() public {
        uint256 depositAmount = 100 * 10**18;
        
        vm.startPrank(user1);
        usdt.approve(address(paymentContract), depositAmount);
        
        vm.expectEmit(true, true, true, true);
        emit Deposit(user1, Contract.Token.USDT, depositAmount);
        paymentContract.deposit(Contract.Token.USDT, depositAmount);
        vm.stopPrank();
        
        assertEq(paymentContract.getBalance(user1, Contract.Token.USDT), depositAmount);
    }
    
    function testDepositZeroAmount() public {
        vm.prank(user1);
        vm.expectRevert("Invalid amount");
        paymentContract.deposit(Contract.Token.USDC, 0);
    }
    
    function testDepositWhenPaused() public {
        vm.prank(owner);
        paymentContract.togglePause();
        
        vm.startPrank(user1);
        usdc.approve(address(paymentContract), 100 * 10**18);
        vm.expectRevert();
        paymentContract.deposit(Contract.Token.USDC, 100 * 10**18);
        vm.stopPrank();
    }
    
    // =============================
    // Internal Transfer Tests
    // =============================
    
    function testInternalTransfer() public {
        // First deposit
        uint256 depositAmount = 100 * 10**18;
        vm.startPrank(user1);
        usdc.approve(address(paymentContract), depositAmount);
        paymentContract.deposit(Contract.Token.USDC, depositAmount);
        
        // Then transfer
        uint256 transferAmount = 50 * 10**18;
        vm.expectEmit(true, true, true, true);
        emit InternalTransfer(user1, user2, Contract.Token.USDC, transferAmount);
        paymentContract.internalTransfer(user2, Contract.Token.USDC, transferAmount);
        vm.stopPrank();
        
        assertEq(paymentContract.getBalance(user1, Contract.Token.USDC), depositAmount - transferAmount);
        assertEq(paymentContract.getBalance(user2, Contract.Token.USDC), transferAmount);
    }
    
    function testInternalTransferInsufficientBalance() public {
        vm.prank(user1);
        vm.expectRevert("Insufficient balance");
        paymentContract.internalTransfer(user2, Contract.Token.USDC, 50 * 10**18);
    }
    
    function testInternalTransferToZeroAddress() public {
        uint256 depositAmount = 100 * 10**18;
        vm.startPrank(user1);
        usdc.approve(address(paymentContract), depositAmount);
        paymentContract.deposit(Contract.Token.USDC, depositAmount);
        
        vm.expectRevert("Invalid recipient");
        paymentContract.internalTransfer(address(0), Contract.Token.USDC, 50 * 10**18);
        vm.stopPrank();
    }
    
    function testInternalTransferZeroAmount() public {
        vm.prank(user1);
        vm.expectRevert("Amount must be greater than zero");
        paymentContract.internalTransfer(user2, Contract.Token.USDC, 0);
    }
    
    // =============================
    // Payment Tests
    // =============================
    
    function testPayment() public {
        // First deposit
        uint256 depositAmount = 100 * 10**18;
        vm.startPrank(user1);
        usdc.approve(address(paymentContract), depositAmount);
        paymentContract.deposit(Contract.Token.USDC, depositAmount);
        
        // Then make payment
        uint256 paymentAmount = 50 * 10**18;
        vm.expectEmit(true, true, true, true);
        emit Payment(user1, user2, Contract.Token.USDC, paymentAmount, false);
        paymentContract.pay(user2, Contract.Token.USDC, paymentAmount, false);
        vm.stopPrank();
        
        assertEq(paymentContract.getBalance(user1, Contract.Token.USDC), depositAmount - paymentAmount);
        assertEq(paymentContract.getBalance(user2, Contract.Token.USDC), paymentAmount);
    }
    
    function testPaymentFiat() public {
        // First deposit
        uint256 depositAmount = 100 * 10**18;
        vm.startPrank(user1);
        usdc.approve(address(paymentContract), depositAmount);
        paymentContract.deposit(Contract.Token.USDC, depositAmount);
        
        // Then make payment with isFiat flag
        uint256 paymentAmount = 50 * 10**18;
        vm.expectEmit(true, true, true, true);
        emit Payment(user1, user2, Contract.Token.USDC, paymentAmount, true);
        paymentContract.pay(user2, Contract.Token.USDC, paymentAmount, true);
        vm.stopPrank();
        
        assertEq(paymentContract.getBalance(user1, Contract.Token.USDC), depositAmount - paymentAmount);
        assertEq(paymentContract.getBalance(user2, Contract.Token.USDC), paymentAmount);
    }
    
    // =============================
    // Withdraw Tests
    // =============================
    
    function testWithdrawUSDC() public {
        // First deposit
        uint256 depositAmount = 100 * 10**18;
        vm.startPrank(user1);
        usdc.approve(address(paymentContract), depositAmount);
        paymentContract.deposit(Contract.Token.USDC, depositAmount);
        
        // Then withdraw
        uint256 withdrawAmount = 50 * 10**18;
        uint256 fee = (withdrawAmount * 5) / 1000; // 0.5% fee
        uint256 netAmount = withdrawAmount - fee;
        
        uint256 balanceBefore = usdc.balanceOf(user1);
        
        vm.expectEmit(true, true, true, true);
        emit Withdraw(user1, Contract.Token.USDC, netAmount, fee, false);
        paymentContract.withdraw(Contract.Token.USDC, withdrawAmount, false);
        vm.stopPrank();
        
        // Check balances
        assertEq(paymentContract.getBalance(user1, Contract.Token.USDC), depositAmount - withdrawAmount);
        assertEq(usdc.balanceOf(user1), balanceBefore + netAmount);
        assertEq(paymentContract.totalFeesCollected(Contract.Token.USDC), fee);
    }
    
    function testWithdrawETH() public {
        // First deposit
        uint256 depositAmount = 1 ether;
        vm.startPrank(user1);
        paymentContract.deposit{value: depositAmount}(Contract.Token.ETH, depositAmount);
        
        // Then withdraw
        uint256 withdrawAmount = 0.5 ether;
        uint256 fee = (withdrawAmount * 5) / 1000; // 0.5% fee
        uint256 netAmount = withdrawAmount - fee;
        
        uint256 balanceBefore = address(user1).balance;
        
        vm.expectEmit(true, true, true, true);
        emit Withdraw(user1, Contract.Token.ETH, netAmount, fee, false);
        paymentContract.withdraw(Contract.Token.ETH, withdrawAmount, false);
        vm.stopPrank();
        
        // Check balances
        assertEq(paymentContract.getBalance(user1, Contract.Token.ETH), depositAmount - withdrawAmount);
        assertEq(address(user1).balance, balanceBefore + netAmount);
        assertEq(paymentContract.totalFeesCollected(Contract.Token.ETH), fee);
    }
    
    function testWithdrawInsufficientBalance() public {
        vm.prank(user1);
        vm.expectRevert("Insufficient balance");
        paymentContract.withdraw(Contract.Token.USDC, 100 * 10**18, false);
    }
    
    function testWithdrawZeroAmount() public {
        vm.prank(user1);
        vm.expectRevert("Amount must be greater than zero");
        paymentContract.withdraw(Contract.Token.USDC, 0, false);
    }
    
    // =============================
    // Owner Withdraw Tests
    // =============================
    
    // function testOwnerWithdrawTokens() public {
    //     // Deposit some tokens first to collect fees
    //     uint256 depositAmount = 100 * 10**18;
    //     vm.startPrank(user1);
    //     usdc.approve(address(paymentContract), depositAmount);
    //     paymentContract.deposit(Contract.Token.USDC, depositAmount);
    //     paymentContract.withdraw(Contract.Token.USDC, depositAmount, false);
    //     vm.stopPrank();
        
    //     // Should have some fees collected
    //     uint256 fees = paymentContract.totalFeesCollected(Contract.Token.USDC);
    //     assertTrue(fees > 0);
        
    //     // Transfer some USDC directly to the contract
    //     usdc.transfer(address(paymentContract), 1000 * 10**18);
        
    //     // Owner withdraws
    //     uint256 withdrawAmount = 500 * 10**18;
    //     uint256 ownerBalanceBefore = usdc.balanceOf(owner);
        
    //     vm.prank(owner);
    //     paymentContract.ownerWithdrawTokens(address(usdc), withdrawAmount, owner);
        
    //     assertEq(usdc.balanceOf(owner), ownerBalanceBefore + withdrawAmount);
    // }
    
    function testOwnerWithdrawETH() public {
        // Send ETH to contract
        vm.deal(address(paymentContract), 10 ether);
        
        uint256 withdrawAmount = 5 ether;
        uint256 ownerBalanceBefore = address(owner).balance;
        
        vm.prank(owner);
        paymentContract.ownerWithdrawTokens(address(0), withdrawAmount, owner);
        
        assertEq(address(owner).balance, ownerBalanceBefore + withdrawAmount);
    }
    
    function testOwnerWithdrawNotOwner() public {
        vm.prank(user1);
        vm.expectRevert(abi.encodeWithSelector(Ownable.OwnableUnauthorizedAccount.selector, user1));
        paymentContract.ownerWithdrawTokens(address(usdc), 100 * 10**18, user1);
    }
    
    function testOwnerWithdrawZeroAmount() public {
        vm.prank(owner);
        vm.expectRevert("Invalid amount");
        paymentContract.ownerWithdrawTokens(address(usdc), 0, owner);
    }
    
    function testOwnerWithdrawZeroAddress() public {
        vm.prank(owner);
        vm.expectRevert("Invalid recipient");
        paymentContract.ownerWithdrawTokens(address(usdc), 100 * 10**18, address(0));
    }
    
    // =============================
    // Edge Case Tests
    // =============================
    
    function testDirectEthTransfer() public {
        uint256 amount = 1 ether;
        vm.prank(user1);
        (bool success, ) = address(paymentContract).call{value: amount}("");
        assertTrue(success);
        // This will trigger the receive function, but won't increase user balance
        assertEq(paymentContract.getBalance(user1, Contract.Token.ETH), 0);
    }
    
    function testFallbackFunction() public {
        uint256 amount = 1 ether;
        vm.prank(user1);
        (bool success, ) = address(paymentContract).call{value: amount}(hex"12345678");
        assertTrue(success);
        // Should execute fallback but not increase user balance
        assertEq(paymentContract.getBalance(user1, Contract.Token.ETH), 0);
    }    
    
}