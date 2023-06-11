const resultGames = async (loteria, concurso) => {
  const request = await fetch(`https://loteriascaixa-api.herokuapp.com/api/${loteria}/${concurso}`);
  const requestJson = await request.json();
  // console.log(requestJson);
  return requestJson;
};

export default resultGames;
