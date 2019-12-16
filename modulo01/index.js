const express = require('express');

const app = express();
// Query params = /users?nome=Rodrigo
app.get('/users', (req, res) => {
  const nome = req.query.nome;

  return res.json({message: `Buscando usuário ${nome}`});
})

app.listen(3333);


