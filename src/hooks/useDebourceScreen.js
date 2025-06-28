import { useCallback, useEffect, useRef } from 'react';

const useDebourceScreen = (callback, delay) => {
    const timerRef = useRef(null);

    const debouncedCallback = useCallback(() => {
        if (timerRef.current) {
            clearTimeout(timerRef.current);
        }
        timerRef.current = setTimeout(() => {
            callback();
        }, delay);
    }, [callback, delay]);

    useEffect(() => {
        window.addEventListener('resize', debouncedCallback);
        return () => {
            window.removeEventListener('resize', debouncedCallback);
            if (timerRef.current) {
                clearTimeout(timerRef.current);
            }
        };
    }, [debouncedCallback]);

    return debouncedCallback;
};
export default useDebourceScreen;
