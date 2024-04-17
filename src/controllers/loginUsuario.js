const knex = require('../database/connection')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const keyPrivada = process.env.KEY_DEVWEBTOKEN

const login = async (req, res) => {
  const { email, senha } = req.body

  if (!email || !senha) {
    return res
      .status(400)
      .json({ mensagem: 'É obrigatório fornecer email e senha' })
  }

  try {
    const usuario = await knex('usuario').where({ email }).first()

    if (!usuario) {
      return res.status(401).json({ messagem: 'Email invalida' })
    }

    const validaSenhaBcrypt = await bcrypt.compare(senha, usuario.senha)

    if (!validaSenhaBcrypt) {
      return res.status(401).json({ mensagem: 'Senha invalida' })
    }

    const token = jwt.sign({ id: usuario.id }, keyPrivada, { expiresIn: '1h' })

    const dadosUsuario = {
      id: usuario.id,
      nome: usuario.nome,
      email: usuario.email
    }

    return res.status(200).json({ dadosUsuario, token })
  } catch (error) {
    return res.status(500).json({ mensagem: 'Erro interno do servidor' })
  }
}

module.exports = login
