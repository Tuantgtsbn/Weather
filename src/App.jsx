// import CountDownTimer from './components/CountDown/CountDownTimer';
// import ChoicesCountDown from './components/CountDown/ChoicesCountDown';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { publicRoutes } from './routes/routes';
import { Navigate } from 'react-router-dom';
import { Suspense } from 'react';
import Loading from './components/Loading/Loading';
function App() {
    return (
        <Router>
            <Suspense fallback={<Loading />}>
                <Routes>
                    <Route path='/' element={<Navigate to='/timer' replace />} />
                    {publicRoutes.map((route, index) => {
                        const { layout: Layout, component: Component, path, title } = route;
                        return (
                            <Route
                                key={index}
                                path={path}
                                element={
                                    <Layout title={title}>
                                        <Component />
                                    </Layout>
                                }
                            />
                        );
                    })}
                </Routes>
            </Suspense>
        </Router>
    );
}

export default App;
