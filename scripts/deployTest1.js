// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");
const {BigNumber} = require("ethers");

async function main() {

  if (hre.network.name === "hardhat") {
    console.warn(
        "You are trying to deploy a contract to the Hardhat Network, which" +
        "gets automatically created and destroyed every time. Use the Hardhat" +
        " option '--network localhost'"
    );
  }

  // ethers is available in the global scope
    const [deployer] = await hre.ethers.getSigners();
    console.log(
        "Deploying the contracts with the account:",
        await deployer.getAddress()
    );

  console.log("Account balance:", (await deployer.getBalance()).toString());

  const publicTime = parseInt((Date.now())/1000);
  const publicDate = new Date().toLocaleDateString();

  const lockedAmount = hre.ethers.utils.parseEther("1");

  const Test1 = await hre.ethers.getContractFactory("Test1");
  const test1 = await Test1.deploy(publicTime);

  await test1.deployed();

  console.log(
    ` ${publicDate} deployed to ${test1.address}`
  );

  saveFrontendFiles(test1);

}

function saveFrontendFiles(token) {
  const fs = require("fs");
  const contractsDir = __dirname + "/../frontend/src/contracts";
  if (!fs.existsSync(contractsDir)) {
    fs.mkdirSync(contractsDir);
  }
  fs.writeFileSync(
      contractsDir + "/contract-address.json",
      JSON.stringify({ Token: token.address }, undefined, 2)
  );
  const TokenArtifact = hre.artifacts.readArtifactSync("Test1");
  fs.writeFileSync(
      contractsDir + "/Token.json",
      JSON.stringify(TokenArtifact, null, 2)
  );
}


// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
