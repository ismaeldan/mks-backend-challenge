const knex = require('../database/connection')

const editarFilme = async (req, res) => {
  const { id } = req.params
  const { nome, descricao, diretor, ano_lancamento, tipo } = req.body

  if (!nome || !ano_lancamento) {
    return res
      .status(400)
      .json({ mensagem: 'Nome ou Ano de lançamento são obrigatório.' })
  }

  try {
    const verificaId = await knex('filmes').where({ id }).first()

    if (!verificaId) {
      return res.status(400).json({ mensagem: 'Filme não encontrado.' })
    }

    const resultado = await knex('filmes')
      .update({
        nome,
        descricao,
        diretor,
        ano_lancamento,
        tipo
      })
      .where({ id })
      .returning('*')

    return res.status(200).json(resultado)
  } catch (error) {
    return res.status(500).json({ message: 'Erro interno do servidor.' })
  }
}

module.exports = editarFilme
