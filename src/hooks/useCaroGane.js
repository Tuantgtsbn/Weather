import { useState, useEffect, useCallback } from 'react';
import Caro from '../class/Caro';

// Correctly implemented delay function
function delay(time) {
    return new Promise((resolve) => setTimeout(resolve, time));
}

export default function useCaroGame(sizeBoard, typeGame) {
    const [board, setBoard] = useState(
        Array.from({ length: sizeBoard }, () => Array(sizeBoard).fill(''))
    );
    const [player, setPlayer] = useState('X');
    const [winner, setWinner] = useState('');
    const [draw, setDraw] = useState(false);
    const [human, setHuman] = useState('X');
    const [computer, setComputer] = useState('O');
    const [resultWin, setResultWin] = useState({});
    const [gameInstance] = useState(new Caro(sizeBoard, sizeBoard, typeGame));
    const [lastMove, setLastMove] = useState({});
    const [userX, setUserX] = useState('left');
    const [firstMoveOfComputer, setFirstMoveOfComputer] = useState(true);

    // Update the game instance when board changes
    useEffect(() => {
        gameInstance.board = board;
        gameInstance.player = player;
        gameInstance.winner = winner;
        gameInstance.draw = draw;
        gameInstance.resultWin = resultWin;
    }, [board, player, winner, draw, resultWin, gameInstance]);

    const checkWin = useCallback(
        (x, y) => {
            const result = gameInstance.checkWin(x, y);
            if (result) {
                setResultWin({ ...gameInstance.resultWin });
                setWinner(player);
            }
            return result;
        },
        [gameInstance, player]
    );

    const checkDraw = useCallback(() => {
        const result = gameInstance.checkDraw();
        if (result) {
            setDraw(true);
        }
        return result;
    }, [gameInstance]);

    const makeComputerMove = useCallback(async () => {
        if (typeGame === '1vsCPU' && player === computer && !winner && !draw) {
            await delay(1000); // Reduced delay for better UX
            let i, j;
            if (firstMoveOfComputer) {
                i = Math.floor(sizeBoard / 2);
                j = Math.floor(sizeBoard / 2);
                console.log('First move of computer', [i, j]);
                setFirstMoveOfComputer(false);
            } else {
                [i, j] = gameInstance.getPointsComputer();
                console.log('Next move of computer', [i, j]);
            }

            const newBoard = [...board];
            newBoard[i][j] = computer;
            setBoard(newBoard);
            setLastMove({ x: i, y: j });

            if (gameInstance.checkWin(i, j)) {
                setWinner(computer);
                setResultWin({ ...gameInstance.resultWin });
                return 'WIN';
            }

            if (gameInstance.checkDraw()) {
                setDraw(true);
                return 'DRAW';
            }

            setPlayer(human);
        }
        return null;
    }, [board, player, winner, draw, typeGame, computer, human, gameInstance]);

    useEffect(() => {
        makeComputerMove();
    }, [player, makeComputerMove]);

    const makeMove = useCallback(
        async (x, y) => {
            if (winner || draw || board[x][y] !== '') {
                return false;
            }

            const newBoard = [...board];
            newBoard[x][y] = player;
            setBoard(newBoard);
            setLastMove({ x, y });

            if (gameInstance.checkWin(x, y)) {
                setWinner(player);
                setResultWin({ ...gameInstance.resultWin });
                return 'WIN';
            }

            if (gameInstance.checkDraw()) {
                setDraw(true);
                return 'DRAW';
            }

            if (typeGame === '1vs1') {
                setPlayer(player === 'X' ? 'O' : 'X');
            } else if (typeGame === '1vsCPU' && player === human) {
                setPlayer(computer);
            }

            return null;
        },
        [board, player, winner, draw, typeGame, human, computer, gameInstance]
    );

    const resetGame = useCallback(() => {
        setBoard(Array.from({ length: sizeBoard }, () => Array(sizeBoard).fill('')));
        setPlayer('X');
        setWinner('');
        setDraw(false);
        setResultWin({});
        setLastMove({});
        setUserX((prevUserX) => (prevUserX === 'left' ? 'right' : 'left'));
        setHuman((prevHuman) => (prevHuman === 'X' ? 'O' : 'X'));
        setComputer((prevComputer) => (prevComputer === 'X' ? 'O' : 'X'));
        setFirstMoveOfComputer(computer === 'O');
        gameInstance.resetGame();
    }, [gameInstance, sizeBoard]);

    return {
        board,
        player,
        winner,
        draw,
        resultWin,
        makeMove,
        resetGame,
        lastMove,
        userX
    };
}
