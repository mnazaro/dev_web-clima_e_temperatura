function buscarCidades() {
    var input = document.getElementById("cidadeInput").value;
    var listaCidades = document.getElementById("listaCidades");
    
    // Faça uma solicitação para uma API de geolocalização que forneça sugestões de cidades
    // Aqui, estamos usando o serviço Nominatim do OpenStreetMap como exemplo
    // Certifique-se de respeitar os termos de uso da API que você escolher
    fetch('https://nominatim.openstreetmap.org/search?q=${input}&format=json&addressdetails=1')
      .then(response => response.json())
      .then(data => {
        listaCidades.innerHTML = ""; // Limpe a lista de cidades
        data.forEach(result => {
          // Preencha a lista de cidades com as sugestões
          listaCidades.innerHTML += '<div>${result.display_name}</div>';
        });
      })
      .catch(error => {
        console.error("Erro na busca de cidades:", error);
      });
  }
  