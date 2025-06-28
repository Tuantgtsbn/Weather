import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import TabAddPerson from '@/components/Wheel/TabAddPerson';
import TabSetting from '@/components/Wheel/TabSetting';
import Wheel from '@/components/Wheel/Wheel';
import { useEffect, useMemo, useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from '@/components/ui/dialog';
import { DialogClose } from '@radix-ui/react-dialog';
import { Button } from '@/components/ui/button';
import { useSound } from '@/hooks/useSound';
import winnerAudio from '@/assets/audios/winner.mp3';
function WheelRandomPage() {
    const [labels, setLabels] = useState([]);
    const [config, setConfig] = useState(() => {
        const savedConfig = localStorage.getItem('wheelConfig');
        return savedConfig ? JSON.parse(savedConfig) : { sound: true, spinTime: 10 };
    });
    const { playSound: playSoundWinner, pauseSound: pauseSoundWinner } = useSound(
        winnerAudio, // Sử dụng biến đã import thay vì string path
        5000,
        false
    );

    const [result, setResult] = useState(null);
    const [openModalResult, setOpenModalResult] = useState(false);
    const handleChangeConfig = (newConfig) => {
        localStorage.setItem('wheelConfig', JSON.stringify(newConfig));
        setConfig(newConfig);
    };
    const [textAreaValue, setTextAreaValue] = useState('');
    const checkResultDuplicate = useMemo(() => {
        if (result) {
            let count = 0;
            for (let i = 0; i < labels.length; i++) {
                if (labels[i] === result.name) {
                    count++;
                }
                if (count > 1) {
                    return true; // Có ít nhất 2 kết quả trùng nhau
                }
            }
        }
        return false; // Không có kết quả trùng nhau
    }, [result, labels]);
    const handleRemoveLabel = () => {
        const newLabels = labels.filter((item, index) => index !== result.index);
        setLabels(newLabels);
        setTextAreaValue(newLabels.join('\n')); // Cập nhật nội dung của textarea
        setResult(null); // Reset result after removing label
        setOpenModalResult(false); // Close the modal after removing label
    };
    const handleRemoveAllDuplicateLabels = () => {
        const newLabels = labels.filter((item, index) => {
            return item !== result.name;
        });
        setLabels(newLabels);
        setTextAreaValue(newLabels.join('\n')); // Cập nhật nội dung của textarea
        setResult(null); // Reset result after removing label
        setOpenModalResult(false); // Close the modal after removing label
    };
    useEffect(() => {
        if (config.sound && result && openModalResult) {
            playSoundWinner();
        } else if (config.sound && result && !openModalResult) {
            pauseSoundWinner();
        }
    }, [result, openModalResult]);
    return (
        <div className='flex flex-col lg:flex-row gap-[20px] justify-center'>
            <div className='flex-1 flex justify-center items-center'>
                <Wheel
                    labels={labels}
                    config={config}
                    setOpenModal={setOpenModalResult}
                    setResult={setResult}
                />
            </div>
            <div className='lg:min-w-[400px] max-lg:h-[600px]'>
                <Tabs defaultValue='tab1' orientation='vertical' className='h-full'>
                    <TabsList aria-label='tabs example'>
                        <TabsTrigger className='data-[state=active]:bg-gray-400' value='tab1'>
                            Cơ bản
                        </TabsTrigger>
                        <TabsTrigger className='data-[state=active]:bg-gray-400' value='tab2'>
                            Nâng cao
                        </TabsTrigger>
                    </TabsList>
                    <TabsContent value='tab1'>
                        <TabAddPerson
                            setLabels={setLabels}
                            textAreaValue={textAreaValue}
                            setTextAreaValue={setTextAreaValue}
                        />
                    </TabsContent>
                    <TabsContent value='tab2'>
                        <TabSetting config={config} setConfig={handleChangeConfig} />
                    </TabsContent>
                </Tabs>
            </div>
            <Dialog open={openModalResult} onOpenChange={setOpenModalResult}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Chúng ta có 1 người chiến thắng</DialogTitle>
                        <DialogDescription className='text-2xl font-bold'>
                            {result ? result.name : 'Chưa có kết quả nào'}
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant='outline'>Đóng</Button>
                        </DialogClose>
                        <Button onClick={handleRemoveLabel} className='bg-blue-500'>
                            Xóa tên
                        </Button>
                        {checkResultDuplicate && (
                            <Button
                                onClick={handleRemoveAllDuplicateLabels}
                                className='bg-blue-300'
                            >
                                Xóa tất cả
                            </Button>
                        )}
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}

export default WheelRandomPage;
