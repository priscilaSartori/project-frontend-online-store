import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getProductById } from '../services/api';

class Card extends React.Component {
  state = {
    detalhes: {},
    email: '',
    comentario: '',
    rating: '',
    isValid: true,
    saveLocal: [],
    idSaveLocal: [],
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

  onInputChange = ({ target }) => {
    const { name } = target;
    const value = (target.type === 'radio') ? target.id : target.value;
    this.setState({ [name]: value }, () => this.evaluation());
  };

  saveLocalstorage = () => {
    this.setState({ email: '', comentario: '', rating: '' });
    const { saveLocal, detalhes: { id } } = this.state;
    const stringSaveLocal = JSON.stringify(saveLocal);
    localStorage.setItem(id, stringSaveLocal);
  };

  salveEvaluation = (event) => {
    event.preventDefault();
    const { isValid, email, comentario, rating, saveLocal, idSaveLocal } = this.state;
    const { match: { params: { id } } } = this.props;
    if (isValid === true) {
      const info = { email, comentario, rating };
      this.setState(() => ({
        saveLocal: [...saveLocal, info],
        idSaveLocal: [...idSaveLocal, id],
        email: '',
        comentario: '',
      }), () => this.saveLocalstorage());
    }
  };

  evaluation = () => {
    const { email, rating } = this.state;
    const regex = /^([a-z0-9_\-.]+)@([a-z0-9_\-.]+)\.([a-z]{2,5})$/;
    const emailValido = regex.test(email);
    if (emailValido && rating !== '') {
      this.setState(
        { isValid: true },
      );
    } else {
      this.setState({ isValid: false });
    }
  };

  getEvaluation = () => {
    const { match: { params: { id } } } = this.props;
    if (JSON.parse(localStorage.getItem(id)) !== null) {
      return JSON.parse(localStorage.getItem(id));
    }
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
    const {
      detalhes: { title, price, thumbnail },
      email,
      comentario,
      isValid,
    } = this.state;
    const getIdSaveLocal = this.getEvaluation();
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
        <form
          onSubmit={ this.salveEvaluation }
        >
          <input
            type="email"
            name="email"
            id="email"
            data-testid="product-detail-email"
            placeholder="email"
            value={ email }
            onChange={ this.onInputChange }
          />
          <div id="nota">
            <p htmlFor="" id="label-nota">Qual sua nota?</p>
            <label htmlFor="1">
              1
              <input
                data-testid="1-rating"
                type="radio"
                name="rating"
                value="1"
                id="1"
                onChange={ this.onInputChange }
              />
            </label>
            <label htmlFor="2">
              2
              <input
                data-testid="2-rating"
                type="radio"
                name="rating"
                value="2"
                id="2"
                onChange={ this.onInputChange }
              />
            </label>
            <label htmlFor="3">
              3
              <input
                data-testid="3-rating"
                type="radio"
                name="rating"
                value="3"
                id="3"
                onChange={ this.onInputChange }
              />
            </label>
            <label htmlFor="4">
              4
              <input
                data-testid="4-rating"
                type="radio"
                name="rating"
                value="4"
                id="4"
                onChange={ this.onInputChange }
              />
            </label>
            <label htmlFor="5">
              5
              <input
                data-testid="5-rating"
                type="radio"
                name="rating"
                value="5"
                id="5"
                onChange={ this.onInputChange }
              />
            </label>
          </div>
          <textarea
            name="comentario"
            id="comentario"
            cols="30"
            rows="10"
            value={ comentario }
            data-testid="product-detail-evaluation"
            onChange={ this.onInputChange }
          />
          <button
            data-testid="submit-review-btn"
            type="submit"
          >
            Avaliar
          </button>
        </form>
        <section>
          { isValid === false && <h2 data-testid="error-msg">Campos inválidos</h2>}
          { getIdSaveLocal !== undefined
          && (
            getIdSaveLocal.map((aval, index) => (
              <div key={ index }>
                <p data-testid="review-card-email">{aval.email}</p>
                <p data-testid="review-card-rating">{aval.rating}</p>
                <p data-testid="review-card-evaluation">{aval.comentario}</p>
              </div>
            )))}
        </section>
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
