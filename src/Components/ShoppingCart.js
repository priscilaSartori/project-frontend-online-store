import React from 'react';
import { Link } from 'react-router-dom';

class ShoppingCart extends React.Component {
  constructor() {
    super();
    this.state = {
      cartItems: [],
      products: [],
      cartAmount: 0,
      show: false,
    };
  }

  componentDidMount() {
    this.detailProduct();
    this.showInCart();
  }

  showInCart = () => {
    if (localStorage.getItem('product') !== null) {
      const cartProducts = JSON.parse(localStorage.getItem('product'));
      this.setState({ products: cartProducts });
    }
  };

  detailProduct = () => {
    if (JSON.parse(localStorage.getItem('cartItems')) !== null) {
      const list = JSON.parse(localStorage.getItem('cartItems'))[0];
      const amount = JSON.parse(localStorage.getItem('cartItems')).length;
      this.setState({ cartItems: list,
        cartAmount: amount }, () => this.compareProducts());
    }
  };

  compareAmount = () => {
    const { products, cartItems, cartAmount } = this.state;
    const sumAmount = products.find((product) => product.id === cartItems.id);
    sumAmount.amount += cartAmount;
    this.setState({ products, cartItems: [] });
    localStorage.removeItem('cartItems');
  };

  compareProducts = () => {
    const { cartItems, products } = this.state;
    if (products.some((product) => product.id === cartItems.id)) {
      this.setState({ show: false }, () => this.compareAmount());
    } else {
      this.setState({ show: true });
    }
  };

  decrement = ({ target }) => {
    if (target.id === 'product') {
      const { products } = this.state;
      const getAmount = products.find((product) => product.id === target.value);
      if (getAmount.amount > 1) {
        getAmount.amount -= 1;
        this.setState({ products });
      }
    }
    if (target.id === 'cart') {
      const { cartAmount } = this.state;
      const subtraction = cartAmount - 1;
      if (cartAmount > 1) {
        this.setState({ cartAmount: subtraction });
      }
    }
  };

  increment = ({ target }) => {
    if (target.id === 'product') {
      const { products } = this.state;
      const getAmount = products.find((product) => product.id === target.value);
      getAmount.amount += 1;
      this.setState({ products });
    }
    if (target.id === 'cart') {
      const { cartAmount } = this.state;
      const sum = cartAmount + 1;
      this.setState({ cartAmount: sum });
    }
  };

  deleteProduct = ({ target }) => {
    if (target.id === 'product') {
      const { products } = this.state;
      if (products.length > 1) {
        const deleteProduct = products
          .filter((product) => product.id !== target.value);
        localStorage.setItem('product', JSON.stringify(deleteProduct));
        this.showInCart();
      } else {
        localStorage.removeItem('product');
        this.setState({ products: [] });
      }
    } else {
      localStorage.removeItem('cartItems');
      this.setState({ show: false, cartItems: [] });
    }
  };

  render() {
    const { cartItems, products, cartAmount, show } = this.state;
    return (
      <div data-testid="shopping-cart-empty-message">
        { Object.keys(localStorage) !== 'cartItens'
          && Object.keys(localStorage) !== 'products'
          && (
            <h3>
              Seu carrinho está vazio
            </h3>
          )}
        {localStorage.getItem('product') !== null
          && (
            products.map((product, i) => (
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
                <button
                  data-testid="product-decrease-quantity"
                  id="product"
                  value={ product.id }
                  type="button"
                  onClick={ this.decrement }
                >
                  -
                </button>
                <p data-testid="shopping-cart-product-quantity">
                  { product.amount }
                </p>
                <button
                  data-testid="product-increase-quantity"
                  id="product"
                  value={ product.id }
                  type="button"
                  onClick={ this.increment }
                >
                  +
                </button>
                <button
                  data-testid="remove-product"
                  id="product"
                  value={ product.id }
                  type="button"
                  onClick={ this.deleteProduct }
                >
                  Remover Produto
                </button>
              </div>
            )))}
        { show && (
          <section>
            <div>
              <h3 data-testid="shopping-cart-product-name">{cartItems.title}</h3>
              <img src={ cartItems.img } alt={ cartItems.title } />
              <p>
                R$
                {cartItems.price}
              </p>
            </div>
            <button
              id="cart"
              name={ cartItems.title }
              type="button"
              onClick={ this.decrement }
            >
              -
            </button>
            <p data-testid="shopping-cart-product-quantity">
              { cartAmount }
            </p>
            <button
              id="cart"
              type="button"
              onClick={ this.increment }
            >
              +
            </button>
            <button
              id="cart"
              type="button"
              onClick={ this.deleteProduct }
            >
              Remover Produto
            </button>
          </section>
        )}
        <Link to="/Checkout">
          <button data-testid="checkout-products" type="button">Finalizar Compra</button>
        </Link>
      </div>
    );
  }
}

export default ShoppingCart;
