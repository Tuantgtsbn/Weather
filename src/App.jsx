// import CountDownTimer from './components/CountDown/CountDownTimer';
// import ChoicesCountDown from './components/CountDown/ChoicesCountDown';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css';
import { publicRoutes } from './routes/routes';

function App() {
  return (
    <Router>
      <Routes>
        {
          publicRoutes.map((route, index) => {
            const { layout: Layout, component: Component, path, title } = route;
            return (
              <Route key={index} path={path} element={<Layout title={title}><Component /></Layout>} />
            )
          })
        }
      </Routes>

    </Router>
  )
}

export default App;