import { Checkbox } from '../ui/checkbox';
import { Label } from '../ui/label';
import * as Slider from '@radix-ui/react-slider';
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';
function TabSetting({ config, setConfig }) {
    return (
        <div className='space-y-4'>
            <div>
                <Label className='font-bold text-xl mb-4'>Âm thanh</Label>
                <div className='flex gap-[20px]'>
                    <div className='flex items-center gap-2'>
                        <Checkbox
                            id='turnOnSound'
                            name='sound'
                            checked={config?.sound}
                            onCheckedChange={(checked) => setConfig({ ...config, sound: checked })}
                        />
                        <Label htmlFor='turnOnSound'>Bật</Label>
                    </div>
                    <div className='flex items-center gap-2'>
                        <Checkbox
                            id='turnOffSound'
                            name='sound'
                            checked={!config?.sound}
                            onCheckedChange={(checked) => setConfig({ ...config, sound: !checked })}
                        />
                        <Label htmlFor='turnOffSound'>Tắt</Label>
                    </div>
                </div>
            </div>
            <div>
                <Label className='font-bold text-xl mb-4'>Thời gian quay</Label>
                <div className='flex flex-col gap-2'>
                    <Slider.Root
                        className='relative flex items-center select-none w-full h-5'
                        defaultValue={config?.spinTime ? [config?.spinTime] : [10]}
                        min={1}
                        max={60}
                        step={1}
                        onValueChange={(value) => setConfig({ ...config, spinTime: value[0] })}
                    >
                        <Slider.Track className='bg-slate-200 relative grow rounded-full h-2'>
                            <Slider.Range className='absolute bg-blue-500 rounded-full h-full' />
                        </Slider.Track>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Slider.Thumb className='block w-5 h-5 bg-blue-500 rounded-full hover:cursor-grab' />
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>{config?.spinTime}s</p>
                            </TooltipContent>
                        </Tooltip>
                    </Slider.Root>
                    <div className='flex justify-between text-sm text-gray-500'>
                        {[1, 10, 20, 30, 40, 50, 60].map((value) => (
                            <span key={value}>{value}s</span>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TabSetting;
