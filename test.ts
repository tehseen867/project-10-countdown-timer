#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
import chalkAnimation from "chalk-animation"

function displayWelcomeMessage() {
    return new Promise((resolve) => {
        let welcomeMessage = chalkAnimation.rainbow("\n<<<===>>> WELCOME ~ TO ~ COUNTDOWN ~ TIMER <<<===>>>\n")
        setTimeout(() => {
            welcomeMessage.stop()
            resolve("")
        }, 3000);

    })
}
displayWelcomeMessage()
let getSec = async () => {
    let askForSec = await inquirer.prompt([{
        name: 'sec',
        type: 'input',
        message: chalk.magentaBright('Enter the amount of seconds:'),
        validate: (i) => {
            let input = parseInt(i)
            if (isNaN(input) || input <= 0) {
                console.log(chalk.red('Please enter valid amount of seconds in numbers'))
            }
            else {
                return true
            }
        }

    }])
    return parseInt(askForSec.sec)
}

function displayCountdown(amount: number) {
    let remainingTime = amount
    let start_countdown = setInterval(() => {
        const minutes = Math.floor(remainingTime / 60);
        const displaySeconds = remainingTime % 60;

        const formatedMinutes = minutes.toString().padStart(2, '0');
        const formatedSeconds = displaySeconds.toString().padStart(2, '0');
        process.stdout.write(`    ${chalk.greenBright("Time left")}: ${chalk.red(formatedMinutes)}:${chalk.yellow(formatedSeconds)}\r`);

        remainingTime--;


        if (remainingTime < 0) {
            console.log(chalk.green("\nContdown Completed"))
            clearInterval(start_countdown)
        }

    }, 1000)

}
async function startCountdown() {
    try {
        let userInputSec = await getSec()
        displayCountdown(userInputSec)
    } catch (error) {
        console.log("an unknown error occured")
    }
}
async function startProgram() {
    await displayWelcomeMessage()
    await startCountdown()
}
startProgram()