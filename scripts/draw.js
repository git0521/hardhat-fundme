const { ethers, getNamedAccounts } = require("hardhat")

async function main() {
    const factoryContract = await ethers.getContractFactory("FundMe")
    const fundMe = await factoryContract.deploy()
    console.log(`Got contract FundMe at ${fundMe.target}`)

    console.log("Withdrawing from contract...")
    const transactionResponse = await fundMe.withdrwa()
    await transactionResponse.wait()
    console.log("Got it back!")
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
