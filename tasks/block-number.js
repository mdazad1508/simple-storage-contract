const {task} = require("hardhat/config");

task("block-number","gives the block number").setAction(
    //hre == require("hardhat");
    async(taskArgs,hre)=>{
        const blockNumber = await hre.ethers.provider.getBlockNumber();
        console.log(`current Block Number : ${blockNumber}`);
    }
)

module.exports={};