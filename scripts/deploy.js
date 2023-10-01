require("dotenv").config();
const { ethers,network,run } = require("hardhat");


async function main() {
  const simpleStorageFactory = await ethers.getContractFactory("SimpleStorage");
  console.log("deploying....");
  const simpleStorage = await simpleStorageFactory.deploy();
  await simpleStorage.waitForDeployment();
  
  const contractAddress = await simpleStorage.getAddress()
  console.log(`deployed address to : ${contractAddress}`);
  
  //verify not in case network is hardhat;
  //hardhat chain id = 31337
   if(network.config.chainId != 31337 && process.env.ETHERSCAN_API_KEY){
    console.log("Waiting for block confirmations...")
    await simpleStorage.deploymentTransaction().wait(6);
    verify(contractAddress,[]);
   }else{
    console.log("no need to verify hardhar network or etherscan api key is missing");
   }

   //interact with contract 
   const currentValue = await simpleStorage.retrieve();
   console.log(`current value is ${currentValue}`);
    
   const transationResponse = await simpleStorage.store(78);
   await transationResponse.wait(1);

   const updatedValue = await simpleStorage.retrieve();
   console.log(`updated value is ${updatedValue}`);

}


async function verify(contractAddress,args){
       console.log("verifying...");
       try{
        await run("verify:verify",{
            address:contractAddress,
            constructorArgument:args
        })

        console.log("contract verified successfully")

       }catch(e){
         if(e.message.toLowerCase().includes("already verified")){
            console.log("already verified");
         }else{
            console.log(e);
         }
       }
}

main(() => {
  process.exit(0);
}).catch((err) => {
  console.log(err);
  process.exit(1);
});
