import { lazy } from 'react';
const DefaultLayout = lazy(() => import('../layouts/DefaultLayout'));
const CountUpTimer = lazy(() => import('../components/CountUp/CountUpTimer'));
const CountDown = lazy(() => import('../components/CountDown/CountDown'));
const Clock = lazy(() => import('../components/Clock/Clock'));
const Weather = lazy(() => import('../components/Weather'));
const Calculator = lazy(() => import('../pages/calculator'));
const Currency = lazy(() => import('../pages/currency'));
const Caro = lazy(() => import('../pages/Caro'));
const publicRoutes = [
    {
        path: '/timer',
        component: CountDown,
        layout: DefaultLayout,
        title: 'Đồng hồ đếm ngược'
    },
    {
        path: '/stopwatch',
        component: CountUpTimer,
        layout: DefaultLayout,
        title: 'Đồng hồ đếm giờ'
    },
    {
        path: '/clock',
        component: Clock,
        layout: DefaultLayout,
        title: 'Đồng hồ hiện tại'
    },
    {
        path: '/weather',
        component: Weather,
        layout: DefaultLayout,
        title: 'Thời tiết hiện tại'
    },
    {
        path: '/calculator',
        component: Calculator,
        layout: DefaultLayout,
        title: 'Máy tính'
    },
    {
        path: '/currency',
        component: Currency,
        layout: DefaultLayout,
        title: 'Tỷ giá tiền tệ'
    },
    {
        path: '/caro',
        component: Caro,
        layout: DefaultLayout,
        title: 'Trò chơi caro'
    }
];
const privateRoutes = [];
export { publicRoutes, privateRoutes };
