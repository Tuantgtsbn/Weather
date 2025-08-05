import { lazy } from 'react';
const DefaultLayout = lazy(() => import('../layouts/DefaultLayout'));
const CountUpTimer = lazy(() => import('../pages/CoutUpTimer'));
const CountDown = lazy(() => import('../pages/CoutDownTimer'));
const Clock = lazy(() => import('../pages/Clock'));
const Weather = lazy(() => import('../pages/Weather'));
const Calculator = lazy(() => import('../pages/Calculator'));
const Currency = lazy(() => import('../pages/Currency'));
const Caro = lazy(() => import('../pages/Caro'));
const WheelRandomPage = lazy(() => import('../pages/WheelRandom'));
const TypeWord = lazy(() => import('../pages/TypeWord'));

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
    },
    {
        path: '/wheel-random',
        component: WheelRandomPage,
        layout: DefaultLayout,
        title: 'Xoay ngẫu nhiên'
    },
    {
        path: '/type-word',
        component: TypeWord,
        layout: DefaultLayout,
        title: 'Luyện gõ 10 ngón'
    }
];

const privateRoutes = [];
export { publicRoutes, privateRoutes };
