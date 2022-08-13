const { getNamedAccounts, ethers } = require("hardhat")

async function main() {
    const { deployer } = await getNamedAccounts()
    const fundme = await ethers.getContract("FundMe", deployer)
    console.log("funds withdrawing ...")

    const transactionResopnse = await fundme.withdraw()
    await transactionResopnse.wait(1)

    console.log(`Funds are withdrawed!`)
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error)
        process.exit(1)
    })
