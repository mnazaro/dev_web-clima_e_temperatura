function buscarCidades() {
    var input = document.getElementById("cidadeInput").value;
    var listaCidades = document.getElementById("listaCidades");
  
    // Limpe a lista de cidades
    listaCidades.innerHTML = "";
  
    if (input.length >= 3) { // Verifique se o usuário digitou pelo menos 3 caracteres
      // Faça uma solicitação para a API de sugestão de cidades
      fetch(`https://nominatim.openstreetmap.org/search?format=json&limit=5&q=${input}`)
        .then(response => response.json())
        .then(data => {
          if (data.length > 0) {
            listaCidades.style.display = "block"; // Exiba a lista
            data.forEach(result => {
              const cidadeNome = result.display_name;
              const cidadeLat = result.lat;
              const cidadeLon = result.lon;
  
              const cidadeItem = document.createElement("div");
              cidadeItem.textContent = cidadeNome;
              cidadeItem.onclick = function () {
                // Preencha o campo de entrada com a cidade selecionada
                document.getElementById("cidadeInput").value = cidadeNome;
                // Oculte a lista
                listaCidades.style.display = "none";
                // Use as coordenadas (latitude e longitude) para fazer uma solicitação à API do Climatempo
                consultarClima(cidadeLat, cidadeLon);
              };
              listaCidades.appendChild(cidadeItem);
            });
          }
        })
        .catch(error => {
          console.error("Erro na busca de cidades:", error);
        });
    } else {
      listaCidades.style.display = "none"; // Oculte a lista se o campo de entrada estiver vazio
    }
  }
  
function consultarClima(latitude, longitude) {
    // Substitua 'SUA_CHAVE_DE_API' pela sua chave de API do Climatempo
    const apiKey = 'b8a589ee5dd6742dc2d52b3f04f79ca5';
    // Use a latitude e longitude para fazer uma solicitação à API do Climatempo
    fetch(`https://apiadvisor.climatempo.com.br/api/v1/weather?token=${apiKey}&lon=${longitude}&lat=${latitude}`)
      .then(response => response.json())
      .then(data => {
        // Processar os dados do clima retornado pela API do Climatempo
        console.log(data);
      })
      .catch(error => {
        console.error("Erro na consulta de clima:", error);
      });
}
  