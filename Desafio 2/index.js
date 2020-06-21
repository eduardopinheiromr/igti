const fs = require('fs').promises;
const express = require('express');
const app = express();

app.use(express.json());

app.listen(3000, () => {
  console.log('API working on port 3000');
});

app.post('/criar-grade/', (req, res) => {
  try {
    let arquivo = require('./grades.json');
    let date = new Date();
    let inputData = {
      id: arquivo[0].nextId++,
      student: req.body.student,
      subject: req.body.subject,
      type: req.body.type,
      value: req.body.value,
      timestamp: date,
    };
    arquivo[0].grades.push(inputData);
    fs.writeFile('./grades.json', JSON.stringify(arquivo), 'utf8', (err) => {
      if (err) {
        res.send(err);
      }
    });
    res.send(inputData);
  } catch (err) {
    res.send(err);
  }
});

app.put('/:id', (req, res) => {
  let id = req.params.id;
  let arquivo = require('./grades.json');
  let validador = false;
  for (i = 0; i < arquivo[0].grades.length; i++) {
    if (id == i) {
      validador = true;
    }
  }
  if (validador == false) {
    res.send('ID inexistente.');
  } else {
    let date = new Date();
    let gradeEdit = {
      id: id,
      student: req.body.student,
      subject: req.body.subject,
      type: req.body.type,
      value: req.body.value,
      timestamp: date,
    };
    let antigo = arquivo[0].grades[id - 1];
    arquivo[0].grades[id - 1] = gradeEdit;

    fs.writeFile('./grades.json', JSON.stringify(arquivo), 'utf8', (err) => {
      if (err) {
        res.send(err);
      }
    });
    res.send(arquivo[0].grades[id - 1]);
  }
});

app.delete('/:id', (req, res) => {
  let arquivo = require('./grades.json');
  let id = req.params.id;
  let novoArquivo = arquivo[0].grades.filter(
    (registro) => registro.id !== parseInt(id)
  );

  fs.writeFile('./grades.json', JSON.stringify(novoArquivo), 'utf8', (err) => {
    if (err) {
      res.send(err);
    }
  });
  res.send(`ID ${id} removido com sucesso.`);
});

app.get('/:id', (req, res) => {
  let id = req.params.id;
  let arquivo = require('./grades.json');
  let validador = false;
  for (i = 0; i < arquivo[0].grades.length; i++) {
    if (id == arquivo[0].grades[i].id) {
      validador = true;
    }
  }
  if (validador == true) {
    res.send(arquivo[0].grades[id - 1]);
  } else {
    res.send('ID inexistente');
  }
});

app.get('/:student/:subject/', (req, res) => {
  let arquivo = require('./grades.json');
  let aluno = req.params.student;
  let materia = req.params.subject;
  let notas = 0;
  for (i = 0; i < arquivo[0].grades.length; i++) {
    if (
      arquivo[0].grades[i].student == aluno &&
      arquivo[0].grades[i].subject == materia
    ) {
      notas += arquivo[0].grades[i].value;
    }
  }
  if (notas == 0) {
    res.send('Não encontrado.');
  } else {
    res.send(
      `O somatório das notas de ${aluno} na disciplina ${materia} foi de ${notas}`
    );
  }
});

app.get('/media/:subject/:type', (req, res) => {
  let arquivo = require('./grades.json');
  let materia = req.params.subject;
  let tipo = req.params.type;
  let notas = 0;
  let divisor = 0;
  let teste = [];
  for (i = 0; i < arquivo[0].grades.length; i++) {
    if (
      arquivo[0].grades[i].subject == materia &&
      arquivo[0].grades[i].type == tipo
    ) {
      notas += arquivo[0].grades[i].value;
      teste.push(arquivo[0].grades[i].value);
      divisor++;
    }
  }
  if (notas == 0) {
    res.send('Não encontrado');
  }
  res.send(
    `A média de ${materia} em ${tipo} foi de ${
      notas / divisor
    } teste = ${teste}.`
  );
});

app.get('/ranking/:subject/:type', (req, res) => {
  let arquivo = require('./grades.json');
  let materia = req.params.subject;
  let tipo = req.params.type;
  let notas = [];
  for (i = 0; i < arquivo[0].grades.length; i++) {
    if (
      arquivo[0].grades[i].subject == materia &&
      arquivo[0].grades[i].type == tipo
    ) {
      notas.push(arquivo[0].grades[i].id);
    }
  }
  notas.sort((a, b) => {
    return b - a;
  });
  resposta = [notas[0], notas[1], notas[2]];
  res.send(resposta);
});
