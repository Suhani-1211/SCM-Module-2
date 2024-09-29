// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract Assessment {
    address payable public owner;
    uint256 public balance;
    uint256 public minBalance;
    
    // Record of transactions
    struct Transaction {
        bool isDeposit;
        uint256 amount;
        uint256 timestamp;
    }
    Transaction[] public transactionHistory;

    event Deposit(uint256 amount);
    event Withdraw(uint256 amount);
    event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);
    event BalanceIncreased(uint256 amount);
    event BalanceDecreased(uint256 amount);
    event MinBalanceSet(uint256 minBalance);

    constructor(uint256 initBalance, uint256 _minBalance) payable {
        owner = payable(msg.sender);
        balance = initBalance;
        minBalance = _minBalance;
        emit MinBalanceSet(_minBalance);
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "You are not the owner of this account");
        _;
    }

    modifier checkMinBalance(uint256 _amount, bool isWithdrawal) {
        if (isWithdrawal) {
            require(balance - _amount >= minBalance, "Insufficient balance after withdrawal");
        }
        _;
    }

    function getBalance() public view returns (uint256) {
        return balance;
    }

    function setMinBalance(uint256 _minBalance) public onlyOwner {
        minBalance = _minBalance;
        emit MinBalanceSet(_minBalance);
    }

    function getTransactionHistory() public view returns (Transaction[] memory) {
        return transactionHistory;
    }

    function deposit(uint256 _amount) public payable onlyOwner {

        // Perform transaction
        balance += _amount;

        // Record transaction
        transactionHistory.push(Transaction({
            isDeposit: true,
            amount: _amount,
            timestamp: block.timestamp
        }));

        // Emit the event
        emit Deposit(_amount);
    }

    function withdraw(uint256 _withdrawAmount) public onlyOwner checkMinBalance(_withdrawAmount, true) {
        
        if (balance >= _withdrawAmount) {
            // Withdraw the given amount
            balance -= _withdrawAmount;

            // Record transaction
            transactionHistory.push(Transaction({
                isDeposit: false,
                amount: _withdrawAmount,
                timestamp: block.timestamp
            }));

            // Emit the event
            emit Withdraw(_withdrawAmount);
        } else {
            // Handle insufficient balance
            emit Withdraw(0); // Withdraw nothing if balance is insufficient
        }
    }

    function transferOwnership(address payable _newOwner) public onlyOwner {
        if (_newOwner != address(0)) {
            emit OwnershipTransferred(owner, _newOwner);
            owner = _newOwner;
        } else {
            // Handle invalid new owner address
            emit OwnershipTransferred(owner, owner); // No change in ownership
        }
    }

    function increaseBalance(uint256 _amount) public onlyOwner {
        

        // Increase balance
        balance += _amount;

        // Record transaction
        transactionHistory.push(Transaction({
            isDeposit: true,
            amount: _amount,
            timestamp: block.timestamp
        }));

        // Emit the event
        emit BalanceIncreased(_amount);
    }

    function decreaseBalance(uint256 _amount) public onlyOwner checkMinBalance(_amount, true) {
        
        if (balance >= _amount) {
            // Decrease balance
            balance -= _amount;

            // Record transaction
            transactionHistory.push(Transaction({
                isDeposit: false,
                amount: _amount,
                timestamp: block.timestamp
            }));

            // Emit the event
            emit BalanceDecreased(_amount);
        } else {
            // Handle insufficient balance
            emit BalanceDecreased(0); // Decrease nothing if balance is insufficient
        }
    }

    function batchDeposit(uint256[] memory _amounts) public onlyOwner {
        for (uint i = 0; i < _amounts.length; i++) {
            deposit(_amounts[i]);
        }
    }

    function batchWithdraw(uint256[] memory _amounts) public onlyOwner {
        for (uint i = 0; i < _amounts.length; i++) {
            withdraw(_amounts[i]);
        }
    }
}
