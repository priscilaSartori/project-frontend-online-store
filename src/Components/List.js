import React from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { BsSearch } from 'react-icons/bs';
import { getCategories, getProductsFromCategoryAndQuery } from '../services/api';

class List extends React.Component {
  constructor() {
    super();
    this.state = {
      categories: [],
      produtos: [],
      nome: '',
      loading: true,
      cartProducts: [],
    };
  }

  componentDidMount() {
    this.salvandoCategorias();
  }

  salvandoCategorias = async () => {
    const categorias = await getCategories();
    this.setState({
      categories: categorias,
      loading: false,
    });
  };

  onInputChange = (event) => {
    const { value } = event.target;
    this.setState({ nome: value });
  };

  onInputbutton = async ({ target }) => {
    this.setState({ loading: true });
    const { nome } = this.state;
    const inputCategory = await getProductsFromCategoryAndQuery(target.name, nome);
    const resultado = inputCategory.results;
    this.setState({ produtos: resultado, nome: '', loading: false });
  };

  localStorage = () => {
    const { cartProducts } = this.state;
    localStorage.setItem('product', JSON.stringify(cartProducts));
  };

  addCart = ({ target: { name } }) => {
    const { produtos } = this.state;
    const product = produtos.find((produto) => produto.id.includes(name));
    const add = { title: `${product.title}`,
      img: `${product.thumbnail}`,
      price: `${product.price}` };
    this.setState((prevState) => ({ cartProducts: [...prevState
      .cartProducts, add] }), () => this.localStorage());
  };

  render() {
    const { categories, nome, produtos, loading } = this.state;
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
            <BsSearch />
          </button>
        </label>
        <Link data-testid="shopping-cart-button" to="/shoppingCart">
          <AiOutlineShoppingCart size={ 35 } color="rgb(0, 0, 0)" />
        </Link>
        { loading && <h3>Carregando...</h3> }
        {categories.length === 0 ? (
          <h2 data-testid="home-initial-message">
            Digite algum termo de pesquisa ou escolha uma
            categoria.
          </h2>)
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
                <div key={ prod.id }>
                  <Link
                    to={ `/Card/${prod.id}` }
                    data-testid="product-detail-link"
                  >
                    <div
                      data-testid="product"
                    >
                      <h2>{prod.title}</h2>
                      <img src={ prod.thumbnail } alt="product" />
                      <h2>{`R$ ${prod.price}`}</h2>
                    </div>
                  </Link>
                  <button
                    data-testid="product-add-to-cart"
                    type="button"
                    name={ prod.id }
                    onClick={ this.addCart }
                  >
                    Adicione ao Carrinho
                  </button>
                </div>
              )))}
        </section>
      </div>
    );
  }
}

export default List;
