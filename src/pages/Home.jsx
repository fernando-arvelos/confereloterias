import React, { Component } from 'react';
import resultGames from '../services/Result';

class Home extends Component {
  state = {
    nameGame: '',
    numberGame: '',
    resultDezenas: [],
    loading: false,
    numbersPlayed: '',
    correctNumbers: [],
    digitsArray: [],
    result: {},
    awardedCities: [],
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
    this.setState(
      {
        resultDezenas: result.dezenas,
        loading: false,
        result,
        awardedCities: result.estadosPremiados,
      },
      () => {
        this.checkNumbers();
      },
    );
  };

  checkNumbers = () => {
    const { numbersPlayed, resultDezenas } = this.state;
    const digitsArray = numbersPlayed.replace(/\s/g, '').match(/.{1,2}/g) || [];
    const correctNumbers = digitsArray.filter((numero) => resultDezenas.includes(numero));
    this.setState({
      digitsArray,
      correctNumbers,
    });
  };

  handleInputChange = ({ target }) => {
    const inputValue = target.value;
    const formattedValue = inputValue.replace(/\s/g, '').match(/.{1,2}/g)?.join(' ');

    this.setState({
      numbersPlayed: formattedValue || inputValue,
    });
  };

  render() {
    const { resultDezenas, numberGame, loading, awardedCities,
      numbersPlayed, correctNumbers, digitsArray, result } = this.state;

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

          <div>
            <label htmlFor="userGame">Digite aqui sua aposta</label>
            <input
              type="text"
              id="userGame"
              value={ numbersPlayed }
              onChange={ this.handleInputChange }
            />
          </div>

          <button
            type="button"
            onClick={ this.resultGamesFinal }
          >
            Confira seu resultado
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
              <>
                <h4>Números sorteados</h4>
                <p>
                  {
                    resultDezenas.join(' ')
                  }
                </p>
                <h4>Números Jogados</h4>
                <p>
                  {
                    digitsArray.join(' ')
                  }
                </p>

                {correctNumbers.length > 0
                  && (
                    <p>
                      {`Você acertou os números ${correctNumbers
                        .join(', ')}, em um total de ${correctNumbers.length} números.`}
                    </p>)}

                {(correctNumbers.length === 0 && resultDezenas.length > 0)
                && (
                  <p>
                    Você não acertou nenhum número.
                  </p>)}
              </>)}

          {resultDezenas.length > 0
              && (
                <>
                  <h4>Premiação</h4>
                  {result.premiacoes.map((premiacao, index) => (
                    <div key={ index }>
                      <p>{premiacao.acertos}</p>
                      {premiacao.vencedores === 0
                        && 'Não houve ganhadores'}
                      {premiacao.vencedores === 1
                        && `${premiacao.vencedores} aposta ganhadora, `}
                      {premiacao.vencedores > 1
                        && `${premiacao.vencedores} apostas ganhadoras, `}
                      {`${premiacao.vencedores > 0 ? `R$ ${premiacao.premio}` : ('')}`}
                    </div>
                  ))}
                </>)}

          {awardedCities.length > 0
                && (
                  <>
                    <h4>Detalhamento</h4>
                    {result.estadosPremiados.map((estado, index) => (
                      <div key={ index }>
                        {estado.cidades.map((cidade, indexCidade) => (
                          <div key={ indexCidade }>
                            {`${cidade.cidade} - ${estado.uf}`}
                          </div>
                        ))}
                        {estado.vencedores === '1' && `${estado.vencedores} 
                          aposta ganhou o prêmio para ${result.dezenas.length} acertos`}
                        {estado.vencedores > '1' && `${estado.vencedores} apostas 
                          ganharam o prêmio para ${result.dezenas.length} acertos`}
                      </div>
                    ))}
                  </>
                )}
        </div>

      </div>
    );
  }
}

export default Home;
