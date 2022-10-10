import React from 'react';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { Link } from 'react-router-dom';

class List extends React.Component {
  render() {
    return (
      <div>
        <p data-testid="home-initial-message">
          Digite algum termo de pesquisa ou escolha uma
          categoria.
        </p>
        <Link data-testid="shopping-cart-button" to="/shoppingCart">
          <AiOutlineShoppingCart size={ 35 } color="rgb(0, 0, 0)" />
        </Link>
      </div>
    );
  }
}

export default List;
