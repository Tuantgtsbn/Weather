import { useState } from 'react';
import { Button } from '@/components/ui/button';
import CaroSVG from '@/assets/images/CaroLogo.png';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '@/components/ui/select';
import GameCaro from '@/components/Caro/Game';

function Caro() {
    const [openModalSetting, setOpenModalSetting] = useState(false);
    const [typeGame, setTypeGame] = useState('1vs1');
    const [sizeBoard, setSizeBoard] = useState('10');
    const [screen, setScreen] = useState('menu');
    const [loading, setLoading] = useState(false);

    const handleClickStartGame = () => {
        setLoading(true);
        // Thêm hiệu ứng loading nhẹ
        setTimeout(() => {
            setScreen('game');
            setLoading(false);
        }, 300);
    };

    const handleBackToMenu = () => {
        setScreen('menu');
    };

    return (
        <div className='flex flex-col justify-center items-center'>
            {screen === 'menu' && (
                <div className='w-[90%] h-[90%] md:w-[600px]'>
                    <div>
                        <p className='text-3xl font-bold text-center'>Caro thôi nào</p>
                    </div>
                    <img src={CaroSVG} alt='Logo Caro' className='mb-[30px]' />
                    <div className='flex flex-col gap-5 items-center'>
                        <Button
                            className='bg-blue-500 w-[200px]'
                            onClick={handleClickStartGame}
                            disabled={loading}
                        >
                            {loading ? 'Đang tải...' : 'Bắt đầu ngay'}
                        </Button>
                        <Button
                            className='bg-blue-500 w-[200px]'
                            onClick={() => setOpenModalSetting(true)}
                            disabled={loading}
                        >
                            Tùy chọn
                        </Button>
                    </div>
                    <Dialog open={openModalSetting} onOpenChange={setOpenModalSetting}>
                        <DialogTrigger asChild></DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Cài đặt</DialogTitle>
                            </DialogHeader>
                            <div>
                                <Label className='mb-2' htmlFor='gameMode'>
                                    Chế độ chơi
                                </Label>
                                <Select value={typeGame} onValueChange={setTypeGame}>
                                    <SelectTrigger className='w-[180px]'>
                                        <SelectValue placeholder='Chọn chế độ chơi' />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectItem value='1vs1'>Người với người</SelectItem>
                                            <SelectItem value='1vsCPU'>Người với máy</SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div>
                                <Label className='mb-2' htmlFor='boardSize'>
                                    Kích thước bàn
                                </Label>
                                <Select value={sizeBoard} onValueChange={setSizeBoard}>
                                    <SelectTrigger className='w-[180px]'>
                                        <SelectValue placeholder='Chọn kích cỡ bàn' />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectItem value='10'>10 * 10</SelectItem>
                                            <SelectItem value='15'>15 * 15</SelectItem>
                                            <SelectItem value='20'>20 * 20</SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>
                            <DialogFooter className='justify-end'>
                                <DialogClose asChild>
                                    <Button type='button' className='bg-black text-white p-3'>
                                        Đóng
                                    </Button>
                                </DialogClose>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </div>
            )}
            {screen === 'game' && (
                <>
                    <Button
                        className='mb-4 bg-gray-500 self-end dark:bg-red-500'
                        onClick={handleBackToMenu}
                    >
                        Quay lại menu
                    </Button>
                    <GameCaro typeGame={typeGame} sizeBoard={Number(sizeBoard)} />
                </>
            )}
        </div>
    );
}

export default Caro;
