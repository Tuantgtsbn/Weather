// import React from 'react'
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { ThemeProvider } from './context/ThemeContext.jsx';
import { ToastContainer } from 'react-toastify';
ReactDOM.createRoot(document.getElementById('root')).render(
    <ThemeProvider>
        <App />
        <ToastContainer />
    </ThemeProvider>
);
