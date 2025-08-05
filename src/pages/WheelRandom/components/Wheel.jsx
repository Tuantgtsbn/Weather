import { useEffect, useMemo, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { Button } from '../../../components/ui/button';
import { useSound } from '@/hooks/useSound';
import spinAudio from '@/assets/audios/ding.mp3';
import useDebourceScreen from '@/hooks/useDebourceScreen';
const listColors = ['#3369e8', '#d50f25', '#eeb211', '#009925'];
function Wheel({ labels, config, setOpenModal, setResult }) {
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);
    const canvasRef = useRef(null);
    useDebourceScreen(() => {
        setScreenWidth(window.innerWidth);
    }, 1000);
    const sectionAngle = useMemo(() => {
        return (2 * Math.PI) / labels.length;
    }, [labels.length]);
    const { playSound: playSoundSpinning } = useSound(
        spinAudio,
        config?.spinTime * 1000 || 1000,
        true
    );

    const [isSpinning, setIsSpinning] = useState(false);
    const requestIdRef = useRef(null);

    const drawWheel = (ctx, angleOffset = 0) => {
        const radius = Math.min(ctx.canvas.width, ctx.canvas.height) / 2 - 30;
        const centerX = ctx.canvas.width / 2;
        const centerY = ctx.canvas.height / 2;
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        // Vẽ các phân đoạn của bánh xe
        for (let i = 0; i < labels.length; i++) {
            const startAngle = i * sectionAngle + angleOffset;
            const endAngle = startAngle + sectionAngle;

            ctx.beginPath();
            ctx.moveTo(centerX, centerY);
            ctx.arc(centerX, centerY, radius, startAngle, endAngle);
            ctx.closePath();
            let y = i % listColors.length;
            if (i === labels.length - 1 && y === 0) y = 1;
            ctx.fillStyle = listColors[y];
            ctx.fill();

            // Vẽ nhãn
            ctx.save();
            ctx.translate(centerX, centerY);
            ctx.rotate(startAngle + sectionAngle / 2);
            ctx.textAlign = 'center';
            ctx.fillStyle = '#000';
            ctx.textBaseline = 'middle';
            ctx.font = 'bold 24px Arial';
            ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
            ctx.shadowBlur = 3;
            ctx.shadowOffsetX = 1;
            ctx.shadowOffsetY = 1;
            ctx.fillText(labels[i], radius * 0.65, 0);
            ctx.restore();
        }

        // Vẽ viền ngoài
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius + 5, 0, 2 * Math.PI);

        if (labels.length === 0) {
            ctx.fillStyle = 'red';
            ctx.fill();
            // Vẽ thông báo nếu không có tên
            ctx.fillStyle = '#000';
            ctx.beginPath();
            ctx.closePath();
        }
        // Vẽ múi tên
        ctx.fillStyle = '#bbb';
        ctx.beginPath();
        ctx.moveTo(centerX + radius - 20, centerY); // đỉnh mũi tên
        ctx.lineTo(centerX + radius + 20, centerY - 20); // góc trên
        ctx.lineTo(centerX + radius + 20, centerY + 20); // góc dưới
        ctx.closePath();
        ctx.fill();
        // Vẽ tâm bánh xe
        const centerGradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, 40);
        centerGradient.addColorStop(0, '#fff');
        centerGradient.addColorStop(0.7, '#f8f9fa');
        centerGradient.addColorStop(1, '#e9ecef');

        ctx.beginPath();
        ctx.arc(centerX, centerY, 40, 0, 2 * Math.PI);
        ctx.fillStyle = centerGradient;
        ctx.fill();
        ctx.strokeStyle = '#dee2e6';
        ctx.lineWidth = 3;
        ctx.stroke();
        // Vẽ logo tâm
        ctx.fillStyle = '#6c757d';
        ctx.font = 'bold 30px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('🎯', centerX, centerY);
    };

    function shadeColor(color, percent) {
        const num = parseInt(color.replace('#', ''), 16);
        const amt = Math.round(2.55 * percent);
        const R = (num >> 16) + amt;
        const G = ((num >> 8) & 0x00ff) + amt;
        const B = (num & 0x0000ff) + amt;
        return (
            '#' +
            (
                0x1000000 +
                (R < 255 ? (R < 1 ? 0 : R) : 255) * 0x10000 +
                (G < 255 ? (G < 1 ? 0 : G) : 255) * 0x100 +
                (B < 255 ? (B < 1 ? 0 : B) : 255)
            )
                .toString(16)
                .slice(1)
        );
    }
    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        if (ctx) {
            drawWheel(ctx);
        }
    }, [labels, screenWidth]);
    const spinWheel = () => {
        if (labels.length === 0) {
            toast.warning('Vui lòng thêm ít nhất 1 tên');
            return;
        }
        if (config.sound) {
            playSoundSpinning();
        }
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const omega0 = Math.random() * 8 + 10;
        const startTime = performance.now();
        const angleAt = (t) => omega0 * t * (1 - t / (2 * config.spinTime));
        const animate = (now) => {
            const t = (now - startTime) / 1000;
            if (t >= config.spinTime) {
                const finalAngle = angleAt(config.spinTime) % (2 * Math.PI);
                drawWheel(ctx, finalAngle);
                const index = Math.floor(
                    (labels.length - finalAngle / sectionAngle) % labels.length
                );
                setResult({
                    name: labels[index],
                    index: index
                });
                setOpenModal(true);
                setIsSpinning(false);
                return;
            }
            const angle = angleAt(t) % (2 * Math.PI);
            drawWheel(ctx, angle);
            requestIdRef.current = requestAnimationFrame(animate);
        };
        setResult(null);
        setIsSpinning(true);
        requestIdRef.current = requestAnimationFrame(animate);
    };
    return (
        <div style={{ textAlign: 'center' }}>
            <canvas
                ref={canvasRef}
                width={screenWidth > 1024 ? 800 : screenWidth > 600 ? 600 : screenWidth - 40}
                height={screenWidth > 1024 ? 800 : screenWidth > 600 ? 600 : screenWidth - 40}
            />
            <Button
                onClick={spinWheel}
                disabled={isSpinning}
                className='bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed text-2xl px-4 py-2 h-max'
            >
                {isSpinning ? 'Đang quay...' : 'Quay'}
            </Button>
        </div>
    );
}

export default Wheel;
