const readlineSync = require('readline-sync');
const { Board } = require('./Board');

class Othello {
    constructor(player1, player2) {
        this.board = new Board();
        this.players = [player1, player2];
        this.currentPlayerIndex = 0;
    }

    switchTurn() {
        this.currentPlayerIndex = 1 - this.currentPlayerIndex;
    }

    getCurrentPlayer() {
        return this.players[this.currentPlayerIndex];
    }

    isGameOver() {
        const noMovesForBoth = this.board.findValidMoves(this.players[0]).length === 0 &&
                               this.board.findValidMoves(this.players[1]).length === 0;
        return noMovesForBoth;
    }

    async playGame() {
        while (!this.isGameOver()) {
            this.board.displayBoard();
            const currentPlayer = this.getCurrentPlayer();
            const validMoves = this.board.findValidMoves(currentPlayer);

            if (validMoves.length > 0) {
                console.log(`Player ${currentPlayer.getColor()}'s turn`);
                const move = await currentPlayer.decideMove(this.board);
                if (move && Array.isArray(move) && move.length === 2) {
                    const [row, col] = move;
                    this.board.placePiece(row, col, currentPlayer);
                } else {
                    console.log("Invalid move received from player.");
                }
            } else {
                console.log(`Player ${currentPlayer.getColor()} has no valid moves. Skipping turn.`);
            }

            this.switchTurn();
        }

        await this.displayFinalResult();
    }

    async displayFinalResult() {
        this.board.displayBoard();
        const { blackScore, whiteScore } = this.board.countPieces();
        console.log("Game over!");
        console.log(`Black (◉) score: ${blackScore}`);
        console.log(`White (○) score: ${whiteScore}`);

        if (blackScore > whiteScore) {
            console.log("Black (◉) wins!");
        } else if (whiteScore > blackScore) {
            console.log("White (○) wins!");
        } else {
            console.log("It's a tie!");
        }

        // Prompt the user to type "yeah" to exit the game loop
        console.log("Type 'yeah' to exit.");
        while (true) {
            const input = readlineSync.question('');
            if (input.toLowerCase() === 'yeah') {
                console.log("Exiting the game loop.");
                break; // Exit the loop
            } else {
                console.log("Invalid input. Please type 'yeah' to exit.");
            }
        }
    }
}

module.exports = { Othello };
