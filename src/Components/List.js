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
      // loading: true,
      cartProducts: [],
      sum: 0,
    };
  }

  async componentDidMount() {
    this.salvandoCategorias();
    const getProduct = await JSON.parse(localStorage.getItem('product')) || [];
    const getCart = await JSON.parse(localStorage.getItem('cart')) || [];
    this.setState({ cartProducts: getProduct, sum: getCart });
  }

  salvandoCategorias = async () => {
    const categorias = await getCategories();
    this.setState({
      categories: categorias,
      // loading: false,
    });
  };

  onInputChange = (event) => {
    const { value } = event.target;
    this.setState({ nome: value });
  };

  onInputbutton = async ({ target }) => {
    // this.setState({ loading: true });
    const { nome } = this.state;
    const inputCategory = await getProductsFromCategoryAndQuery(target.name, nome);
    const resultado = inputCategory.results;
    this.setState({ produtos: resultado, nome: '',
    // loading: false
    });
  };

  localStorageAndProdutSum = () => {
    const { cartProducts } = this.state;
    localStorage.setItem('product', JSON.stringify(cartProducts));
    this.setState({ sum: this.sum() });
  };

  addCart = ({ target: { id } }) => {
    const { produtos, cartProducts } = this.state;
    const product = produtos.find((produto) => produto.id.includes(id));
    if (cartProducts.find((cart) => cart.id === id)) {
      const count = cartProducts.find((prod) => prod.id === id);
      count.amount += 1;
      this.setState({ cartProducts }, () => this.localStorageAndProdutSum());
    } else {
      const add = {
        title: product.title,
        img: product.thumbnail,
        price: product.price,
        amount: 1,
        id,
        inventory: product.available_quantity,
      };
      this.setState((prevState) => ({
        cartProducts: [...prevState
          .cartProducts, add],
      }), () => this.localStorageAndProdutSum());
    }
  };

  sum = () => {
    const { cartProducts } = this.state;
    const newArray = cartProducts.map((element) => element.amount);
    const amountCart = newArray.reduce((acc, curr) => acc + curr, 0);
    this.setState({ sum: amountCart });
    localStorage.setItem('cart', amountCart);
    return amountCart;
  };

  render() {
    const { categories, nome, produtos, sum } = this.state;
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
          <span data-testid="shopping-cart-size">
            {sum}
          </span>
          <AiOutlineShoppingCart size={ 35 } color="rgb(0, 0, 0)" />
        </Link>
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
          {/* {loading && <h3>Carregando...</h3>} */}
          {produtos.length === 0 ? <h2>Nenhum produto foi encontrado</h2>
            : (
              produtos.map((prod) => (
                <div
                  data-testid="product"
                  key={ prod.id }
                >
                  <Link
                    to={ `/Card/${prod.id}` }
                    data-testid="product-detail-link"
                  >
                    <h2>{prod.title}</h2>
                    <img src={ prod.thumbnail } alt="product" />
                    <h2>{`R$ ${prod.price}`}</h2>
                    {prod.shipping.free_shipping === true
                        && <h2 data-testid="free-shipping">Frete Grátis</h2>}
                  </Link>
                  <button
                    data-testid="product-add-to-cart"
                    type="button"
                    name={ prod.title }
                    id={ prod.id }
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
