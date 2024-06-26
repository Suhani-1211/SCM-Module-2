// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract Assessment {
    address payable public owner;
    uint256 public balance;

    event Deposit(uint256 amount);
    event Withdraw(uint256 amount);
    event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);
    event BalanceIncreased(uint256 amount);
    event BalanceDecreased(uint256 amount);

    constructor(uint initBalance) payable {
        owner = payable(msg.sender);
        balance = initBalance;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "You are not the owner of this account");
        _;
    }

    function getBalance() public view returns (uint256) {
        return balance;
    }

    function deposit(uint256 _amount) public payable onlyOwner {
        uint _previousBalance = balance;

        // perform transaction
        balance += _amount;

        // assert transaction completed successfully
        assert(balance == _previousBalance + _amount);

        // emit the event
        emit Deposit(_amount);
    }

    function withdraw(uint256 _withdrawAmount) public onlyOwner {
        uint _previousBalance = balance;
        if (balance >= _withdrawAmount) {
            // withdraw the given amount
            balance -= _withdrawAmount;

            // assert the balance is correct
            assert(balance == (_previousBalance - _withdrawAmount));

            // emit the event
            emit Withdraw(_withdrawAmount);
        } else {
            // handle insufficient balance
            emit Withdraw(0); // withdraw nothing if balance is insufficient
        }
    }

    function transferOwnership(address payable _newOwner) public onlyOwner {
        if (_newOwner != address(0)) {
            emit OwnershipTransferred(owner, _newOwner);
            owner = _newOwner;
        } else {
            // handle invalid new owner address
            emit OwnershipTransferred(owner, owner); // no change in ownership
        }
    }

    function increaseBalance(uint256 _amount) public onlyOwner {
        uint _previousBalance = balance;

        // increase balance
        balance += _amount;

        // assert the balance is correct
        assert(balance == (_previousBalance + _amount));

        // emit the event
        emit BalanceIncreased(_amount);
    }

    function decreaseBalance(uint256 _amount) public onlyOwner {
        uint _previousBalance = balance;
        if (balance >= _amount) {
            // decrease balance
            balance -= _amount;

            // assert the balance is correct
            assert(balance == (_previousBalance - _amount));

            // emit the event
            emit BalanceDecreased(_amount);
        } else {
            // handle insufficient balance
            emit BalanceDecreased(0); // decrease nothing if balance is insufficient
        }
    }
}
