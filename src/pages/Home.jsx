import React, { Component } from 'react';
import resultGames from '../services/result';
import InputSpaces from '../components/InputSpaces';

class Home extends Component {
  state = {
    nameGame: '',
    numberGame: '',
    // result: {},
    resultDezenas: [],
    loading: false,
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  resultGamesFinal = async () => {
    const { nameGame, numberGame } = this.state;
    this.setState({ loading: true });

    const result = await resultGames(nameGame, numberGame);
    this.setState({
      // result,
      resultDezenas: result.dezenas,
      loading: false,
    });
  };

  render() {
    const { resultDezenas, numberGame, loading } = this.state;
    // console.log(resultDezenas);
    return (
      <div>
        <form>
          <label htmlFor="games">Escolha o jogo</label>
          <select
            id="games"
            name="nameGame"
            defaultValue=""
            onChange={ this.handleChange }
          >
            <option value="" disabled hidden>Escolha um jogo</option>
            <option value="mega-sena">Mega Sena</option>
            <option value="lotofacil">Lotofácil</option>
            <option value="quina">Quina</option>
            <option value="lotomania">Lotomania</option>
            <option value="timemania">Timemania</option>
            <option value="dupla-sena">Dupla Sena</option>
            <option value="loteria-federal">Loteria Federal</option>
            <option value="dia-de-sorte">Dia de Sorte</option>
            <option value="super-sete">Super Sete</option>
          </select>

          <label htmlFor="contestNumber">Digite o número do Concurso</label>
          <input
            type="text"
            name="numberGame"
            id="contestNumber"
            onChange={ this.handleChange }
          />

          <button
            type="button"
            onClick={ this.resultGamesFinal }
          >
            clique aqui
          </button>
        </form>

        <div>
          <h4>{`Resultado do concurso ${numberGame}`}</h4>
          {loading
            ? (
              <p>
                Carregando...
              </p>)
            : (
              <p>
                {
                  resultDezenas.join(' ')
                }
              </p>)}
        </div>

        <div>
          <InputSpaces />
        </div>
      </div>
    );
  }
}

export default Home;
