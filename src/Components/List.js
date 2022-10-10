import React from 'react';
import { getCategories } from '../services/api';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { Link } from 'react-router-dom';

class List extends React.Component {
  constructor() {
    super();
    this.state = {
      categories: [],
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

  render() {
    const { categories } = this.state;
    console.log(categories);
    return (
      <div>
        <p data-testid="home-initial-message">
          Digite algum termo de pesquisa ou escolha uma
          categoria.
        </p>
        <Link data-testid="shopping-cart-button" to="/shoppingCart">
          <AiOutlineShoppingCart size={ 35 } color="rgb(0, 0, 0)" />
        </Link>
        {categories.map((categoria) => (
          <button
            type="button"
            key={ categoria.id }
            data-testid="category"
          >
            {categoria.name}
          </button>
        ))}
      </div>
    );
  }
}

export default List;
