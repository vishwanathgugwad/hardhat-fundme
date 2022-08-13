const { network, getNamedAccounts, deployments } = require("hardhat")
const { networkConfig } = require("../helper-hardhat-config")
const {
    developmentChains,
    DECIMALS,
    INITIAL_ANSER
} = require("../helper-hardhat-config")
const { verify } = require("../Utils/verify")

module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()
    const chainId = network.config.chainId

    //  const ethUsdPriceAddress = networkConfig[chainId]["ethUsdPriceFeed"]
    let ethUsdPriceAddress
    if (chainId == 31337) {
        const ethUsdAggregator = await deployments.get("MockV3Aggregator")
        ethUsdPriceAddress = ethUsdAggregator.address
    } else {
        ethUsdPriceAddress = networkConfig[chainId]["ethUsdPriceFeed"]
    }
    log("----------------------------------------------------")
    log("Deploying FundMe and waiting for confirmations...")
    const args = [ethUsdPriceAddress]
    const fundMe = await deploy("FundMe", {
        from: deployer,
        args: args, //put price feed adress
        log: true,
        waitConfirmations: network.config.blockConfirmations || 1
    })
    if (
        !developmentChains.includes(network.name) &&
        process.env.ETHERSCAN_API_KEY
    ) {
        await verify(fundMe.address, args)
    }

    log("__________________________________________________________")
}

module.exports.tags = ["all", "fundme"]
