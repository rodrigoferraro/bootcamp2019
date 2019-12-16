const express = require('express');

const app = express();


app.use(express.json());
// Query params = /users?nome=Rodrigo
// Route params = /users/12

// utilizamos um array local, e no route params, informamos o índice do elemento do array que vai mostrar na tela
const users = ["Rodrigo", "Roberto", "Rogério", "Rock'n Roll"];

// rota listagem de usuários
app.get('/users', (req, res) => {
  return res.json(users);
})

// rota mostra um usuário específico
app.get('/users/:index', (req, res) => {
  const { index } = req.params;

  return res.json(users[index-1]);
})

// rota inclusão de usuário {Body}
// para o expresse ler o formato JSON do Body da Request, é necessário incluir esta funcionalidade no express através do use(JSON)
app.post('/users', (req, res) => {
  const { name } = req.body

  
  users.push(name);

  return res.json(users);
})

// rota edição de usuário
app.put('/users/:index', (req, res) => {
  const { index } = req.params;
  const { name } = req.body;

  users[index-1] = name;

  return res.json(users);
})

// rota exclusão de usuário
app.delete('/users/:index', (req, res) => {
  const { index } = req.params;

  users.splice(index-1, 1);

  return res.json(users);
})

app.listen(3333);