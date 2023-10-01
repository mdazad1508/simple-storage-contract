const {assert,expect} = require("chai");
const {ethers} = require("hardhat");


describe("SimpleStorage",()=>{

    let simpleStorageFactory;
    let simpleStorage;
    
    beforeEach(async ()=>{
         simpleStorageFactory = await ethers.getContractFactory("SimpleStorage");
         simpleStorage = await simpleStorageFactory.deploy();

    });
    it("Current Value should be 0",async()=>{
        const retrivedValue = await simpleStorage.retrieve();
        const expectedValue = "0";
        assert.equal(retrivedValue.toString(),expectedValue);
    });

    it("should update when we call update",async()=>{
        const expectedValue = "7";
        const transactionResponse  = await simpleStorage.store(expectedValue);
        transactionResponse.wait(1);
         
        const currentValue = await simpleStorage.retrieve();
        assert.equal(expectedValue,currentValue.toString());
    })

   /*  it("should add a person to people array",async()=>{
        const currentNumber = await simpleStorage.retrieve();
        const name = "azad";
        const transactionResponse = await simpleStorage.addPerson("azad",currentNumber);
        transactionResponse.wait(1);
         
        const peopleArray = await simpleStorage.people;
        assert.equal(name,peopleArray[0].name);
    }) */
    
})