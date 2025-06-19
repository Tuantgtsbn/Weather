// Class Caro

function delay(time) {
    return new Promise((resolve) => setTimeout(resolve, time));
}
const MAP_SCORE_COMPUTER = new Map([
    [6, Infinity],
    [5, 99999],
    [4, 2000],
    [3, 500],
    [2, 300],
    [1, 100]
]);
const MAP_POINT_HUMAN = new Map([
    [5, 19999],
    [4, 9999],
    [3, 1000],
    [2, 400],
    [1, 10],
    [0, 0]
]);

class Caro {
    constructor(width, height, typeGame) {
        this.width = width;
        this.height = height;
        this.board = Array.from({ length: height }, () => Array(width).fill(''));
        this.typeGame = typeGame;
        this.player = 'X';
        this.winner = '';
        this.draw = false;
        this.resultWin = {};
        this.human = 'X';
        this.computer = 'O';
        this.lastMove = null;
    }
    //check Win Horizontal
    checkWinHorizontal(x, y, value) {
        let count = 1;
        let start = y;
        let end = y;
        let j = y + 1;
        while (j < this.width && this.board[x][j] === value) {
            count++;
            end = j;
            j++;
        }
        j = y - 1;
        while (j >= 0 && this.board[x][j] === value) {
            start = j;
            j--;
            count++;
        }
        return { start, end, count };
    }
    // check Win Vertical
    checkWinVertical(x, y, value) {
        let count = 1;
        let start = x;
        let end = x;
        let i = x + 1;
        while (i < this.height && this.board[i][y] === value) {
            end = i;
            i++;
            count++;
        }
        i = x - 1;
        while (i >= 0 && this.board[i][y] === value) {
            start = i;
            i--;
            count++;
        }
        return { start, end, count };
    }
    // check Right Diagonal
    checkRightDiagonal(x, y, value) {
        let start = { x, y };
        let end = { x, y };
        let count = 1;
        let i = x + 1;
        let j = y + 1;
        while (i < this.height && j < this.width && this.board[i][j] === value) {
            end.x = i;
            end.y = j;
            i++;
            j++;
            count++;
        }
        i = x - 1;
        j = y - 1;
        while (i >= 0 && j >= 0 && this.board[i][j] === value) {
            start.x = i;
            start.y = j;
            i--;
            j--;
            count++;
        }
        return { start, end, count };
    }
    // check Left Diagonal
    checkLeftDiagonal(x, y, value) {
        let start = { x, y };
        let end = { x, y };
        let count = 1;
        let i = x + 1;
        let j = y - 1;
        while (i < this.height && j >= 0 && this.board[i][j] === value) {
            end.x = i;
            end.y = j;
            i++;
            j--;
            count++;
        }
        i = x - 1;
        j = y + 1;
        while (i >= 0 && j < this.width && this.board[i][j] === value) {
            start.x = i;
            start.y = j;
            i--;
            j++;
            count++;
        }
        return { start, end, count };
    }
    // check Win
    checkWin(x, y) {
        let isWin = false;
        const currentPlayer = this.board[x][y];
        const horizontal = this.checkWinHorizontal(x, y, currentPlayer);
        const vertical = this.checkWinVertical(x, y, currentPlayer);
        const rightDiagonal = this.checkRightDiagonal(x, y, currentPlayer);
        const leftDiagonal = this.checkLeftDiagonal(x, y, currentPlayer);

        if (horizontal.count >= 5) {
            isWin = true;
            this.resultWin.horizontal = horizontal;
        }
        if (vertical.count >= 5) {
            isWin = true;
            this.resultWin.vertical = vertical;
        }
        if (rightDiagonal.count >= 5) {
            isWin = true;
            this.resultWin.rightDiagonal = rightDiagonal;
        }
        if (leftDiagonal.count >= 5) {
            isWin = true;
            this.resultWin.leftDiagonal = leftDiagonal;
        }
        return isWin;
    }
    // check Draw
    checkDraw() {
        for (let i = 0; i < this.height; i++) {
            for (let j = 0; j < this.width; j++) {
                if (this.board[i][j] === '') {
                    return false;
                }
            }
        }
        return true;
    }
    // check Valid
    checkValid(x, y) {
        if (x < 0 || x >= this.height || y < 0 || y >= this.width || this.board[x][y] !== '') {
            return false;
        }
        return true;
    }
    // Hàm đánh giá cho AI
    checkHorizontalAI(x, y, value) {
        if (this.board[x][y] !== '') return 0;

        let count = 1;
        let j = y + 1;
        while (j < this.width && this.board[x][j] === value) {
            count++;
            j++;
        }

        j = y - 1;
        while (j >= 0 && this.board[x][j] === value) {
            count++;
            j--;
        }

        return count;
    }

