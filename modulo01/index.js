const express = require('express');

const app = express();
// Query params = /users?nome=Rodrigo
// Route params = /users/12
app.get('/users/:id', (req, res) => {
  const { id } = req.params;

  return res.json({message: `Buscando usuário ${id}`});
})

app.listen(3333);


