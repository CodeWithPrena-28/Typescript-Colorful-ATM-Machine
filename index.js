#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
// Initialize user balance and pin code
let myBalance = 10000;
let myPin = 1234;
// Print Wellcome Message
console.log(chalk.bold.rgb(204, 204, 204)('\n\t<<<----------------------------------------------------------->>>'));
console.log(chalk.bold.rgb(204, 204, 204)(`<<<------------>>> ${chalk.bold.hex('#9999FF')('Welcome to  ‘Code With Prena’ - ATM Machine')} <<<---------------->>>`));
console.log(chalk.bold.rgb(204, 204, 204)('\t<<<----------------------------------------------------------->>>\n'));
let pinAnswer = await inquirer.prompt([
    {
        name: "pin",
        type: "number",
        message: chalk.yellow("Enter your Pin Code:")
    }
]);
if (pinAnswer.pin === myPin) {
    console.log(chalk.greenBright("\n Pin is Correct, Login Successfully! \n"));
    let operationAns = await inquirer.prompt([
        {
            name: "operation",
            type: "list",
            message: "Select an opperation:",
            choices: ["Withdraw Amount", "Check Balance"]
        }
    ]);
    if (operationAns.operation === "Withdraw Amount") {
        let WithdrawAns = await inquirer.prompt([
            {
                name: "withdrawMethod",
                type: "list",
                message: "select a withdrawl method:",
                choices: ["Fast Cash", "Enter Amount"]
            }
        ]);
        if (WithdrawAns.withdrawMethod === "Fast Cash") {
            let fastCashAns = await inquirer.prompt([
                {
                    name: "fastCash",
                    type: "list",
                    message: "Select Amount:",
                    choices: [1000, 2000, 5000, 7000, 10000, 20000, 50000]
                }
            ]);
            if (fastCashAns.fastCash > myBalance) {
                console.log(chalk.red("Insufficient Balance"));
            }
            else {
                myBalance -= fastCashAns.fastCash;
                console.log(`${fastCashAns.fastCash} withdraw Successfully`);
                console.log(`your Remaning Balance is: ${myBalance}`);
            }
        }
        else if (WithdrawAns.withdrawMethod === "Enter Amount") {
            let amountAns = await inquirer.prompt([
                {
                    name: "amount",
                    type: "number",
                    message: "Enter the amount to Withdraw:"
                }
            ]);
            if (amountAns.amount > myBalance) {
                console.log(chalk.red("Insufficient Balance"));
            }
            else {
                myBalance -= amountAns.amount;
                console.log(`${amountAns.amount} Withdraw Successfully`);
                console.log(`Your Remaining Balance is: ${myBalance}`);
            }
        }
    }
    else if (operationAns.operation === "Check Balance") {
        console.log(chalk.grey `Your Account Balance is: ${myBalance}`);
    }
}
else {
    console.log(chalk.red("Pin is Incorrect,Try Again!"));
}
