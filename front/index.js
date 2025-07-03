import { ethers } from "./ethers-5.6.esm.min.js"
import { abi, contractAddress } from "./constants.js"

const connectButton = document.getElementById("connectButton")
const balanceButton = document.getElementById("balanceButton")
const fundButton = document.getElementById("fundButton")
const withdrawButton = document.getElementById("withdrawButton")
const balanceDisplay = document.getElementById("balanceDisplay")

connectButton.onclick = connect
balanceButton.onclick = getBalance
fundButton.onclick = fund
withdrawButton.onclick = withdraw

async function connect() {
    if (typeof window.ethereum !== "undefined") {
        try {
            await ethereum.request({ method: "eth_requestAccounts" })
        } catch (error) {
            console.log(error)
        }
        connectButton.innerHTML = "已连接钱包"
        const accounts = await ethereum.request({ method: "eth_accounts" })
        console.log(accounts)
    } else {
        connectButton.innerHTML = "Please insatll MetaMask"
    }
}

async function fund() {
    const ethAmount = document.getElementById("ethAmount").value
    console.log(`Funding with ${ethAmount}...`)
    if (typeof window.ethereum !== "undefined") {
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer = provider.getSigner()
        const contract = new ethers.Contract(contractAddress, abi, signer)
        try {
            const response = await contract.fund({
                value: ethers.utils.parseEther(ethAmount),
            })
            await listenForTransactionMine(response, provider)
        } catch (error) {
            console.log(error)
        }
    } else {
        fundButton.innerHTML = "please install metaMask"
    }
}

async function getBalance() {
    if (typeof window.ethereum !== "undefined") {
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        console.log(provider)
        try {
            const balance = await provider.getBalance(contractAddress)
            console.log(ethers.utils.formatEther(balance))
            let money = ethers.utils.formatEther(balance)
            balanceDisplay.textContent = `余额: ${money} ETH`
        } catch (error) {
            console.log(error)
        }
    } else {
        connectButton.innerHTML = "Please insatll MetaMask"
    }
}

async function withdraw() {
    console.log("withDraw....")
    if (typeof window.ethereum !== "undefined") {
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        await provider.send("eth_requestAccounts", [])
        const signer = provider.getSigner()
        const contract = new ethers.Contract(contractAddress, abi, signer)
        try {
            const response = await contract.withdrwa()
            await listenForTransactionMine(response, provider)
        } catch (error) {
            console.log(error)
        }
    } else {
        withdrawButton.innerHTML = "Please install MetaMask"
    }
}

function listenForTransactionMine(response, provider) {
    console.log(`Mining ${response.hash}`)
    return new Promise((resolve, reject) => {
        try {
            provider.once(response.hash, (transactionReceipt) => {
                console.log(`Completed with ${transactionReceipt.confirmations} confirmations. `)
                resolve()
            })
        } catch (error) {
            reject(error)
        }
    })
}
