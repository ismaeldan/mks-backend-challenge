const knex = require('../database/connection')

const excluirFilme = async (req, res) => {
  const { id } = req.params

  try {
    const verificaId = await knex('filmes').where({ id }).first()

    if (!verificaId) {
      return res.status(400).json({ mensagem: 'Filme não encontrado.' })
    }

    await knex('filmes').where({ id }).del()

    return res.status(200).json({ mensagem: 'Filme excluído com sucesso!' })
  } catch (error) {
    return res.status(500).json({ message: 'Erro interno do servidor.' })
  }
}

module.exports = excluirFilme
