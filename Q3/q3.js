class BankAccount {
    constructor(name, balance) {
        this.name = name;
        this.balance = balance;
    }

    deposit(amount) {
        this.balance += amount;
    }

    withdraw(amount) {
        if (amount > this.balance) {
            console.log("Insufficient balance");
        } else {
            this.balance -= amount;
        }
    }

    showBalance() {
        console.log(`${this.name} Balance: ${this.balance}`);
    }
}

let acc = new BankAccount("Arun", 1000);
acc.deposit(500);
acc.withdraw(200);
acc.showBalance();