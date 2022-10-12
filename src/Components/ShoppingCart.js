import React from 'react';

class ShoppingCart extends React.Component {
  showInCart = () => {
    if (localStorage.getItem('product') !== null) {
      const cartProducts = JSON.parse(localStorage.getItem('product'));
      const newCartProducts = new Map();
      cartProducts.forEach((product) => {
        if (!newCartProducts.has(product.title)) {
          newCartProducts.set(product.title, product);
        }
      });
      return [...newCartProducts.values()];
    }
  }; // função desenvolvida com a ajuda do vídeo: https://www.youtube.com/watch?v=AiTyr_n5pws

  amountProducts = (title) => {
    const cartProducts = JSON.parse(localStorage.getItem('product'));
    const amount = cartProducts.filter((product) => product.title === title);
    return amount.length;
  };

  render() {
    const showProduct = this.showInCart();
    return (
      localStorage.getItem('product') === null
        ? (
          <h3 data-testid="shopping-cart-empty-message">
            Seu carrinho está vazio
          </h3>)
        : (
          showProduct.map((product, i) => (
            <div
              key={ i }
            >
              <h4 data-testid="shopping-cart-product-name">
                { product.title }
              </h4>
              <img src={ product.img } alt={ product.title } />
              <p>
                R$
                { product.price }
              </p>
              <p data-testid="shopping-cart-product-quantity">
                Quantidade:
                {' '}
                { this.amountProducts(product.title) }
              </p>
            </div>
          ))
        )
    );
  }
}

export default ShoppingCart;
