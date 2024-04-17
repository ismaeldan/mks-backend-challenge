const express = require('express')
const usuarioLogado = require('../middleware/authentication')

const listarFilmes = require('../controllers/listarfilmes')
const cadastrarUsuario = require('../controllers/cadastroUsuario')
const login = require('../controllers/loginUsuario')
const editaUsuario = require('../controllers/editarUsuario')
const cadastrarFilme = require('../controllers/cadastroFilme')
const editarFilme = require('../controllers/editarFilmes')
const excluirFilme = require('../controllers/excluirFilme')

const rotas = express()

rotas.post('/usuario', cadastrarUsuario)
rotas.post('/login', login)

rotas.use(usuarioLogado)

rotas.put('/usuario', editaUsuario)
rotas.get('/filme', listarFilmes)
rotas.post('/filme', cadastrarFilme)
rotas.put('/filme/:id', editarFilme)
rotas.delete('/filme/:id', excluirFilme)

module.exports = rotas
