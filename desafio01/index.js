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

// Insere um projeto
server.post('/projetos', (req, res) => {
  const { id, title, tasks } = req.body;
  const projeto = {
    "id": id,
    "title": title,
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
server.get('/projetos/:id', (req, res) => {
  const id = req.params.id;
  const projeto = projetos.find(p => p.id == id);
  if (!projeto) {
    return res.json({ message: `Project id=${id} not found` })
  }
  return res.json(projeto);
})

// Modifica o 'title' de um projeto específico
function updateTitle(id, title) {
  for (var i in projetos) {
    if (projetos[i].id == id) {
      projetos[i].title = title;
      return projetos[i];
    }
  }
  return undefined;
}
server.put('/projetos/:id', (req, res) => {
  const id = req.params.id;
  const { title } = req.body;
  const p = updateTitle(id, title);
  if (!p) {
    return res.json({ message: `Project id=${id} not found` })
  }
  return res.json(p);
})

// Remove um projeto específico
server.delete('/projetos/:id', (req, res) => {
  const id = req.params.id;
  const p = projetos.find(p => p.id == id);
  if (!p) {
    return res.json({ message: `Project id=${id} not found` })
  }
  projetos.pop(p);
  return res.json({ message: 'Project removed from projects list', p })
})

// Insere uma única tarefa no array de tarefas de um projeto específico
function insereTask(id, task) {
  for (var i in projetos) {
    if (projetos[i].id == id) {
      projetos[i].tasks.push(task);
      return projetos[i];
    }
  }
  return undefined;
}

server.post('/projetos/:id/tasks', (req, res) => {
  const id = req.params.id;
  const { task } = req.body;
  if (!task) {
    return res.json({ message: 'Task required' })
  }
  const p = insereTask(id, task);
  if (!p) {
    return res.json({ message: `Project id=${id} not found` })
  }
  return res.json(p);
})