    checkVerticalAI(x, y, value) {
        if (this.board[x][y] !== '') return 0;

        let count = 1;
        let i = x + 1;
        while (i < this.height && this.board[i][y] === value) {
            count++;
            i++;
        }

        i = x - 1;
        while (i >= 0 && this.board[i][y] === value) {
            count++;
            i--;
        }

        return count;
    }

    checkRightDiagonalAI(x, y, value) {
        if (this.board[x][y] !== '') return 0;

        let count = 1;
        let i = x + 1;
        let j = y + 1;
        while (i < this.height && j < this.width && this.board[i][j] === value) {
            count++;
            i++;
            j++;
        }

        i = x - 1;
        j = y - 1;
        while (i >= 0 && j >= 0 && this.board[i][j] === value) {
            count++;
            i--;
            j--;
        }

        return count;
    }

    checkLeftDiagonalAI(x, y, value) {
        if (this.board[x][y] !== '') return 0;

        let count = 1;
        let i = x + 1;
        let j = y - 1;
        while (i < this.height && j >= 0 && this.board[i][j] === value) {
            count++;
            i++;
            j--;
        }

        i = x - 1;
        j = y + 1;
        while (i >= 0 && j < this.width && this.board[i][j] === value) {
            count++;
            i--;
            j++;
        }

        return count;
    }
    // make Move
    async makeMove(x, y) {
        if (this.typeGame === '1vs1') {
            if (!this.checkValid(x, y)) return false;
            this.board[x][y] = this.player;
            this.lastMove = { x, y };
            if (this.checkWin(x, y)) {
                this.winner = this.player;
                return 'WIN';
            }
            if (this.checkDraw()) {
                this.draw = true;
                return 'DRAW';
            }
            this.player = this.player === 'X' ? 'O' : 'X';
            return null;
        } else if (this.typeGame === '1vsCPU') {
            if (this.player === this.human) {
                if (!this.checkValid(x, y)) return false;
                this.board[x][y] = this.player;
                this.lastMove = { x, y };
                if (this.checkWin(x, y)) {
                    this.winner = this.player;
                    return 'WIN';
                }
                if (this.checkDraw()) {
                    this.draw = true;
                    return 'DRAW';
                }
                this.player = this.computer;
                return null;
            } else if (this.player === this.computer) {
                await delay(2000);
                const [i, j] = this.getPointsComputer();
                this.board[i][j] = this.player;
                this.lastMove = { x: i, y: j };
                if (this.checkWin(i, j)) {
                    this.winner = this.player;
                    return 'WIN';
                }
                if (this.checkDraw()) {
                    this.draw = true;
                    return 'DRAW';
                }
                this.player = this.human;
                return null;
            }
        }
    }
    //reset Game
    resetGame() {
        this.board = Array.from({ length: this.height }, () => Array(this.width).fill(''));
        this.player = 'X';
        this.winner = '';
        this.draw = false;
        this.resultWin = {};
        this.lastMove = null;

        if (this.typeGame === '1vsCPU') {
            this.computer = this.computer === 'X' ? 'O' : 'X';
            this.human = this.human === 'X' ? 'O' : 'X';
        }
    }
    // Get point by computer
    getPointsComputer() {
        let maxScore = -Infinity;
        let pointsComputer = [];
        let listScorePoint = [];

        for (let i = 0; i < this.height; i++) {
            for (let j = 0; j < this.width; j++) {
                if (this.board[i][j] === '') {
                    let score =
                        MAP_SCORE_COMPUTER.get(
                            Math.max(
                                this.checkHorizontalAI(i, j, this.computer),
                                this.checkVerticalAI(i, j, this.computer),
                                this.checkRightDiagonalAI(i, j, this.computer),
                                this.checkLeftDiagonalAI(i, j, this.computer)
                            )
                        ) +
                        MAP_POINT_HUMAN.get(
                            Math.max(
                                this.checkHorizontalAI(i, j, this.human),
                                this.checkVerticalAI(i, j, this.human),
                                this.checkRightDiagonalAI(i, j, this.human),
                                this.checkLeftDiagonalAI(i, j, this.human)
                            ) - 1
                        );

                    listScorePoint.push({
                        score: score,
                        point: [i, j]
                    });

                    if (maxScore < score) {
                        maxScore = score;
                    }
                }
            }
        }

        // Get list max score
        for (const element of listScorePoint) {
            if (element.score === maxScore) {
                pointsComputer.push(element.point);
            }
        }

        if (pointsComputer.length === 0) return null;
        return pointsComputer[Math.floor(Math.random() * pointsComputer.length)];
    }
}

export default Caro;
