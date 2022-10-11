import React from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { getCategories, getProductsFromCategoryAndQuery } from '../services/api';

class List extends React.Component {
  constructor() {
    super();
    this.state = {
      categories: [],
      produtos: [],
      nome: '',
    };
  }

  componentDidMount() {
    this.salvandoCategorias();
  }

  salvandoCategorias = async () => {
    const categorias = await getCategories();
    this.setState({
      categories: categorias,
    });
  };

  onInputChange = (event) => {
    const { value } = event.target;
    this.setState({ nome: value });
  };

  onInputbutton = async ({ target }) => {
    const { nome } = this.state;
    const inputCategory = await getProductsFromCategoryAndQuery(target.name, nome);
    const resultado = inputCategory.results;
    this.setState({ produtos: resultado });
  };

  render() {
    const { categories, nome, produtos } = this.state;
    return (
      <div>
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
        <Link data-testid="shopping-cart-button" to="/shoppingCart">
          <AiOutlineShoppingCart size={ 35 } color="rgb(0, 0, 0)" />
        </Link>
        {categories.length === 0 ? (
          <p data-testid="home-initial-message">
            Digite algum termo de pesquisa ou escolha uma
            categoria.
          </p>)
          : (categories.map((categoria) => (
            <div
              key={ categoria.id }
            >
              <div>
                <button
                  data-testid="category"
                  type="button"
                  name={ categoria.id }
                  onClick={ this.onInputbutton }
                >
                  {categoria.name}
                </button>
              </div>
            </div>
          )))}
        <section>
          {produtos.length === 0 ? <h2>Nenhum produto foi encontrado</h2>
            : (
              produtos.map((prod) => (
                <Link
                  to={ `/Card/${prod.id}` }
                  data-testid="product-detail-link"
                  key={ prod.id }
                >
                  <div
                    data-testid="product"
                  >
                    <h2>{prod.title}</h2>
                    <img src={ prod.thumbnail } alt="product" />
                    <h2>{`R$ ${prod.price}`}</h2>
                  </div>
                </Link>
              )))}
        </section>
      </div>
    );
  }
}
export default List;
