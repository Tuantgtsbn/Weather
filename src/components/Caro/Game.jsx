import { useState, useEffect } from 'react';
import { Input } from '../ui/input';
import TableCaro from './TableCaro';
import { Button } from '../ui/button';
import { SquarePen } from 'lucide-react';
import useCaroGame from '@/hooks/useCaroGane';
import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogCancel,
    AlertDialogAction
} from '../ui/alert-dialog';

function GameCaro({ typeGame, sizeBoard }) {
    const [userName1, setUserName1] = useState('Player 1');
    const [userName2, setUserName2] = useState(typeGame === '1vs1' ? 'Player 2' : 'Computer');
    const [score, setScore] = useState({
        player1: 0,
        player2: 0
    });
    const [openModalResult, setOpenModalResult] = useState(false);
    const { board, player, winner, draw, makeMove, resetGame, lastMove, resultWin, userX } =
        useCaroGame(sizeBoard, typeGame);
    // Show result modal when game ends
    useEffect(() => {
        if (winner || draw) {
            setOpenModalResult(true);
            // Update scores
            if (winner) {
                if ((userX === 'left' && winner === 'X') || (userX === 'right' && winner === 'O')) {
                    setScore((prevScore) => ({
                        ...prevScore,
                        player1: prevScore.player1 + 1
                    }));
                } else {
                    setScore((prevScore) => ({
                        ...prevScore,
                        player2: prevScore.player2 + 1
                    }));
                }
            }
        }
    }, [winner, draw, userX]);

    const handleClickResetGame = () => {
        resetGame();
        setOpenModalResult(false);
    };

    const handleOnClickCell = async (e, x, y) => {
        if (draw || winner || board[x][y] !== '') {
            return;
        }
        await makeMove(x, y);
    };
    const getWinner = () => {
        if (winner === 'X') {
            if (userX === 'left') {
                return userName1;
            } else {
                return userName2;
            }
        } else if (winner === 'O') {
            if (userX === 'left') {
                return userName2;
            } else {
                return userName1;
            }
        }
    };
    return (
        <>
            <div className='flex flex-row justify-between self-start w-[100%] mb-[50px]'>
                <div className=''>
                    <div className='flex gap-1.5 mb-2'>
                        <Input value={userName1} onChange={(e) => setUserName1(e.target.value)} />
                    </div>
                    <div
                        className={`w-[20px] h-[20px] border-1 rounded-full ${(userX === 'left' && player === 'X') || (userX === 'right' && player === 'O') ? 'bg-green-500' : 'hidden'}`}
                    ></div>
                </div>
                <div className=''>
                    <p className='text-center font-bold text-xl lg:text-4xl mb-2'>Tỷ số</p>
                    <div className='flex'>
                        <p className='w-[50px] h-[50px] text-2xl text-white font-bold flex justify-center items-center bg-red-500'>
                            {score.player1}
                        </p>
                        <p className='w-[50px] h-[50px] text-2xl text-white font-bold flex justify-center items-center bg-blue-500'>
                            {score.player2}
                        </p>
                    </div>
                </div>
                <div className=''>
                    <div className='flex gap-1.5 mb-2'>
                        <Input
                            value={userName2}
                            disabled={typeGame === '1vsCPU'}
                            onChange={(e) => setUserName2(e.target.value)}
                        />
                    </div>
                    <div
                        className={`w-[20px] h-[20px] border-1 rounded-full ${(userX === 'left' && player === 'O') || (userX === 'right' && player === 'X') ? 'bg-green-500' : 'hidden'}`}
                    ></div>
                </div>
            </div>
            <div className='max-w-[90%] max-h-[90%] overflow-scroll'>
                <TableCaro
                    sizeBoard={sizeBoard}
                    board={board}
                    resultWin={resultWin}
                    lastMove={lastMove}
                    onClickCell={handleOnClickCell}
                    winner={winner}
                />
            </div>
            <AlertDialog open={openModalResult} onOpenChange={setOpenModalResult}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>
                            {draw ? 'Hòa' : 'Thông báo chiến thắng'}
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                            {draw ? 'Trò chơi hòa!' : `${getWinner()} thắng!`}
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Thoát</AlertDialogCancel>
                        <AlertDialogAction onClick={handleClickResetGame}>
                            Chơi lại
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
}

export default GameCaro;
