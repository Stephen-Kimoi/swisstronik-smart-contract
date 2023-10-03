# SWISSTRONK VOTING SMART CONTRACT 

The contract address is: 0x0B73D490fF0368B4bDF6137F82afAC21E1FB5625 

### Documentation 

The `VotingSystem` smart contract is designed to facilitate a basic voting system on the Ethereum blockchain. This contract ensures that only registered voters can cast their votes and maintains a record of the total votes cast.

## Table of Contents

- [Overview](#overview)
- [Contract Functions](#contract-functions)
  - [Constructor](#constructor)
  - [registerVoter](#registervoter)
  - [vote](#vote)
  - [getCurrentVoteCount](#getcurrentvotecount)
- [Modifiers](#modifiers)
  - [onlyOwner](#onlyowner)
  - [onlyRegisteredVoter](#onlyregisteredvoter)

## Overview

The `VotingSystem` contract has the following key features:

- It allows the contract owner to register new voters.
- Only registered voters can cast their votes.
- Each voter can vote only once.
- The contract maintains a count of the total votes cast.

## Contract Functions

### Constructor

- **constructor(string memory _title)**: This function is the contract's constructor and is called when the contract is deployed. It takes a single argument, `_title`, which is a string representing the title or name of the voting system. The address that deploys the contract becomes the owner of the contract.

### registerVoter

- **function registerVoter(address _voterAddress) public onlyOwner**: This function allows the contract owner to register new voters. It takes the Ethereum address `_voterAddress` as an argument and registers the address as a voter. It checks whether the voter is already registered before registration.

### vote

- **function vote() public onlyRegisteredVoter**: This function allows registered voters to cast their votes. It ensures that a voter can vote only once by checking whether the voter has already voted. When a vote is successfully cast, the total vote count is incremented.

### getCurrentVoteCount

- **function getCurrentVoteCount() public view returns (uint256)**: This function allows anyone to retrieve the current total vote count. It returns the total number of votes that have been cast.

## Modifiers

### onlyOwner

- **modifier onlyOwner()**: This modifier restricts access to certain functions to only the contract owner. It checks whether the sender of the transaction is the owner before allowing the function to execute. If not, it raises an error message.

### onlyRegisteredVoter

- **modifier onlyRegisteredVoter()**: This modifier restricts access to certain functions to only registered voters. It checks whether the sender of the transaction is a registered voter before allowing the function to execute. If not, it raises an error message.

---

This documentation provides an overview of the key functions and modifiers of the `VotingSystem` smart contract. Users of this contract can register voters, cast votes, and retrieve the current vote count. The contract is designed to ensure the integrity of the voting process by allowing only registered voters to participate.
