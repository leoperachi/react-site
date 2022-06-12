import React from 'react';
import './App.css';
import { AuthProvider } from './contexts/auth';
import { BrowserRouter } from "react-router-dom";
import Routes from './routes';

function App() {
  
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <Routes/>
        </AuthProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
