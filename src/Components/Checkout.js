import React from 'react';
import PropTypes from 'prop-types';

class Checkout extends React.Component {
  state = {
    nome: '',
    CPF: '',
    email: '',
    tel: '',
    CEP: '',
    endereco: '',
    pagamento: '',
    isValid: false,
  };

  onInputChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  showInCart = () => {
    const getItem = JSON.parse(localStorage.getItem('product'));
    if (getItem !== null) {
      return getItem;
    }
  };

  submitForm = () => {
    const { nome, CPF, email, tel, CEP, endereco, pagamento } = this.state;
    const { history: { push } } = this.props;
    const infosPessoais = nome !== '' && CPF !== '' && email !== '';
    const infosContato = tel !== '' && CEP !== '' && endereco !== '' && pagamento !== '';
    if (infosPessoais && infosContato) {
      this.setState({ isValid: true });
      push('/');
    } else {
      this.setState({ isValid: false });
    }
  };

  render() {
    const { nome, CPF, email, tel, CEP, endereco, isValid } = this.state;
    const showProduct = this.showInCart();
    return (
      <div>
        <section>
          <h2>Revise seus Produtos:</h2>
          <div>
            {showProduct !== undefined
              && (showProduct.map((prod) => (
                <div key={ prod.title }>
                  <h3>{prod.title}</h3>
                  <img src={ prod.img } alt={ prod.title } />
                  <p>
                    R$
                    {' '}
                    {prod.price}
                  </p>
                </div>
              )))}
          </div>
        </section>
        <section>
          <form
            onSubmit={ this.submitForm }
          >
            <div>
              Informações do Comprador:
              <input
                type="text"
                name="nome"
                id="nome"
                placeholder="Nome completo"
                data-testid="checkout-fullname"
                value={ nome }
                onChange={ this.onInputChange }
              />
              <input
                type="text"
                name="CPF"
                id="CPF"
                placeholder="CPF"
                data-testid="checkout-email"
                value={ CPF }
                onChange={ this.onInputChange }
              />
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Email"
                data-testid="checkout-cpf"
                value={ email }
                onChange={ this.onInputChange }
              />
              <input
                type="tel"
                name="tel"
                id="tel"
                placeholder="Telefone"
                data-testid="checkout-phone"
                value={ tel }
                onChange={ this.onInputChange }
              />
              <input
                type="text"
                name="CEP"
                id="CEP"
                placeholder="CEP"
                data-testid="checkout-cep"
                value={ CEP }
                onChange={ this.onInputChange }
              />
              <input
                type="text"
                name="endereco"
                id="endereco"
                placeholder="Endereco"
                data-testid="checkout-address"
                value={ endereco }
                onChange={ this.onInputChange }
              />
            </div>
            <div>
              <h2>Método de Pagamento:</h2>
              Boleto
              <input
                data-testid="ticket-payment"
                type="radio"
                name="pagamento"
                value="boleto"
                onChange={ this.onInputChange }
              />
              Visa
              <input
                data-testid="visa-payment"
                type="radio"
                name="pagamento"
                value="visa"
                onChange={ this.onInputChange }
              />
              MasterCard
              <input
                data-testid="master-payment"
                type="radio"
                name="pagamento"
                value="masterCard"
                onChange={ this.onInputChange }
              />
              Elo
              <input
                data-testid="elo-payment"
                type="radio"
                name="pagamento"
                value="elo"
                onChange={ this.onInputChange }
              />
            </div>
            <button
              type="submit"
              data-testid="checkout-btn"
            >
              Comprar
            </button>
          </form>
        </section>
        {isValid === false && <h2 data-testid="error-msg">Campos inválidos</h2> }
      </div>
    );
  }
}

Checkout.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Checkout;
