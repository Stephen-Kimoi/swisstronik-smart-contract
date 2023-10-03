const hre = require("hardhat");
const { encryptDataField, decryptNodeResponse } = require("@swisstronik/swisstronik.js");

const sendShieldedTransaction = async (signer, destination, data, value) => {
    const rpcLink = hre.network.config.url; 

    const [encryptedData] = await encryptDataField(rpcLink, data); 

    return await signer.sendTransaction({
        from: signer.address, 
        to: destination, 
        data: encryptedData, 
        value
    })
}

async function main() {
    const contractAddress = "0x0B73D490fF0368B4bDF6137F82afAC21E1FB5625"

    const [signer] = await hre.ethers.getSigners(); 
    const contractFactory = await hre.ethers.getContractFactory("VotingSystem"); 
    const contract = contractFactory.attach(contractAddress); 

    // Sending shielded transaction 
    const setMessageTx = await sendShieldedTransaction(signer, contractAddress, contract.interface.encodeFunctionData("vote"), 0);
    await setMessageTx.wait();

    console.log("Transaction Receipt: ", setMessageTx);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});