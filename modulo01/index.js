const express = require('express');

const app = express();
// Query params = /users?nome=Rodrigo
// Route params = /users/12
// utilizamos um array local, e no route params, informamos o índice do elemento do array que vai mostrar na tela
const users = ["Rodrigo", "Roberto", "Rogério", "Rock'n Roll"];

app.get('/users/:index', (req, res) => {
  const { index } = req.params;

  return res.json(users[index-1]);
})

app.listen(3333);


