import React from 'react';
import './App.css';
import Login from './components/login/Auth'

function App() {
  return (
    <div className="App-div">
      <div>
        <a href="https://www.queroquero.com.br" target="_blank" rel="noopener noreferrer"><img src={require('./components/feed/Quero-Quero.png')} alt="Logo" className="logo" /></a>

        <Login></Login>
        <a href="https://www.queroquero.com.br" target="_blank" rel="noopener noreferrer"><img src={require('./components/feed/Verde-Card.png')} alt="Logo" className="logo1" /></a>
      </div>
    </div>
  );
}

export default App;
