import React from 'react';
import { getCategories } from '../services/api';

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
