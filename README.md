# Blockchain Project

**Final Project for Blockchain Technology Class**

This project demonstrates a smart contract use case. Receiver can get a coin from sender using NFT.

## Requirements
* Node.js
* Postman
* Internet connection 

## Setup Instruction

### 1. Clone the Repository

```bash
git clone https://github.com/egabskr/reward_contract.git
cd reward_contract
```

### 2. Initialize Node.js project
```bash
npm init -y
```

### 3. Install Hardhat
```bash
npm install --save-dev hardhat
```
*Installs Hardhat locally in your project*

### 4. Run Hardhat
```bash
npx hardhat
```
*Runs the local version of Hardhat from node_modules*
*Choose yes in every question and just click enter if you've been asked to choose the folder*

### 5. Move RewardContract.sol
*Move RewardContract.sol to /contracts/*

### 6. Change hardhat.config.js
*Change hardhat.config.js that has been built with the one in repository*

### 7. Create .env
*Create .env file with this format:*
```bash
PRIVATE_KEY= {sender private key}
RPC_URL=https://eth-sepolia.g.alchemy.com/v2/{your alchemy API key}
CONTRACT_ADDRESS=0x9082da312A0044C4703E7fFA837e529FDC869227
```
*You can change the entire RPC_URL link if you don't use alchemy*

### 8. Install Packages
```bash
npm install express dotenv ethers
```
*express: A web framework for Node.js used to create HTTP servers and APIs*
*dotenv: Loads environment variables from a .env file into process.env*
*ethers: A library to interact with the Ethereum blockchain*

### 9. Run index.js
```bash
node index.js
```
*Runs the Node.js script located in the file `index.js`*

## API Usage

### Submit NFT

`POST http://localhost:3000/submit-nft`

### Request

* **Content-Type:** `application/json`
* **Body Example:**

```json
{
  "user": "{receiver wallet}",
  "image": "{image link}"
}
```

### Response Example

```json
{
    "success": true,
    "txHash": "0x{hash}"
}
```

*Submit NFT is used for submitting the NFT*

### Get Reward

`GET http://localhost:3000/get-reward/{receiver wallet}`

### Request

* **Content-Type:** `application/json`

### Response Example

```json
{
    "address": "{reciever wallet}",
    "reward": "0.05 ETH"
}
```

*Get Reward is used for checking wallet's reward*

### Redeem For

`POST http://localhost:3000/redeem-for`

### Request

* **Content-Type:** `application/json`
* **Body Example:**

```json
{
  "user": "{receiver wallet}"
}
```

### Response Example

```json
{
    "success": true,
    "txHash": "0x{hash}"
}
```

*Redeem For is used to claim the reward*