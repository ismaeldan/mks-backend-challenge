const express = require('express')
const multer = require('multer')
const usuarioLogado = require('../middleware/authentication')

const listarFilmes = require('../controllers/listarfilmes')
const cadastrar = require('../controllers/cadastroUsuario')
const login = require('../controllers/loginUsuario')

const rotas = express()

rotas.post('/cadastro', cadastrar)
rotas.post('/login', login)
rotas.use(usuarioLogado)
rotas.get('/catalogo', listarFilmes)

module.exports = rotas
