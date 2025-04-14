// // SPDX-License-Identifier: UNLICENSED
// pragma solidity ^0.8.13;

// import "forge-std/Test.sol";
// import "../src/1x.sol";
// import {IERC20} from "@openzeppelin/contracts/interfaces/IERC20.sol";

// contract ContractTest is Test {
//     Contract public contractInstance;
//     IERC20 public usdc;
//     address public owner;
//     address public user;
//     address public refundAddress;

//     function setUp() public {
//         owner = address(this);
//         user = address(1);
//         refundAddress = address(2);

//         usdc = IERC20(address(new MockERC20("USD Coin", "USDC", 6)));

//         // Mint tokens to user
//         MockERC20(address(usdc)).mint(user, 1_000_000 * 1e6);

//         // Deploy the contract
//         contractInstance = new Contract(address(usdc));

//         // Approve contract to spend user's tokens
//         vm.prank(user);
//         usdc.approve(address(contractInstance), type(uint256).max);
//     }

//     function testCreateOrder() public {
//         uint256 amount = 100 * 1e6;
//         uint256 fee = 5 * 1e6;
//         uint96 rate = 1000;
//         string memory messageHash = "someMessage";

//         vm.prank(user);
//         bytes32 orderId = contractInstance.createOrder(amount, rate, fee, refundAddress, messageHash);

//         Contract.Order memory order = contractInstance.getOrderInfo(orderId);
//         assertEq(order.amount, amount);
//         assertEq(order.senderFee, fee);
//         assertEq(order.rate, rate);
//         assertEq(order.refundAddress, refundAddress);
//         assertEq(order.sender, user);
//         assertFalse(order.isRefunded);
//     }

//     function testRefundOrder() public {
//         uint256 amount = 100 * 1e6;
//         uint256 fee = 5 * 1e6;
//         uint96 rate = 1000;
//         string memory messageHash = "someMessage";

//         vm.prank(user);
//         bytes32 orderId = contractInstance.createOrder(amount, rate, fee, refundAddress, messageHash);

//         uint256 beforeBalance = usdc.balanceOf(refundAddress);
//         contractInstance.refundOrder(orderId);
//         uint256 afterBalance = usdc.balanceOf(refundAddress);

//         assertEq(afterBalance - beforeBalance, amount + fee);

//         Contract.Order memory order = contractInstance.getOrderInfo(orderId);
//         assertTrue(order.isRefunded);
//     }

//     function testWithdraw() public {
//         uint256 amount = 200 * 1e6;

//         vm.prank(user);
//         usdc.transfer(address(contractInstance), amount);

//         uint256 before = usdc.balanceOf(owner);
//         contractInstance.withdraw(owner, amount);
//         uint256 afterBalance = usdc.balanceOf(owner);

//         assertEq(afterBalance - before, amount);
//     }

//     function testPauseAndUnpause() public {
//         contractInstance.pause();
//         vm.expectRevert();
//         vm.prank(user);
//         contractInstance.createOrder(100 * 1e6, 1000, 5 * 1e6, refundAddress, "msg");

//         contractInstance.onPause();
//         vm.prank(user);
//         contractInstance.createOrder(100 * 1e6, 1000, 5 * 1e6, refundAddress, "msg");
//     }
// }

// // Minimal mock ERC20 token
// contract MockERC20 is IERC20 {
//     string public name;
//     string public symbol;
//     uint8 public decimals = 6;
//     uint256 public totalSupply;
//     mapping(address => uint256) public balanceOf;
//     mapping(address => mapping(address => uint256)) public allowance;

//     constructor(string memory _name, string memory _symbol, uint8 _decimals) {
//         name = _name;
//         symbol = _symbol;
//         decimals = _decimals;
//     }

//     function transfer(address to, uint256 amount) public returns (bool) {
//         require(balanceOf[msg.sender] >= amount, "Insufficient");
//         balanceOf[msg.sender] -= amount;
//         balanceOf[to] += amount;
//         return true;
//     }

//     function transferFrom(address from, address to, uint256 amount) public returns (bool) {
//         require(balanceOf[from] >= amount, "Insufficient");
//         require(allowance[from][msg.sender] >= amount, "No allowance");
//         allowance[from][msg.sender] -= amount;
//         balanceOf[from] -= amount;
//         balanceOf[to] += amount;
//         return true;
//     }

//     function approve(address spender, uint256 amount) public returns (bool) {
//         allowance[msg.sender][spender] = amount;
//         return true;
//     }

//     function mint(address to, uint256 amount) public {
//         balanceOf[to] += amount;
//         totalSupply += amount;
//     }
// }
