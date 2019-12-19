const express = require('express');

const server = express();

server.use(express.json());
server.listen(3333);

const projetos = [
  {
    "id": 1,
    "title": "Projeto 1",
    "tasks": ['reunião de abertura', 'cronograma',]
  },
  {
    "id": 2,
    "title": "Project 2",
    "tasks": ['task 1', 'task 2', 'task 3']
  }
]

// MIDDLEWARE verifica se projeto com ID informado existe, 
//    => se não, retorna mensagem erro
function projectExists(req, res, next){
  const { id } = req.params;
  // mesmo sabendo que o índice do projeto só é utilizado no DELETE,
  // achei melhor utilizá-lo para poder obter Idx e Projeto com
  // somente uma chamada de "pesquisa" no array dos projetos
  req.idx = projetos.findIndex(p=>p.id==id);
  if (req.idx < 0){
    return res.status(400).json({error: `Project id=${id} not found`})
  }
  req.projeto = projetos[req.idx];
  return next();
}
// MIDDLEWARE contabiliza quantas requisições foram feitas para a aplicação
function countRequests(req, res, next){
  console.count('Número de requisições recebidas até agora')
  next()
}
server.use(countRequests);

// Insere um projeto
server.post('/projetos', (req, res) => {
  const { id, title, tasks } = req.body;
  const projeto = {
    id,
    title,
    "tasks": tasks
  }
  projetos.push(projeto)
  return res.json(projetos)
})

// Lista todos os projetos
server.get('/projetos', (req, res) => {
  return res.json(projetos)
})

// Lista um projeto específico
//    => com o middleware verificando a existencia do projeto
//        o código da Rota ficou bem mais simples
server.get('/projetos/:id', projectExists, (req, res) => {
  return res.json(req.projeto);
})

// Modifica o 'title' de um projeto específico
//    => novamente com o middleware verificando a existencia, ficou muito mais simples
server.put('/projetos/:id', projectExists, (req, res) => {
  const { title } = req.body;
  if (!title) {
    return res.status(400).json({error: 'Title required' })
  }  
  req.projeto.title = title
  return res.json(req.projeto);
})

// Remove um projeto específico
//    => 
server.delete('/projetos/:id', projectExists, (req, res) => {
  projetos.splice(req.idx, 1);
  const p = req.projeto;
  return res.json({ message: 'Project removed from projects list', p })
})

// Insere uma única tarefa no array de tarefas de um projeto específico
server.post('/projetos/:id/tasks', projectExists, (req, res) => {
  const { title } = req.body;
  if (!title) {
    return res.json({ message: 'Title required for new task' })
  }
  req.projeto.tasks.push(title);
  return res.json(req.projeto);
})
