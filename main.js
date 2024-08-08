const readlineSync = require('readline-sync');
const { Othello } = require('./classes/Othello');
const { HumanPlayer } = require('./classes/HumanPlayer');
const { BotPlayer } = require('./classes/BotPlayer');

function choosePlayerType(color) {
    console.log(`Choose type for player ${color}:`);
    console.log("1: Human");
    console.log("2: Bot");
    const choice = readlineSync.question('Enter choice (1 or 2): ');

    if (choice === '1') {
        return new HumanPlayer(color);
    } else if (choice === '2') {
        return new BotPlayer(color);
    } else {
        console.log("Invalid choice, defaulting to Bot.");
        return new BotPlayer(color);
    }
}

async function startGame() {
    console.clear();
    console.log("Welcome to Othello!");

    const player1 = choosePlayerType('◉'); // Black
    const player2 = choosePlayerType('○'); // White

    const game = new Othello(player1, player2);
    await game.playGame();
}

async function main() {
    while (true) {
        console.clear();
        console.log("Welcome to the Othello Game Menu!");
        console.log("1: Start Game");
        console.log("2: Exit");

        const choice = readlineSync.question('Enter choice (1 or 2): ');

        if (choice === '1') {
            await startGame();
        } else if (choice === '2') {
            console.log("Exiting the game. Goodbye!");
            process.exit();
        } else {
            console.log("Invalid choice. Please enter 1 or 2.");
        }
    }
}

main();
