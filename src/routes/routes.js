
import DefaultLayout from "../layouts/DefaultLayout";
import CountUpTimer from '../components/CountUp/CountUpTimer';
import CoutnDown from '../components/CountDown/CountDown';
import Clock from '../components/Clock/Clock';
import Weather from '../components/Weather';
const publicRoutes = [
    { path: '/timer', component: CoutnDown, layout: DefaultLayout, title: 'Đồng hồ đếm ngược' },
    { path: '/stopwatch', component: CountUpTimer, layout: DefaultLayout, title: 'Đồng hồ đếm giờ' },
    { path: '/clock', component: Clock, layout: DefaultLayout, title: 'Đồng hồ hiện tại' },
    { path: '/weather', component: Weather, layout: DefaultLayout, title: 'Thời tiết hiện tại' },
    { path: '/', component: CoutnDown, layout: DefaultLayout, title: 'Đồng hồ đếm ngược' }
];
const privateRoutes = [];
export { publicRoutes, privateRoutes };