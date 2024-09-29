import { useState, useEffect } from "react";
import { ethers } from "ethers";
import atm_abi from "../artifacts/contracts/Assessment.sol/Assessment.json";

export default function HomePage() {
  const [ethWallet, setEthWallet] = useState(undefined);
  const [account, setAccount] = useState(undefined);
  const [atm, setATM] = useState(undefined);
  const [balance, setBalance] = useState(undefined);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [amount, setAmount] = useState(0);
  const [transactions, setTransactions] = useState([]);

  const contractAddress = "0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC"; // Update to your contract address
  const atmABI = atm_abi.abi;

  // Get and set wallet
  const getWallet = async () => {
    if (window.ethereum) {
      setEthWallet(window.ethereum);
      try {
        const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
        handleAccount(accounts);
      } catch (error) {
        console.error("Error accessing MetaMask:", error);
        alert("Please connect to MetaMask.");
      }
    } else {
      alert("Please install MetaMask to use this application.");
    }
  };

  // Handle account from MetaMask
  const handleAccount = (accounts) => {
    if (accounts.length > 0) {
      setAccount(accounts[0]);
      getATMContract();
    } else {
      alert("No MetaMask account found. Please connect your MetaMask wallet.");
    }
  };

  // MetaMask account connection
  const connectAccount = async () => {
    if (!ethWallet) {
      alert("MetaMask is required to connect.");
      return;
    }

    try {
      const accounts = await ethWallet.request({ method: "eth_requestAccounts" });
      handleAccount(accounts);
    } catch (error) {
      console.error("MetaMask connection error:", error);
    }
  };

  // Get ATM contract
  const getATMContract = () => {
    if (!ethWallet) return;

    const provider = new ethers.providers.Web3Provider(ethWallet);
    const signer = provider.getSigner();
    const atmContract = new ethers.Contract(contractAddress, atmABI, signer);
    setATM(atmContract);
  };

  // Fetch balance
  const getBalance = async () => {
    if (atm) {
      const balanceBigNumber = await atm.getBalance();
      setBalance(ethers.utils.formatUnits(balanceBigNumber, "ether"));
    }
  };

  // Deposit funds
  const deposit = async () => {
    if (atm) {
      setLoading(true);
      setMessage("Depositing...");
      try {
        const tx = await atm.deposit({ value: ethers.utils.parseUnits(amount, "ether") });
        await tx.wait();
        getBalance();
        getTransactionHistory();
        setMessage("Deposit successful!");
      } catch (error) {
        console.error("Deposit error:", error);
        setMessage("Deposit failed.");
      } finally {
        setLoading(false);
      }
    }
  };

  // Withdraw funds
  const withdraw = async () => {
    if (atm) {
      setLoading(true);
      setMessage("Withdrawing...");
      try {
        const tx = await atm.withdraw(ethers.utils.parseUnits(amount, "ether"));
        await tx.wait();
        getBalance();
        getTransactionHistory();
        setMessage("Withdrawal successful!");
      } catch (error) {
        console.error("Withdraw error:", error);
        setMessage("Withdrawal failed.");
      } finally {
        setLoading(false);
      }
    }
  };

  // Transfer ownership
  const transferOwnership = async (newOwnerAddress) => {
    if (atm) {
      setLoading(true);
      setMessage("Transferring ownership...");
      try {
        const tx = await atm.transferOwnership(newOwnerAddress);
        await tx.wait();
        setMessage("Ownership transferred successfully!");
      } catch (error) {
        console.error("Ownership transfer error:", error);
        setMessage("Ownership transfer failed.");
      } finally {
        setLoading(false);
      }
    }
  };

  // Increase balance
  const increaseBalance = async () => {
    if (atm) {
      setLoading(true);
      setMessage("Increasing balance...");
      try {
        const tx = await atm.increaseBalance(ethers.utils.parseUnits(amount, "ether"));
        await tx.wait();
        getBalance();
        getTransactionHistory();
        setMessage("Balance increased successfully!");
      } catch (error) {
        console.error("Increase balance error:", error);
        setMessage("Balance increase failed.");
      } finally {
        setLoading(false);
      }
    }
  };

  // Decrease balance
  const decreaseBalance = async () => {
    if (atm) {
      setLoading(true);
      setMessage("Decreasing balance...");
      try {
        const tx = await atm.decreaseBalance(ethers.utils.parseUnits(amount, "ether"));
        await tx.wait();
        getBalance();
        getTransactionHistory();
        setMessage("Balance decreased successfully!");
      } catch (error) {
        console.error("Decrease balance error:", error);
        setMessage("Balance decrease failed.");
      } finally {
        setLoading(false);
      }
    }
  };

  // Get transaction history
  const getTransactionHistory = async () => {
    if (atm) {
      const txHistory = await atm.getTransactionHistory();
      setTransactions(txHistory.map(tx => ({
        isDeposit: tx.isDeposit,
        amount: ethers.utils.formatUnits(tx.amount, "ether"),
        timestamp: new Date(tx.timestamp * 1000).toLocaleString(),
      })));
    }
  };

  // User interface initialization
  const initUser = () => {
    if (!ethWallet) {
      return <p>Please install MetaMask to use the ATM.</p>;
    }

    if (!account) {
      return <button onClick={connectAccount}>Connect MetaMask</button>;
    }

    if (balance === undefined) {
      getBalance();
    }

    return (
      <div>
        <p>Your Account: {account}</p>
        <p>Your Balance: {balance} ETH</p>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Amount in ETH"
        />
        <button onClick={deposit} disabled={loading}>Deposit</button>
        <button onClick={withdraw} disabled={loading}>Withdraw</button>
        <button onClick={() => transferOwnership("0xNewOwnerAddress")} disabled={loading}>Transfer Ownership</button>
        <button onClick={increaseBalance} disabled={loading}>Increase Balance</button>
        <button onClick={decreaseBalance} disabled={loading}>Decrease Balance</button>
        <button onClick={getBalance} disabled={loading}>Refresh Balance</button>
        {loading && <p>Loading...</p>}
        <p>{message}</p>
        <h2>Transaction History</h2>
        <ul>
          {transactions.map((tx, index) => (
            <li key={index}>
              {tx.isDeposit ? "Deposit" : "Withdrawal"} of {tx.amount} ETH at {tx.timestamp}
            </li>
          ))}
        </ul>
      </div>
    );
  };

  // Effect to load wallet and account on app load
  useEffect(() => {
    getWallet();
  }, []);

  return (
    <main>
      <header>
        <h1>Welcome to the ATM DApp</h1>
      </header>
      {initUser()}
    </main>
  );
}
