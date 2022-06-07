const { expect, use } = require("chai");
const { formatEther } = require("ethers/lib/utils");
const { ethers } = require("hardhat");

describe("Token contract", function () {

  let Token;
  let hardhatToken: any;
  let owner: any;
  let addr1: any;
  let addr2;
  let addrs;

  beforeEach(async function () {
    Token = await ethers.getContractFactory("ClassToken");
    [owner, addr1, addr2, ...addrs] = await ethers.getSigners();

    console.log("\t- TEST:\n\t\tOwner address: %s", owner.address);

    hardhatToken = await Token.deploy();
  });

//   describe("Deployment", function () {
//     it("Should set the right owner", async function () {
//         expect(await hardhatToken.owner()).to.equal(owner.address);
//     });

//     it("Should assign the total supply of tokens to the owner", async function () {
//       const ownerBalance = await hardhatToken.balanceOf(owner.address);
//       expect(await hardhatToken.totalSupply()).to.equal(ownerBalance);
//     });
//   });

  describe("Transactions", function () {
    // it("Should transfer tokens between accounts", async function () {
    //   await hardhatToken.transfer(addr1.address, 50);
    //   const addr1Balance = await hardhatToken.balanceOf(addr1.address);
    //   expect(addr1Balance).to.equal(50);
    //   await hardhatToken.connect(addr1).transfer(addr2.address, 50);
    //   const addr2Balance = await hardhatToken.balanceOf(addr2.address);
    //   expect(addr2Balance).to.equal(50);
    // });

    // it("Should fail if sender doesn’t have enough tokens", async function () {
    //   const initialOwnerBalance = await hardhatToken.balanceOf(owner.address);
    //   await expect(
    //     hardhatToken.connect(addr1).transfer(owner.address, 1)
    //   ).to.be.revertedWith("Not enough tokens");

    //   expect(await hardhatToken.balanceOf(owner.address)).to.equal(
    //     initialOwnerBalance
    //   );
    // });

    it("Should update balances after transfers", async function () {
        // const initialOwnerBalance = await hardhatToken.balanceOf(owner.address);owner.address

        // await hardhatToken.transfer(addr1.address, 100);

        // await hardhatToken.transfer(addr2.address, 50);

        // const finalOwnerBalance = await hardhatToken.balanceOf(owner.address);
        // expect(finalOwnerBalance).to.equal(initialOwnerBalance.sub(150));

        // const addr1Balance = await hardhatToken.balanceOf(addr1.address);
        // expect(addr1Balance).to.equal(100);

        // const addr2Balance = await hardhatToken.balanceOf(addr2.address);
        // expect(addr2Balance).to.equal(50);
        console.log("\t- TEST:\n\t\tToken address: %s", await hardhatToken.address);
        console.log("\t- TEST:\n\t\tToken price (in ETH): %s", ethers.utils.formatEther(await hardhatToken.tokenPrice()));
        console.log("\n\t\tToken address balance (in WEI): %s", await hardhatToken.balanceOf(hardhatToken.address));

        await hardhatToken.transfer(hardhatToken.address, "100000000000000000000000");

        console.log("\n\t\tToken address balance after transfer (in WEI): %s", await hardhatToken.balanceOf(hardhatToken.address));

        console.log("\n")
        
        const user = await hardhatToken.connect(addr1);
        // console.log("\n\t\tUser ETH balance: %s", formatEther(await provider.getBalance(user.address)));
        console.log("\t- TEST:\n\t\tUser balance (in WEI): %i", await user.myBalance());

        const swap = await user.swap({ value: "100000000000000000" });

        console.log("\t- TEST:\n\t\tUser balance (in WEI): %s\n\t\tToken address balance (in WEI): %s\n\t\tOwner address balance (in WEI): %s", await user.myBalance(), await hardhatToken.balanceOf(hardhatToken.address), await hardhatToken.balanceOf(owner.address));
        // console.log("\n\t\tUser ETH balance: %s", formatEther(await provider.getBalance(user.address)));
    });
  });
});