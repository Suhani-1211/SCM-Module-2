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

  const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
  const atmABI = atm_abi.abi;

  const getWallet = async () => {
    if (window.ethereum) {
      setEthWallet(window.ethereum);
    }

    if (ethWallet) {
      const accounts = await ethWallet.request({ method: "eth_accounts" });
      handleAccount(accounts);
    }
  };

  const handleAccount = (accounts) => {
    if (accounts && accounts.length > 0) {
      console.log("Account connected: ", accounts[0]);
      setAccount(accounts[0]);
    } else {
      console.log("No account found");
    }
  };

  const connectAccount = async () => {
    if (!ethWallet) {
      alert('MetaMask wallet is required to connect');
      return;
    }

    const accounts = await ethWallet.request({ method: 'eth_requestAccounts' });
    handleAccount(accounts);

    // once wallet is set we can get a reference to our deployed contract
    getATMContract();
  };

  const getATMContract = () => {
    const provider = new ethers.providers.Web3Provider(ethWallet);
    const signer = provider.getSigner();
    const atmContract = new ethers.Contract(contractAddress, atmABI, signer);

    setATM(atmContract);
  };

  const getBalance = async () => {
    if (atm) {
      const balanceBigNumber = await atm.getBalance();
      setBalance(balanceBigNumber.toNumber());
    }
  };

  const deposit = async () => {
    if (atm) {
      setLoading(true);
      setMessage("Depositing...");
      try {
        let tx = await atm.deposit(1);
        await tx.wait();
        getBalance();
        setMessage("Deposit successful!");
      } catch (error) {
        setMessage("Deposit failed.");
      } finally {
        setLoading(false);
      }
    }
  };

  const withdraw = async () => {
    if (atm) {
      setLoading(true);
      setMessage("Withdrawing...");
      try {
        let tx = await atm.withdraw(1);
        await tx.wait();
        getBalance();
        setMessage("Withdrawal successful!");
      } catch (error) {
        setMessage("Withdrawal failed.");
      } finally {
        setLoading(false);
      }
    }
  };

  const transferOwnership = async () => {
    if (atm) {
      setLoading(true);
      setMessage("Transferring ownership...");
      try {
        let tx = await atm.transferOwnership("0xNewOwnerAddress");
        await tx.wait();
        setMessage("Ownership transferred successfully!");
      } catch (error) {
        setMessage("Ownership transfer failed.");
      } finally {
        setLoading(false);
      }
    }
  };

  const increaseBalance = async () => {
    if (atm) {
      setLoading(true);
      setMessage("Increasing balance...");
      try {
        let tx = await atm.increaseBalance(10); // increase by 10 ETH
        await tx.wait();
        getBalance();
        setMessage("Balance increased successfully!");
      } catch (error) {
        setMessage("Balance increase failed.");
      } finally {
        setLoading(false);
      }
    }
  };

  const decreaseBalance = async () => {
    if (atm) {
      setLoading(true);
      setMessage("Decreasing balance...");
      try {
        let tx = await atm.decreaseBalance(5); // decrease by 5 ETH
        await tx.wait();
        getBalance();
        setMessage("Balance decreased successfully!");
      } catch (error) {
        setMessage("Balance decrease failed.");
      } finally {
        setLoading(false);
      }
    }
  };

  const initUser = () => {
    // Check to see if user has Metamask
    if (!ethWallet) {
      return <p>Please install Metamask in order to use this ATM.</p>;
    }

    // Check to see if user is connected. If not, connect to their account
    if (!account) {
      return <button className="btn connect" onClick={connectAccount}>Please connect your Metamask wallet</button>;
    }

    if (balance === undefined) {
      getBalance();
    }

    return (
      <div>
        <p>Your Account: {account}</p>
        <p>Your Balance: {balance} ETH</p>
        <button className="btn deposit" onClick={deposit} disabled={loading}>Deposit 1 ETH</button>
        <button className="btn withdraw" onClick={withdraw} disabled={loading}>Withdraw 1 ETH</button>
        <button className="btn" onClick={transferOwnership} disabled={loading}>Transfer Ownership</button>
        <button className="btn" onClick={increaseBalance} disabled={loading}>Increase Balance by 10 ETH</button>
        <button className="btn" onClick={decreaseBalance} disabled={loading}>Decrease Balance by 5 ETH</button>
        {loading && <p>Loading...</p>}
        <p>{message}</p>
      </div>
    );
  };

  useEffect(() => { getWallet(); }, []);

  return (
    <main className="container">
      <header>
        <h1>Welcome to the Metacrafters ATM!</h1>
      </header>
      {initUser()}
      <style jsx>{`
        .container {
          text-align: center;
          padding: 2rem;
          background-color: #f0f0f0;
          border-radius: 10px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          max-width: 600px;
          margin: 2rem auto;
        }

        header h1 {
          color: #333;
        }

        p {
          font-size: 1.2rem;
          color: #666;
        }

        .btn {
          display: inline-block;
          padding: 0.5rem 1rem;
          margin: 0.5rem;
          font-size: 1rem;
          font-weight: bold;
          color: #fff;
          background-color: #0070f3;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }

        .btn:hover {
          background-color: #005bb5;
        }

        .btn.deposit {
          background-color: #28a745;
        }

        .btn.deposit:hover {
          background-color: #218838;
        }

        .btn.withdraw {
          background-color: #dc3545;
        }

        .btn.withdraw:hover {
          background-color: #c82333;
        }

        .btn.connect {
          background-color: #007bff;
        }

        .btn.connect:hover {
          background-color: #0056b3;
        }
      `}</style>
    </main>
  );
}
