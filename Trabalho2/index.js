const fs = require('fs');

const estados = require('./Estados.json');
const cidades = require('./Cidades.json');

/*

# ÍNDICE DE FUNÇÕES
- lerEstado(UF)
- quantificarCidades(UF)
- ordenarCidades()
- topCincoMaisCidades()
- topCincoMenosCidades()
- maiorNomeDeCidade(opcao)
- maiorNomeDeCidadeBrasil()
- maiorNomeDeCidadeBrasil()
- menorNomeDeCidadeBrasil();

*/

function criarArquivosJSON() {
  let i = 0;
  estados.forEach(() => {
    let data = [];
    for (j = 0; j < cidades.length; j++)
      if (cidades[j].Estado == estados[i].ID) {
        data.push(JSON.stringify(cidades[j], undefined, 2));
      }

    fs.writeFile(
      `./Estados/${estados[i].Sigla}.json`,
      '[' + data + ']',
      (err) => {
        if (err) {
          console.log(err);
        }
      }
    );
    i++;
  });
}

function lerEstado(UF) {
  let arquivo = require(`./Estados/${UF}.json`);
  for (i = 0; i < arquivo.length; i++) {
    console.log(arquivo[i]);
  }
}

function quantificarCidades(UF) {
  let arquivo = require(`./Estados/${UF}.json`);
  return arquivo.length;
}

function ordenarCidades() {
  let siglas = [];
  let dados = [];

  for (i = 0; i < estados.length; i++) {
    siglas.push(estados[i].Sigla);
  }

  for (i = 0; i < siglas.length; i++) {
    let numeroDeCidades = quantificarCidades(siglas[i]);
    dados.push({ UF: siglas[i], cidades: numeroDeCidades });
  }

  dados.sort((a, b) => (a.cidades > b.cidades ? 1 : -1));
  return dados;
}

function topCincoMaisCidades() {
  let dados = ordenarCidades();
  for (i = 1; i <= 5; i++) {
    console.log(dados[dados.length - i]);
  }
}

function topCincoMenosCidades() {
  let dados = ordenarCidades();
  for (i = 0; i < 5; i++) {
    console.log(dados[i]);
  }
}

function maiorNomeDeCidade(opcao) {
  let siglas = [];
  for (i = 0; i < estados.length; i++) {
    siglas.push(estados[i].Sigla);
  }
  arrayMaioresNomesComUF = [];
  arrayMaioresNomesSemUF = [];
  siglas.forEach((sigla) => {
    let estado = require(`./Estados/${sigla}.json`);

    estado.sort((a, b) => {
      return b.Nome.length - a.Nome.length;
    });
    try {
      let filtro = estado[0].Nome.length - estado[1].Nome.length;
      if (filtro == 0) {
        lista = [];
        for (i = 0; i < 5; i++) {
          if (estado[0].Nome.length - estado[i].Nome.length == 0) {
            lista.push(estado[i].Nome);
          }
        }
        lista.sort();
        arrayMaioresNomesComUF.push(lista[0] + ' - ' + sigla);
        arrayMaioresNomesSemUF.push(lista[0]);
      } else {
        arrayMaioresNomesComUF.push(estado[0].Nome + ' - ' + sigla);
        arrayMaioresNomesSemUF.push(estado[0].Nome);
      }
    } catch {
      arrayMaioresNomesComUF.push(estado[0].Nome + ' - ' + sigla);
      arrayMaioresNomesSemUF.push(estado[0].Nome);
    }
  });
  if (opcao == 'semUF') {
    return arrayMaioresNomesSemUF;
  } else {
    console.log(arrayMaioresNomesComUF);
  }
}

function menorNomeDeCidade(opcao) {
  let siglas = [];
  for (i = 0; i < estados.length; i++) {
    siglas.push(estados[i].Sigla);
  }
  arrayMenoresNomesComUF = [];
  arrayMenoresNomesSemUF = [];
  siglas.forEach((sigla) => {
    let estado = require(`./Estados/${sigla}.json`);

    estado.sort((a, b) => {
      return a.Nome.length - b.Nome.length;
    });
    try {
      let filtro = estado[0].Nome.length - estado[1].Nome.length;
      if (filtro == 0) {
        lista = [];
        for (i = 0; i < 5; i++) {
          if (estado[0].Nome.length - estado[i].Nome.length == 0) {
            lista.push(estado[i].Nome);
          }
        }
        lista.sort();
        arrayMenoresNomesComUF.push(lista[0] + ' - ' + sigla);
        arrayMenoresNomesSemUF.push(lista[0]);
      } else {
        arrayMenoresNomesComUF.push(estado[0].Nome + ' - ' + sigla);
        arrayMenoresNomesSemUF.push(estado[0].Nome);
      }
    } catch {
      arrayMenoresNomesComUF.push(estado[0].Nome + ' - ' + sigla);
      arrayMenoresNomesSemUF.push(estado[0].Nome);
    }
  });
  if (opcao == 'semUF') {
    return arrayMenoresNomesSemUF;
  } else {
    console.log(arrayMenoresNomesComUF);
  }
}

function maiorNomeDeCidadeBrasil() {
  let lista = maiorNomeDeCidade('semUF');

  lista.sort((a, b) => {
    return b.length - a.length;
  });

  console.log(lista[0]);
}

function menorNomeDeCidadeBrasil() {
  let lista = menorNomeDeCidade('semUF');
  let listaOrdemAlfabetica = [];

  lista.sort((a, b) => {
    return a.length - b.length;
  });

  for (i = 0; i < lista.length; i++) {
    if (lista[0].length - lista[i].length == 0) {
      listaOrdemAlfabetica.push(lista[i]);
    }
  }

  listaOrdemAlfabetica.sort();
  console.log(listaOrdemAlfabetica[0]);
}
