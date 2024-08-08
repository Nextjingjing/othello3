const { Player } = require('./player');

class BotPlayer extends Player {
    constructor(color) {
        super(color);
    }

    // Helper function to add a delay
    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async decideMove(board) {
        const validMoves = board.findValidMoves(this);

        if (validMoves.length > 0) {
            await this.delay(500); // Introduce a 0.5 second delay
            return validMoves[0];
        }

        return null;
    }
}

module.exports = { BotPlayer };
