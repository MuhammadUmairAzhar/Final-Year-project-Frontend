import React from 'react';
import './App.css';
import { AuthContextProvider } from './context/Authentication';
import Main from './routes/main';


const App = () => {
  return (
    <AuthContextProvider>
      <Main />
    </AuthContextProvider>
  );
}

export default App;
