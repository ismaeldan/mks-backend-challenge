const knex = require('../database/connection')
const bcrypt = require('bcrypt')

const cadastrar = async (req, res) => {
  const { nome, email, senha } = req.body

  if (!nome || !email || !senha) {
    return res
      .status(400)
      .json({ mensagem: 'Nome, Email e Senha são obrigatorios' })
  }

  try {
    const verificaEmail = await knex('usuario').where({ email }).first()

    if (verificaEmail) {
      return res
        .status(400)
        .json({ mensagem: 'Este email já está sendo usado.' })
    }

    const senhaCriptografada = await bcrypt.hash(senha, 10)

    const novoUsuario = await knex('usuario')
      .insert({
        nome,
        email,
        senha: senhaCriptografada
      })
      .returning('*')

    return res.status(201).json(novoUsuario)
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: 'Erro interno do servidor' })
  }
}

module.exports = cadastrar
