const express = require('express');

const app = express();


app.use(express.json());
// Query params = /users?nome=Rodrigo
// Route params = /users/12

// utilizamos um array local, e no route params, informamos o índice do elemento do array que vai mostrar na tela
const users = ["Rodrigo", "Roberto", "Rogério", "Rock'n Roll"];

// MIDDLEWARE
/* sempre que houver uma requisição em qualquer rota da aplicação, 
    o fluxo passará por aqui, porém, para prosseguir devemos retornar NEXT(),
    senão a aplicação ficará SUSPENSA neste ponto.
*/
app.use((req, res, next) => {
  //console.time('Requisição nível App');
  //console.log(`Método: ${req.method}; URL: ${req.url}`);
  next();
  //console.timeEnd('Requisição nível App');
})
/* elaboração de Middleware específico para Rotas
    => acrescenta-se a "função do middleware" na chamada da Rota
      que neste exemplo será: PUT e POST
*/
// => se não existe o campo "name" no body do request, emite msg.
function checkUserExists(req, res, next){
  if (!req.body.name){
    return res.status(400).json({error: 'User name is required'})
  }
  return next();
}
// => se não existe o index informado, não realiza operação (e não dá erro)
// => OBS.: o middleware pode modificar as variaveis (req, res)
function checkUserInArray(req, res, next){
  const user = users[req.params.index-1];

  if (!user){
    return res.status(400).json({error: 'User does not exists'})
  }

  req.user = user;

  return next();
}

// rota listagem de usuários
app.get('/users', (req, res) => {
  return res.json(users);
})

// rota mostra um usuário específico
app.get('/users/:index', checkUserInArray, (req, res) => {
  return res.json(req.user);
})

// rota inclusão de usuário {Body}
/* para o expresse ler o formato JSON do Body da Request, 
    é necessário incluir esta funcionalidade no express através do use(JSON)
*/
app.post('/users', checkUserExists, (req, res) => {
  const { name } = req.body
  
  users.push(name);

  return res.json(users);
})

// rota edição de usuário
app.put('/users/:index', checkUserExists, checkUserInArray, (req, res) => {
  const { index } = req.params;
  const { name } = req.body;

  users[index-1] = name;

  return res.json(users);
})

// rota exclusão de usuário
app.delete('/users/:index', checkUserInArray, (req, res) => {
  const { index } = req.params;

  users.splice(index-1, 1);

  return res.json(users);
})

app.listen(3333);