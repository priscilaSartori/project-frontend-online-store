import React from 'react';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { getCategories, getProductsFromCategoryAndQuery } from '../services/api';

class List extends React.Component {
  state = { categoria: [], produtos: [], nome: '' };

  componentDidMount() {
    this.listCategory();
  }

  listCategory = async () => {
    const categories = await getCategories();
    this.setState({ categoria: categories });
  };

  onInputChange = (event) => {
    const { value } = event.target;
    this.setState({ nome: value });
  };

  onInputbutton = async () => {
    const { nome } = this.state;
    const inputCategory = await getProductsFromCategoryAndQuery(null, nome);
    const resultado = inputCategory.results;
    this.setState({ produtos: resultado });
    console.log(resultado);
  };

  render() {
    const { categoria, produtos, nome } = this.state;
    return (
      <div>
        <Link data-testid="shopping-cart-button" to="/shoppingCart">
          <AiOutlineShoppingCart />
        </Link>
        <label htmlFor="query-input">
          <input
            data-testid="query-input"
            id="query-input"
            name="query-input"
            type="text"
            value={ nome }
            onChange={ this.onInputChange }
          />
          <button
            data-testid="query-button"
            type="button"
            onClick={ this.onInputbutton }
          >
            Enviar
          </button>
        </label>
        { categoria.length === 0 ? (
          <p data-testid="home-initial-message">
            Digite algum termo de pesquisa ou escolha uma
            categoria.
          </p>)
          : (categoria.map(({ id }) => (
            <div
              key={ id }
              data-testid="category"
            />
          )))}
        <section>
          {produtos.length === 0 ? <h2>Nenhum produto foi encontrado</h2>
            : (
              produtos.map((prod) => (
                <div
                  key={ prod.id }
                  data-testid="product"
                >
                  <h2>{prod.title}</h2>
                  <img src={ prod.thumbnail } alt="product" />
                  <h2>{`R$ ${prod.price}`}</h2>
                </div>
              )))}
        </section>
      </div>
    );
  }
}

export default List;
