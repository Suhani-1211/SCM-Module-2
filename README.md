
---

# Project Title: Metacrafters ATM

## Simple Overview of Use/Purpose
This project simulates an ATM system using the Ethereum blockchain, integrating a React frontend and a Solidity smart contract. Users can interact with the ATM system to deposit, withdraw, and manage ETH transactions using MetaMask.

## Description
The Metacrafters ATM project allows users to interact with the Ethereum blockchain through a web interface. Users can connect their MetaMask wallet, view their balance, perform deposit, withdrawal, and other operations. The React frontend interacts with the `Assessment.sol` smart contract deployed on the blockchain to manage these transactions. The app also allows for additional functionalities such as transferring ownership and increasing or decreasing the balance.

## Getting Started

### Installing

#### How/Where to Download the Program
1. Clone the GitHub repository:
    ```bash
    git clone https://github.com/your-repo/metacrafters-atm.git
    ```
2. Navigate to the project directory:
    ```bash
    cd metacrafters-atm
    ```

#### Modifications Needed to Be Made to Files/Folders
No modifications are needed for basic functionality. Ensure MetaMask is installed and configured in your browser. Update the `contractAddress` in `index.js` with your deployed contract address.

### Executing the Program

#### How to Run the Program
1. **Install Dependencies:**
    ```bash
    npm install
    ```
2. **Set Up Local Blockchain:**
    Open two additional terminals in your VS Code:
    - In the second terminal, start the local blockchain:
        ```bash
        npx hardhat node
        ```
    - In the third terminal, deploy the smart contract:
        ```bash
        npx hardhat run --network localhost scripts/deploy.js
        ```
3. **Launch Frontend:**
    - In the first terminal, start the React app:
        ```bash
        npm run dev
        ```
    After these steps, the project will be running on your localhost, typically at `http://localhost:3000/`.

4. **Connect MetaMask:**
    - Make sure your MetaMask is connected to the local Hardhat network or an Ethereum testnet like Goerli, depending on your configuration.
    - Interact with the contract via the interface.

## Help
For common issues:
- Ensure MetaMask is installed and connected to the correct network (local or testnet).
- Make sure the local blockchain (Hardhat) is running if using a local network.
- Double-check your contract address in the `index.js` file.
- Check for any errors in the terminal and resolve them as needed.

For additional help:
```bash
npm run help
```

## Authors
Contributors:
- Suhani Bajjard
  - GitHub: [@Suhani-1211](https://github.com/Suhani-1211)

## License
This project is licensed under the MIT License - see the LICENSE.md file for details.

## Files

### `index.js`
**Description:**  
`index.js` is the main entry point for the React frontend. It handles user interaction with the MetaMask wallet and integrates with the Ethereum blockchain using ethers.js. The frontend communicates with the `Assessment` smart contract, allowing users to perform operations such as depositing, withdrawing, and managing funds.

**Features:**
- **MetaMask Connection:** Prompts users to connect their MetaMask wallet using ethers.js and `window.ethereum`.
- **Account and Balance Display:** Shows the user's Ethereum account address and balance.
- **Deposit and Withdraw:** Allows users to deposit and withdraw ETH from the ATM.
- **Ownership Transfer:** Admin can transfer contract ownership to a new address.
- **Balance Management:** Admin can increase or decrease the contract's balance.
- **Transaction History:** Displays recent transactions (deposits and withdrawals) with timestamps.
- **Real-Time Feedback:** Users receive instant feedback on transaction success or failure.
- **Responsive UI:** Provides a user-friendly interface for easy interaction with the smart contract.

**Usage:**
1. **Prerequisites:** Ensure that MetaMask is installed in the browser.
2. **Run Application:** Start the React app using `npm run dev`.
3. **Connect MetaMask:** Use the web interface to connect MetaMask and interact with the contract (deposit, withdraw, etc.).
4. **Transaction History:** View the transaction history on the UI.

### `Assessment.sol`
**Description:**  
`Assessment.sol` is the Solidity smart contract that powers the ATM system. It manages ETH transactions on the Ethereum blockchain, allowing for deposits, withdrawals, and contract ownership transfers.

**Key Functions:**
- **`constructor`:** Initializes the contract with an initial balance.
- **`getBalance`:** Retrieves the current ETH balance in the contract.
- **`deposit`:** Allows users to deposit ETH into the contract.
- **`withdraw`:** Allows users to withdraw ETH from the contract.
- **`transferOwnership`:** Admin function to transfer contract ownership to a new address.
- **`increaseBalance`:** Admin function to increase the contract's balance (for tracking purposes).
- **`decreaseBalance`:** Admin function to decrease the contract's balance (for tracking purposes).
- **`getTransactionHistory`:** Retrieves the list of deposit and withdrawal transactions made by the user.

**Usage:**
1. **Deployment:** Deploy the contract on a local Ethereum blockchain (e.g., Hardhat) or a public testnet (e.g., Goerli).
2. **Interactions:** Use the React app to interact with the contract. Users can deposit and withdraw ETH, and the contract admin can manage ownership and balance changes.
3. **Testing:** Perform tests using a local blockchain and the provided UI for various operations.

---

This `README.md` now accurately reflects the full scope of both the frontend (`index.js`) and the smart contract (`Assessment.sol`), detailing how to use and run the project with the necessary Ethereum interaction functionalities.
