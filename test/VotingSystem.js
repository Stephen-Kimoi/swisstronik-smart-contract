const { expect } = require('chai');
const { ethers } = require('hardhat');

describe("VotingSystem Contract", function () {
  let votingSystem, owner, voter1, voter2;

  beforeEach(async function () {
    const VotingSystem = await ethers.getContractFactory("VotingSystem"); // Replace with the correct contract name
    votingSystem = await VotingSystem.deploy();
    // await votingSystem.deployed();

    const signers = await ethers.getSigners();
    // owner = signers[0];
    // voter1 = signers[1];
    // voter2 = signers[2];

    owner = "0x13Ef924EB7408e90278B86b659960AFb00DDae61" 
    voter1 = "0x23792579e2979a98D12a33A85e35914079304a56" 
    voter2 = "0xdc4f6EA5856eDa459286e8D0eF42e389D07137Ff"

    // await votingSystem.registerVoter(voter1);
    // await votingSystem.registerVoter(voter2);
  });

  it("should allow registered voters to vote", async function () {
    voter1 = "0x23792579e2979a98D12a33A85e35914079304a56"
    voter2 = "0xdc4f6EA5856eDa459286e8D0eF42e389D07137Ff"
    await expect(votingSystem.connect(voter1).vote())
      .to.emit(votingSystem, "VoteCasted")
      .withArgs(voter1.address);

    await expect(votingSystem.connect(voter2).vote())
      .to.emit(votingSystem, "VoteCasted")
      .withArgs(voter2.address);
  });

  it("should only allow registered voters to vote", async function () {
    await expect(votingSystem.connect(owner).vote()).to.be.revertedWith("Only registered voters can perform this operation");
  });

  it("should only allow a voter to vote once", async function () {
    await votingSystem.connect(voter1).vote();
    await expect(votingSystem.connect(voter1).vote()).to.be.revertedWith("You have already voted");
  });

  it("should retrieve the current vote count", async function () {
    await votingSystem.connect(voter1).vote();
    await votingSystem.connect(voter2).vote();
    const voteCount = await votingSystem.getCurrentVoteCount();
    expect(voteCount.toNumber()).to.equal(2);
  });
});
