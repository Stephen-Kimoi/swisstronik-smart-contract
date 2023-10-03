// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract VotingSystem {
    address private owner;
    uint256 private totalVotes;
    
    struct Voter {
        bool isRegistered;
        bool hasVoted;
    }
    
    mapping(address => Voter) private voters;
    
    // Modifier that only allows the owner to perform a specific function
    modifier onlyOwner() {
        require(msg.sender == owner, "Only the contract owner can perform this operation");
        _;
    }
    
    // Modifier that allows only registered voters to perform the specified action
    modifier onlyRegisteredVoter() {
        require(voters[msg.sender].isRegistered, "Only registered voters can perform this operation");
        _;
    }

    constructor() {
        owner = msg.sender;
    }
    
    // Function for registering/adding new voters
    function registerVoter(address _voterAddress) public onlyOwner {
        require(!voters[_voterAddress].isRegistered, "Voter is already registered");
        voters[_voterAddress].isRegistered = true;
    }

    function vote() public onlyRegisteredVoter {
        require(!voters[msg.sender].hasVoted, "You have already voted");
        voters[msg.sender].hasVoted = true;
        totalVotes++;
    }

    function getCurrentVoteCount() public view returns (uint256) {
        return totalVotes;
    }
}
