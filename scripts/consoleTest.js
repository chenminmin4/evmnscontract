// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");
const {BigNumber} = require("ethers");

async function main() {
    const factory = await hre.ethers.getContractFactory("Test1");
    const storage = await factory.attach("0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9");
    //const storage = hre.ethers.getContractAt("Test1","0x5FbDB2315678afecb367f032d93F642f64180aa3").;

    //const storage = hre.ethers.getContractAt("Test1","0x5FbDB2315678afecb367f032d93F642f64180aa3");

    const timestamp = await storage.getTimestamp();
    console.log(timestamp);

    const publicTime = await storage.getPublicTime();
    console.log(publicTime);

    const interval = await storage.getPublicInterval(parseInt((Date.now())/1000));
    console.log(`the interval ${interval}`);

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
