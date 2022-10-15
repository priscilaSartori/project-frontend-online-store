import './App.css';
import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import List from './Components/List';
import ShoppingCart from './Components/ShoppingCart';
import Card from './Components/Card';
import Checkout from './Components/Checkout';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={ List } />
        <Route path="/shoppingCart" component={ ShoppingCart } />
        <Route path="/Card/:id" component={ Card } />
        <Route path="/Checkout" component={ Checkout } />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
