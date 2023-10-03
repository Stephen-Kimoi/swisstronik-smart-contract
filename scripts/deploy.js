const hre = require("hardhat");

async function main() {
  const contract = await hre.ethers.deployContract("VotingSystem", ["MasugeVotersSystem"]);

  await contract.waitForDeployment();

  console.log(`Voting system contract deployed to ${contract.target}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

// Voting system contract deployed to 0x0B73D490fF0368B4bDF6137F82afAC21E1FB5625