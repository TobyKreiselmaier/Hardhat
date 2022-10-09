const fs = require('fs');

async function main() {
    const [deployer] = await ethers.getSigners();
    console.log(`Deployer is: ${deployer.address}`);

    const balance = await deployer.getBalance();
    console.log(`Deployer ETH balance is: ${balance.toString()}`);

    const Token = await ethers.getContractFactory('Token');
    const token = await Token.deploy();
    const deployerBalance = await token.balanceOf(deployer.address);
    console.log(`Token address is: ${token.address}`);
    console.log(`Deployer Token balance is: ${deployerBalance.toString()}`);
    console.log(`Token contract deployed successfully!`);

    const data = {
        address: token.address,
        abi: JSON.parse(token.interface.format('json'))
    }
    fs.writeFileSync('frontend/src/Token.json', JSON.stringify(data))
}

main()
.then(() => process.exit(0))
.catch(error => {
    console.error(error);
    process.exit(1);
})