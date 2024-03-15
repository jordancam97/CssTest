import React from 'react';
import './App.css';
import Header from './components/Header/Header.tsx';
import ProductPage from './components/Home/ProductPage.tsx';

function App() {
  return (
    <div className="App">
      <Header/>
      <ProductPage/>
    </div>
  );
}

export default App;
