import { useEffect, useRef, useState } from 'react';
import { Input } from '../ui/input';
import TableCaro from './TableCaro';
import { Button } from '../ui/button';
import { SquarePen } from 'lucide-react';
import Caro from '../../class/Caro';
import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogTrigger,
    AlertDialogTitle,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogCancel,
    AlertDialogAction
} from '../ui/alert-dialog';
const userX = 'left';
function GameCaro({ typeGame, sizeBoard }) {
    const [userName1, setUserName1] = useState('Player 1');
    const [userName2, setUserName2] = useState(typeGame === '1vs1' ? 'Player 2' : 'Computer');
    const [score, setScore] = useState({
        player1: 0,
        player2: 0
    });
    const [boardState, setBoardState] = useState([]);
    const caroObj = useRef(new Caro(sizeBoard, sizeBoard, typeGame));
    const [openModalResult, setOpenModalResult] = useState(false);
    const [gameStatus, setGameStatus] = useState('');
    const [currentPlayer, setCurrentPlayer] = useState('X');

    // Khởi tạo bảng và cập nhật khi thay đổi kích thước hoặc chế độ chơi
    useEffect(() => {
        caroObj.current = new Caro(sizeBoard, sizeBoard, typeGame);
        resetBoard();
        setUserName2(typeGame === '1vs1' ? 'Player 2' : 'Computer');
    }, [sizeBoard, typeGame]);

    const resetBoard = () => {
        setBoardState(Array.from({ length: sizeBoard }, () => Array(sizeBoard).fill('')));
        setCurrentPlayer('X');
    };

    const handleClickResetGame = () => {
        caroObj.current.resetGame();
        resetBoard();
        setOpenModalResult(false);
    };

    const updateBoardState = (x, y, player) => {
        setBoardState((prev) => {
            const newBoard = JSON.parse(JSON.stringify(prev)); // Deep copy
            newBoard[x][y] = player;
            return newBoard;
        });
    };

    const handleOnClickCell = async (e, x, y) => {
        // Kiểm tra nếu ô đã được đánh hoặc trò chơi đã kết thúc
        if (caroObj.current.draw || caroObj.current.winner || boardState[x][y] !== '') {
            return;
        }

        // Kiểm tra nếu đang là lượt của máy tính
        if (typeGame === '1vsCPU' && caroObj.current.player === caroObj.current.computer) {
            return;
        }

        // Kiểm tra nếu nước đi hợp lệ
        if (caroObj.current.checkValid(x, y)) {
            // Cập nhật giao diện
            updateBoardState(x, y, caroObj.current.player);

            // Thực hiện nước đi
            const result = await caroObj.current.makeMove(x, y);

            // Xử lý kết quả
            if (result === 'WIN') {
                handleWin();
                return;
            }

            if (result === 'DRAW') {
                setGameStatus('DRAW');
                setOpenModalResult(true);
                return;
            }

            // Xử lý nước đi của máy tính
            if (typeGame === '1vsCPU' && result === 'COMPUTER_MOVED' && caroObj.current.lastMove) {
                const { x: compX, y: compY } = caroObj.current.lastMove;

                // Cập nhật bảng với nước đi của máy tính
                updateBoardState(compX, compY, caroObj.current.computer);

                // Kiểm tra nếu máy tính thắng
                if (caroObj.current.winner === caroObj.current.computer) {
                    handleWin();
                    return;
                }

                // Kiểm tra nếu hòa sau nước đi của máy
                if (caroObj.current.draw) {
                    setGameStatus('DRAW');
                    setOpenModalResult(true);
                    return;
                }
            }

            // Cập nhật người chơi hiện tại
            setCurrentPlayer(caroObj.current.player);
        }
    };

    const handleWin = () => {
        if (
            (userX === 'left' && caroObj.current.winner === 'X') ||
            (userX === 'right' && caroObj.current.winner === 'O')
        ) {
            setScore((prevScore) => ({
                ...prevScore,
                player1: prevScore.player1 + 1
            }));
        } else if (
            (userX === 'left' && caroObj.current.winner === 'O') ||
            (userX === 'right' && caroObj.current.winner === 'X')
        ) {
            setScore((prevScore) => ({
                ...prevScore,
                player2: prevScore.player2 + 1
            }));
        }
        setGameStatus('WIN');
        setOpenModalResult(true);
    };

    return (
        <>
            <div className='flex flex-row justify-between self-start w-[100%] mb-[50px]'>
                <div className=''>
                    <div className='flex gap-1.5 mb-2'>
                        <Input value={userName1} onChange={(e) => setUserName1(e.target.value)} />
                        <Button variant='outline'>
                            <SquarePen />
                        </Button>
                    </div>
                    <div
                        className={`w-[20px] h-[20px] border-1 rounded-full ${currentPlayer === 'X' ? 'bg-green-500' : 'bg-gray-300'}`}
                    ></div>
                </div>
                <div className=''>
                    <p className='text-center font-bold text-xl lg:text-4xl mb-2'>Tỷ số</p>
                    <div className='flex'>
                        <p className='w-[50px] h-[50px] flex justify-center items-center bg-red-500'>
                            {score.player1}
                        </p>
                        <p className='w-[50px] h-[50px] flex justify-center items-center bg-blue-500'>
                            {score.player2}
                        </p>
                    </div>
                </div>
                <div className=''>
                    <div className='flex gap-1.5 mb-2'>
                        <Input value={userName2} onChange={(e) => setUserName2(e.target.value)} />
                        <Button variant='outline'>
                            <SquarePen />
                        </Button>
                    </div>
                    <div
                        className={`w-[20px] h-[20px] border-1 rounded-full ${currentPlayer === 'O' ? 'bg-green-500' : 'bg-gray-300'}`}
                    ></div>
                </div>
            </div>
            <div className='w-[90%] h-[90%]'>
                <TableCaro
                    sizeBoard={sizeBoard}
                    onClickCell={handleOnClickCell}
                    boardState={boardState}
                />
            </div>
            <AlertDialog open={openModalResult} onOpenChange={setOpenModalResult}>
                <AlertDialogTrigger>Open</AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>
                            {gameStatus === 'WIN' ? 'Thông báo chiến thắng' : 'Thông báo kết quả'}
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                            {gameStatus === 'WIN'
                                ? `${caroObj.current.winner === 'X' ? userName1 : userName2} thắng`
                                : 'Hòa! Không có người thắng cuộc'}
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
