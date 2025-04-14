// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.26;

import "lib/forge-std/src/Script.sol";
import {Contract} from "../src/1x.sol"; // adjust if your contract has a different name

contract Deploy1x is Script {
    function run() external {
        // Load deployer's private key from .env
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");

        // Load USDC address from .env
        address usdc = vm.envAddress("USDC_ADDRESS");

        vm.startBroadcast(deployerPrivateKey);

        // Deploy the contract
        Contract deployed = new Contract(usdc);

        vm.stopBroadcast();

        console.log("1x.sol deployed to:", address(deployed));
    }
}
