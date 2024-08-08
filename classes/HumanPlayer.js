const { Player } = require('./player');
const readlineSync = require('readline-sync');

class HumanPlayer extends Player {
    constructor(color) {
        super(color);
    }

    decideMove(BoardObj) {
        const validMoves = BoardObj.findValidMoves(this);
        const moves = validMoves.map(([x, y]) => `${String.fromCharCode(65 + y)}${x + 1}`).join(' ');
        console.log("Valid moves: " + moves);

        let row, col;
        while (true) {
            // รับ input จากผู้ใช้
            const userInput = readlineSync.question('Enter your move (e.g., B3): ');
            row = parseInt(userInput[1]) - 1;
            col = userInput[0].toUpperCase().charCodeAt(0) - 65;

            // ตรวจสอบว่าการเคลื่อนไหวที่ผู้ใช้ป้อนเป็น valid move หรือไม่
            if (validMoves.some(move => move[0] === row && move[1] === col)) {
                break;
            } else {
                console.log("Invalid move. Please enter a valid move.");
            }
        }
        return [row, col];
    }
}

module.exports = { HumanPlayer };
