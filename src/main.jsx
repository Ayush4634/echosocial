import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

// Redirect to home if not at root
if (window.location.pathname !== '/') {
    window.history.replaceState(null, '', '/');
}

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
)
