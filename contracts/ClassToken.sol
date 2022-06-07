//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract ClassToken is ERC20 {
    event BuyToken(address indexed sender, uint256 tokenAmount, uint256 price);

    uint256 public tokensPerEth = 1000000;

    uint256 initialSupply = 2000000 * 10 ** 18;

    constructor() ERC20("ClassToken", "CLT") 
    {
            _mint(msg.sender, initialSupply);
    }

    function myBalance() external view returns (uint256) {
        return balanceOf(msg.sender);
    }

    function tokenPrice() public view returns (uint256) {
        return (1 ether / tokensPerEth);
    }

    function swap() public payable {
        console.log("\t- TOKEN:\n\t\tUser address: %s\n\t\tRequest value (in WEI): %s", msg.sender, msg.value);
        
        uint256 amountOfETH = msg.value;
        console.log("\n\t\tThis address: %s", address(this));

        uint256 dexBalance = this.balanceOf(address(this));

        console.log("\n\t\tDEX balance (in WEI) : %s", dexBalance);

        require(amountOfETH > 1000000000000, "You need to send some ether more then 1000000000000 WEI");

        uint256 countOfTokens = (amountOfETH / tokenPrice()) * 10 ** 18;

        console.log("\n\t\tCount of tokens: %s", countOfTokens);
        require(countOfTokens <= dexBalance, "Not enough tokens in the contract");        

        this.transfer(msg.sender, countOfTokens);
    }
}