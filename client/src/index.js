import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
// import { BrowserRouter } from 'react-router-dom';
import { UserProvider } from './UserContext';
import { AuthProvider } from './AuthContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import "leaflet/dist/leaflet.css";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    
      <AuthProvider>
        <UserProvider>
          <App />
        </UserProvider>
      </AuthProvider>

  </React.StrictMode>
);
