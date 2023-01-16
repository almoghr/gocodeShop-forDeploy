import './App.css';
import SearchField from './components/SearchField'
import ProductsWindow from './components/ProductsWindow'
import React from 'react'
import CountDown from './components/CountDown';

function App({AddProductToCart}) {

const DEFAULT_TIME_COMPENSATOR_IN_MS = 2000

  return (
      <div className="flexColumn">
        <div style={{margin:'100px'}}><CountDown timestamp={(Date.now() + 3 * 1000) + DEFAULT_TIME_COMPENSATOR_IN_MS}/></div>
        <SearchField />
        <ProductsWindow AddProductToCart={AddProductToCart}/>
      </div>
  );
}

export default App;
