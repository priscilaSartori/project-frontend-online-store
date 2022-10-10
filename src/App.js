import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import List from './Components/List';
import './App.css';
import ShoppingCart from './Components/ShoppingCart';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={ List } />
        <Route path="/shoppingCart" component={ ShoppingCart } />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
