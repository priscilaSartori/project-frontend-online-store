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

  detailProduct = () => {
    if (JSON.parse(localStorage.getItem('cartItems')) !== null) {
      return JSON.parse(localStorage.getItem('cartItems'))[0];
    }
  };

  render() {
    const showProduct = this.showInCart();
    const produtoSalvo = this.detailProduct();
    return (
      <div>
        {Object.keys(localStorage).length === 0 && (
          <h3 data-testid="shopping-cart-empty-message">
            Seu carrinho está vazio
          </h3>
        )}
        {localStorage.getItem('product') !== null
          && (
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
            )))}
        { localStorage.getItem('cartItems') !== null
            && (
              <section>
                <div>
                  <h3 data-testid="shopping-cart-product-name">{produtoSalvo.title}</h3>
                  <img src={ produtoSalvo.img } alt={ produtoSalvo.title } />
                  <p>
                    R$
                    {produtoSalvo.price}
                  </p>
                </div>
                <p data-testid="shopping-cart-product-quantity">
                  Quantidade:
                  {' '}
                  {JSON.parse(localStorage.getItem('cartItems')).length}
                </p>
              </section>
            )}
      </div>
    );
  }
}

export default ShoppingCart;
