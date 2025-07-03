const { ethers } = require("hardhat")

async function main() {
    const factoryContract = await ethers.getContractFactory("FundMe")
    const fundMe = await factoryContract.deploy()
    console.log(`Got contract FundMe at ${fundMe.target}`)
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
