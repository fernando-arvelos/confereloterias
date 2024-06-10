const resultGames = async (loteria, concurso) => {
  const request = await fetch(`https://servicebus2.caixa.gov.br/portaldeloterias/api/${loteria}/${concurso}`);
  const requestJson = await request.json();
  // console.log(requestJson);
  return requestJson;
};

export default resultGames;
