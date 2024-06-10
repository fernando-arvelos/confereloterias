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
        resultDezenas: result.listaDezenas,
        loading: false,
        result,
        awardedCities: result.listaMunicipioUFGanhadores,
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
    const { resultDezenas, nameGame, loading, awardedCities,
      numbersPlayed, correctNumbers, digitsArray, result } = this.state;

    console.log(result);
    console.log(resultDezenas);
    console.log(awardedCities);

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
            <option value="megasena">Mega Sena</option>
            <option value="lotofacil">Lotofácil</option>
            <option value="quina">Quina</option>
            <option value="lotomania">Lotomania</option>
            <option value="timemania">Timemania</option>
            <option value="diadesorte">Dia de Sorte</option>
            <option value="supersete">Super Sete</option>
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

        {'message' in result
          ? <p>Número do concurso não existe</p>
          : Object.keys(result).length > 0
          && (
            <div>
              {loading
                ? (
                  <p>
                    Carregando...
                  </p>)
                : (
                  <>
                    <h4>
                      {`Resultado do concurso 
                        ${result.numero} (${result.dataApuracao})`}
                    </h4>
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
                            .join(', ')}, em um total de 
                            ${correctNumbers.length} números.`}
                        </p>)}

                    {result.nomeTimeCoracaoMesSorte
                      .split('').every((char) => char !== '\u0000')
                      && (
                        <>
                          {nameGame === 'timemania'
                            && (
                              <h4>Time do Coração</h4>)}
                          {nameGame === 'diadesorte'
                            && (
                              <h4>Mês da Sorte</h4>)}
                          <p>
                            {result.nomeTimeCoracaoMesSorte}
                          </p>
                        </>)}

                    <h4>
                      {`Estimativa de prêmio do próximo concurso 
                      ${result.numeroConcursoProximo} (${result.dataProximoConcurso})`}
                    </h4>
                    <p>
                      {result.valorEstimadoProximoConcurso.toLocaleString(
                        'pt-BR',
                        { style: 'currency', currency: 'BRL' },
                      )}
                    </p>

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
                  {result.listaRateioPremio.map((premiacao, index) => (
                    <div key={ index }>
                      <p>{premiacao.descricaoFaixa}</p>
                      {premiacao.numeroDeGanhadores === 0
                        && 'Não houve ganhadores'}
                      {premiacao.numeroDeGanhadores === 1
                        && `${premiacao.numeroDeGanhadores} aposta ganhadora, `}
                      {premiacao.numeroDeGanhadores > 1
                        && `${premiacao.numeroDeGanhadores} apostas ganhadoras, `}
                      {`${premiacao.numeroDeGanhadores > 0
                        ? `${premiacao.valorPremio.toLocaleString(
                          'pt-BR',
                          { style: 'currency', currency: 'BRL' },
                        )}`
                        : ('')}`}
                    </div>
                  ))}
                </>)}

              {awardedCities.length > 0
                && (
                  <>
                    <h4>Detalhamento</h4>
                    {awardedCities.map((estado, index) => (
                      <div key={ index }>
                        {estado.municipio === 'CANAL ELETRONICO'
                          ? <p>{`${estado.municipio}`}</p>
                          : <p>{`${estado.municipio} - ${estado.uf}`}</p>}

                        {estado.ganhadores === 1
                          && `1 aposta ganhou o prêmio para 
                          ${result.listaDezenas.length} acertos`}

                        {estado.ganhadores > 1
                          && `${estado.ganhadores} apostas
                          ganharam o prêmio para ${result.listaDezenas.length} acertos`}

                      </div>
                    ))}
                  </>
                )}
            </div>)}

      </div>
    );
  }
}

export default Home;
