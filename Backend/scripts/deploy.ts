



// import {ethers} from "hardhat";

// async function main() {
//   const currentTimestampInSeconds = Math.round(Date.now() / 1000);
//   const ONE_YEAR_IN_SECS = 365 * 24 * 60 * 60;
//   const unlockTime = currentTimestampInSeconds + ONE_YEAR_IN_SECS;

//   const lockedAmount = ethers.utils.parseEther("1");

//   const Lock = await ethers.getContractFactory("Lock");
//   const lock = await Lock.deploy(unlockTime, { value: lockedAmount });

//   await lock.deployed();

//   console.log(`Lock with 1 ETH and unlock timestamp ${unlockTime} deployed to ${lock.address}`);
// }

// // We recommend this pattern to be able to use async/await everywhere
// // and properly handle errors.
// main().catch((error) => {
//   console.error(error);
//   process.exitCode = 1;
// });


const { ethers } = require("hardhat");


async function main() {
  const TaskManager = await ethers.getContractFactory("Tasks");
  const TaskManagerDeployment = await TaskManager.deploy();
  await TaskManagerDeployment.deployed();

  console.log("Your smart contract is deployed at", TaskManagerDeployment.address);
}

main()
  .then(()=> process.exit(0))
  .catch((error) =>{
    console.error(error);
    process.exitCode= 1;
  });