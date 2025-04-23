// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.26;

import "../lib/forge-std/src/Script.sol";
import {Contract} from "../src/Approve.sol"; // adjust to where your Contract is

contract DeployScript is Script {
    function setUp() public {}

    function run() public {
        // Load private key from .env or foundry.toml
        // uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");

        address usdc = 0x5dEaC602762362FE5f135FA5904351916053cF70;
        address usdt = 0x323e78f944A9a1FcF3a10efcC5319DBb0bB6e673;
        // address custom_token = 0x6B65cEA034d4f509CBDb7DcFE8B692a8bdD9BfA7;

        vm.startBroadcast();

        Contract contractInstance = new Contract(usdc, usdt);

        vm.stopBroadcast();

        console.log("Contract deployed at:", address(contractInstance));
    }
}
