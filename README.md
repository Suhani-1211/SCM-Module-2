# Starter Next/Hardhat Project

After cloning the github, you will want to do the following to get the code running on your computer.

1. Inside the project directory, in the terminal type: npm i
2. Open two additional terminals in your VS code
3. In the second terminal type: npx hardhat node
4. In the third terminal, type: npx hardhat run --network localhost scripts/deploy.js
5. Back in the first terminal, type npm run dev to launch the front-end.

After this, the project will be running on your localhost. 
Typically at http://localhost:3000/


---

# Metacrafters ATM

This project includes a React frontend and a Solidity smart contract to simulate an ATM system using the Ethereum blockchain.

## Files

### `index.js`

**Description:**
`index.js` serves as the main entry point for the React application. It integrates with MetaMask and ethers.js to interact with the Ethereum blockchain, specifically with the `Assessment` smart contract.

**Features:**
- Connects to MetaMask wallet using `ethers.js` and `window.ethereum`.
- Displays the user's account address and ETH balance.
- Allows users to deposit and withdraw 1 ETH from the ATM.
- Provides real-time feedback on transaction status (success or failure).
- Implements responsive UI with styled components for improved user experience.

**Usage:**
1. Ensure MetaMask extension is installed in the browser.
2. Run the React app using `npm start` or an equivalent command.
3. Connect MetaMask wallet to interact with the ATM.
4. Use buttons on the webpage to deposit or withdraw ETH.
5. View updated balances and transaction status directly on the UI.

### `Assessment.sol`

**Description:**
`Assessment.sol` is a Solidity smart contract deployed on the Ethereum blockchain. It manages user balances and allows for deposits and withdrawals of ETH.

**Functions:**
- `constructor`: Initializes the contract with an initial balance.
- `getBalance`: Retrieves the current balance of the contract.
- `deposit`: Allows the contract owner to deposit ETH into the contract.
- `withdraw`: Allows the contract owner to withdraw ETH from the contract.

**Usage:**
1. Deploy the contract on an Ethereum testnet or mainnet.
2. Interact with the contract using a Web3 provider (e.g., MetaMask + ethers.js).
3. Call `deposit` and `withdraw` functions to manage ETH transactions within the contract.

---
