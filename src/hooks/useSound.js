import { useEffect, useRef } from 'react';

export function useSound(path, duration, loop = true) {
    const audioRef = useRef(null);
    useEffect(() => {
        audioRef.current = new Audio(path);
        audioRef.current.loop = loop;
        return () => {
            audioRef.current.pause();
            audioRef.current = null;
        };
    }, []);
    const playSound = () => {
        audioRef.current.play();
        setTimeout(() => {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
        }, duration);
    };
    const pauseSound = () => {
        audioRef.current.pause();
    };
    return { playSound, pauseSound };
}
