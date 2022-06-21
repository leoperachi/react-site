import React from 'react';
import './App.css';
import { AuthProvider } from './contexts/auth';
import { SocketProvider } from './contexts/socket'
import { BrowserRouter } from "react-router-dom";
import Routes from './routes';

function App() {
  
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <SocketProvider>
            <Routes/>
          </SocketProvider>
        </AuthProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
