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
    checkHorizontal(x, y, value) {
        let count = 0;
        for (let j = Math.max(0, y - 4); j <= Math.min(this.width - 1, y + 4); j++) {
            if (this.board[x][j] === value) count++;
            else count = 0;
            if (count >= 5) return count;
        }
        return Math.min(count, 4);
    }

    checkVertical(x, y, value) {
        let count = 0;
        for (let i = Math.max(0, x - 4); i <= Math.min(this.height - 1, x + 4); i++) {
            if (this.board[i][y] === value) count++;
            else count = 0;
            if (count >= 5) return count;
        }
        return Math.min(count, 4);
    }

    checkRightDiagonalAI(x, y, value) {
        let count = 0;
        let i = Math.max(0, x - 4);
        let j = Math.max(0, y - 4);
        while (i <= Math.min(this.height - 1, x + 4) && j <= Math.min(this.width - 1, y + 4)) {
            if (this.board[i][j] === value) count++;
            else count = 0;
            if (count >= 5) return count;
            i++;
            j++;
        }
        return Math.min(count, 4);
    }

    checkLeftDiagonalAI(x, y, value) {
        let count = 0;
        let i = Math.max(0, x - 4);
        let j = Math.min(this.width - 1, y + 4);
        while (i <= Math.min(this.height - 1, x + 4) && j >= Math.max(0, y - 4)) {
            if (this.board[i][j] === value) count++;
            else count = 0;
            if (count >= 5) return count;
            i++;
            j--;
        }
        return Math.min(count, 4);
    }
    // make Move
    async makeMove(x, y) {
        if (!this.checkValid(x, y)) {
            return false;
        }

        // Lưu nước đi của người chơi
        this.lastMove = { x, y };
        this.board[x][y] = this.player;

        // Kiểm tra thắng/hòa sau nước đi của người chơi
        if (this.checkWin(x, y)) {
            this.winner = this.player;
            return 'WIN';
        }

        if (this.checkDraw()) {
            this.draw = true;
            return 'DRAW';
        }

        // Xử lý theo chế độ chơi
        if (this.typeGame === '1vs1') {
            this.player = this.player === 'X' ? 'O' : 'X';
            return true;
        } else if (this.typeGame === '1vsCPU') {
            // Chuyển lượt cho máy
            this.player = this.computer;

            // Tính toán nước đi của máy
            const computerMove = this.getPointsComputer();
            if (!computerMove) return true;

            // Đợi một chút để tạo cảm giác máy đang suy nghĩ
            await delay(500);

            // Thực hiện nước đi của máy
            const [i, j] = computerMove;
            this.lastMove = { x: i, y: j };
            this.board[i][j] = this.computer;

            // Kiểm tra thắng/hòa sau nước đi của máy
            if (this.checkWin(i, j)) {
                this.winner = this.computer;
                return 'WIN';
            }

            if (this.checkDraw()) {
                this.draw = true;
                return 'DRAW';
            }

            // Chuyển lượt lại cho người chơi
            this.player = this.human;
            return 'COMPUTER_MOVED';
        }

        return true;
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
        } else {
            this.human = 'X';
            this.computer = 'O';
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
                                this.checkHorizontal(i, j, this.computer),
                                this.checkVertical(i, j, this.computer),
                                this.checkRightDiagonalAI(i, j, this.computer),
                                this.checkLeftDiagonalAI(i, j, this.computer)
                            )
                        ) +
                        MAP_POINT_HUMAN.get(
                            Math.max(
                                this.checkHorizontal(i, j, this.human),
                                this.checkVertical(i, j, this.human),
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
