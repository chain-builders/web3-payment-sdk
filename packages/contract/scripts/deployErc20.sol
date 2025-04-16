// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "forge-std/Script.sol";
import "../src/CustomToken.sol";

contract DeployCustomToken is Script {
    function run() external {
        // uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        vm.startBroadcast();
        // Deploy the CustomToken contract
        Contract token = new Contract();
        console.log("CustomToken deployed to:", address(token));
        vm.stopBroadcast();
    }
}