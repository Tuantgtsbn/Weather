import { useState, useEffect } from 'react';

const useDeviceDetection = () => {
    const [deviceInfo, setDeviceInfo] = useState({
        isMobile: false,
        isTablet: false,
        isDesktop: false,
        userAgent: '',
        screenWidth: 0,
        screenHeight: 0
    });

    useEffect(() => {
        const detectDevice = () => {
            const userAgent = navigator.userAgent.toLowerCase();
            const screenWidth = window.screen.width;
            const screenHeight = window.screen.height;

            // Kiểm tra mobile devices
            const mobileRegex = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i;
            const isMobileUA = mobileRegex.test(userAgent);

            // Kiểm tra tablet
            const tabletRegex = /ipad|android(?!.*mobile)|tablet/i;
            const isTabletUA = tabletRegex.test(userAgent);

            // Kiểm tra dựa trên kích thước màn hình
            const isMobileScreen = screenWidth <= 768;
            const isTabletScreen = screenWidth > 768 && screenWidth <= 1024;
            const isDesktopScreen = screenWidth > 1024;

            // Kiểm tra touch device
            const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

            // Logic kết hợp để xác định thiết bị
            const isMobile = isMobileUA || (isMobileScreen && isTouchDevice);
            const isTablet = isTabletUA || (isTabletScreen && isTouchDevice && !isMobileUA);
            const isDesktop = !isMobile && !isTablet && isDesktopScreen;

            setDeviceInfo({
                isMobile,
                isTablet,
                isDesktop,
                userAgent,
                screenWidth,
                screenHeight
            });
        };

        // Detect device on mount
        detectDevice();

        // Listen for resize events to re-detect
        const handleResize = () => {
            detectDevice();
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return deviceInfo;
};

export default useDeviceDetection;
