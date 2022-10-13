import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getProductById } from '../services/api';

class Card extends React.Component {
  state = {
    detalhes: [],
    cartItems: [],
  };

  componentDidMount() {
    this.productDetails();
  }

  productDetails = async () => {
    const { match: { params: { id } } } = this.props;
    const productsInfo = await getProductById(id);
    this.setState({
      detalhes: productsInfo,
    });
  };

  localStorage = () => {
    const { cartItems } = this.state;
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  };

  salvarProdutoLS = () => {
    const { detalhes: { title, price, thumbnail } } = this.state;
    const itemSalvo = { title: `${title}`,
      price: `${price}`,
      img: `${thumbnail}` };
    this.setState((prevState) => ({
      cartItems: [...prevState.cartItems, itemSalvo] }), () => this.localStorage());
  };

  render() {
    const { detalhes: { title, price, thumbnail } } = this.state;
    return (
      <div>
        <h2 data-testid="product-detail-name">{title}</h2>
        <img src={ thumbnail } alt="detail-product" data-testid="product-detail-image" />
        <h2 data-testid="product-detail-price">{`R$ ${price}`}</h2>
        <button
          data-testid="product-detail-add-to-cart"
          type="button"
          onClick={ this.salvarProdutoLS }
        >
          Adicionar ao Carrinho
        </button>
        <Link
          to="/shoppingCart"
        >
          <button
            data-testid="shopping-cart-button"
            type="button"
            onClick={ this.salvarProdutoLS }
          >
            Comprar
          </button>
        </Link>
      </div>
    );
  }
}

Card.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default Card;
