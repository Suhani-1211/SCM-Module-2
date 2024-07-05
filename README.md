# Project Title: Metacrafters ATM

## Simple overview of use/purpose
This project simulates an ATM system using the Ethereum blockchain, integrating a React frontend and a Solidity smart contract.

## Description
The Metacrafters ATM project allows users to interact with the Ethereum blockchain through a web interface. Users can connect their MetaMask wallet, view their balance, and perform deposit and withdrawal operations. The React frontend interacts with a Solidity smart contract deployed on the blockchain to manage these transactions.

## Getting Started

### Installing

#### How/where to download your program
1. Clone the GitHub repository:
    ```bash
    git clone https://github.com/your-repo/metacrafters-atm.git
    ```
2. Navigate to the project directory:
    ```bash
    cd metacrafters-atm
    ```

#### Any modifications needed to be made to files/folders
No modifications are needed for basic functionality. Ensure MetaMask is installed in your browser.

### Executing program

#### How to run the program
1. **Install Dependencies:**
    ```bash
    npm install
    ```
2. **Set Up Local Blockchain:**
    Open two additional terminals in your VS Code.
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

## Help
For common problems or issues, refer to the following:

- Ensure MetaMask is installed and properly configured.
- Verify the local blockchain is running.
- Check for any errors in the terminal and address them as needed.

For more detailed help:
```bash
npm run help
```

## Authors
Contributors names and contact info:
- Suhani Bajjard
  - GitHub: @Suhani-1211

## License
This project is licensed under the MIT License - see the LICENSE.md file for details.

## Files

### index.js
**Description:** `index.js` serves as the main entry point for the React application. It integrates with MetaMask and ethers.js to interact with the Ethereum blockchain, specifically with the Assessment smart contract.

**Features:**
- Connects to MetaMask wallet using ethers.js and `window.ethereum`.
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

### Assessment.sol
**Description:** `Assessment.sol` is a Solidity smart contract deployed on the Ethereum blockchain. It manages user balances and allows for deposits and withdrawals of ETH.

**Functions:**
- `constructor`: Initializes the contract with an initial balance.
- `getBalance`: Retrieves the current balance of the contract.
- `deposit`: Allows the contract owner to deposit ETH into the contract.
- `withdraw`: Allows the contract owner to withdraw ETH from the contract.

**Usage:**
1. Deploy the contract on an Ethereum testnet or mainnet.
2. Interact with the contract using a Web3 provider (e.g., MetaMask + ethers.js).
3. Call `deposit` and `withdraw` functions to manage ETH transactions within the contract.
