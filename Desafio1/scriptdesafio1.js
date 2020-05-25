window.addEventListener('load', start);

const user = document.getElementById('user');
const resultados = document.getElementById('resultado');
const searchbtn = document.getElementById('search');
const spanMasculino = document.getElementById('masculino');
const spanFeminino = document.getElementById('feminino');
const spanIdades = document.getElementById('idades');
const spanMediaIdades = document.getElementById('media-idades');

var nomes = [];
var fotos = [];
var generos = [];
var idades = [];

const api = 'https://randomuser.me/api/?seed=javascript&results=100&nat=BR&noinfo'

function start() {
  buscaAPI()
  focusSearch()

  window.addEventListener('keyup', handleTyping)
}

function buscaAPI() {
  fetch('https://randomuser.me/api/?seed=javascript&results=100&nat=BR&noinfo').then(function (response) {
    response.json().then(function (data) {
      render(data);
    });
  }
  );
}

function render(data) {
  for (i = 0; i < data.results.length; i++) {
    nomes.push(data.results[i].name.first + " " + data.results[i].name.last)
    fotos.push(data.results[i].picture.large)
    idades.push(data.results[i].dob.age)
    generos.push(data.results[i].gender)
  }
}

function focusSearch() {
  user.focus();
}

function handleTyping(event) {
  if (event.key == 'Enter') {
    buscar()
    console.log('Pesquisando...')
  }
}

function buscar() {
  var resultado = nomes.filter(x => x.includes(user.value));
  resultados.innerHTML = ""
  let masculinos = 0;
  let femininos = 0;
  let somaIdades = 0;
  let mediaIdades = 0;

  for (i = 0; i < resultado.length; i++) {

    var nome = document.createElement('span');
    nome.classList.add('nome-pesquisado')

    var foto = document.createElement('img');
    foto.classList.add('foto-pesquisada');

    var divUsuario = document.createElement('div');
    divUsuario.classList.add('div-usuario')

    nome.textContent = resultado[i]
    foto.src = fotos[nomes.indexOf(resultado[i])];

    somaIdades += idades[nomes.indexOf(resultado[i])];

    if (generos[nomes.indexOf(resultado[i])] == 'male') {
      masculinos++
    } else { femininos++ }

    divUsuario.appendChild(foto)
    divUsuario.appendChild(nome)
    resultados.appendChild(divUsuario)
  }

  mediaIdades = somaIdades / resultado.length;
  mediaIdades = parseFloat(mediaIdades.toFixed(3));

  spanMasculino.innerHTML = `<strong>Homens: &nbsp;</strong> ${masculinos}`
  spanFeminino.innerHTML = `<strong>Mulheres: &nbsp;</strong> ${femininos}`
  spanIdades.innerHTML = `<strong>Soma das idades: &nbsp;</strong> ${somaIdades}`
  spanMediaIdades.innerHTML = `<strong>Média das idades: &nbsp;</strong> ${mediaIdades}`
}