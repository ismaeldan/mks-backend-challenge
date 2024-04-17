const knex = require('../database/connection')
const bcrypt = require('bcrypt')

const editaUsuario = async (req, res) => {
  const { nome, email, senha } = req.body

  if (!nome || !email || !senha) {
    return res
      .status(400)
      .json({ mensagem: 'Nome, Email e Senha são obrigatorios.' })
  }

  try {
    const verificaEmail = await knex('usuario').where({ email }).first()

    if (verificaEmail) {
      if (verificaEmail.email !== req.usuario.email) {
        return res
          .status(400)
          .json({ mensagem: 'Este email já está sendo usado.' })
      }
    }

    const senhaBcrypt = await bcrypt.hash(senha, 10)

    const resultado = await knex('usuario')
      .update({ nome, email, senha: senhaBcrypt })
      .where('id', req.usuario.id)
      .returning('*')

    return res.status(200).json(resultado)
  } catch (error) {
    return res.status(500).json({ message: 'Erro interno do servidor.' })
  }
}

module.exports = editaUsuario
