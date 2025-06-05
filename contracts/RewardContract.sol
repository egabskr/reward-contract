// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract RewardContract {
    address public owner;

    mapping(address => uint256) public rewards;

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Not the contract owner");
        _;
    }

    /// @notice Submit ETH as reward for a user (can be called by anyone)
    function submitNFT(address user) external payable {
        require(msg.value > 0, "Must send ETH");
        rewards[user] += msg.value;
    }

    /// @notice Redeem reward by yourself
    function redeem() external {
        uint256 reward = rewards[msg.sender];
        require(reward > 0, "No reward available");

        rewards[msg.sender] = 0;
        payable(msg.sender).transfer(reward);
    }

    /// ✅ Admin-only function: redeem reward on behalf of user
    function redeemFor(address user) external onlyOwner {
        uint256 reward = rewards[user];
        require(reward > 0, "No reward available");

        rewards[user] = 0;
        payable(user).transfer(reward);
    }

    /// Optional helper: contract balance
    function getContractBalance() external view returns (uint256) {
        return address(this).balance;
    }
}
