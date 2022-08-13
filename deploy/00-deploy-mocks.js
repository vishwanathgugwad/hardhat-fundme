const { network } = require("hardhat")
const { networkConfig } = require("../helper-hardhat-config")
const {
    developmentChains,
    DECIMALS,
    INITIAL_ANSER
} = require("../helper-hardhat-config")

//getNamedAccounts, deployments are from HRE(hardhat runtime environment)
module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()
    const chainId = network.config.chainId

    if (chainId == 31337) {
        log("Local network detected! deploying mocks...")
        await deploy("MockV3Aggregator", {
            contract: "MockV3Aggregator",
            from: deployer,
            log: true,
            args: [DECIMALS, INITIAL_ANSER]
        })
        log("Mocks deployed")
        log("____________________________________________")
    }
}

module.exports.tags = ["all", "mocks"]
