const knex = require('../database/connection')

const cadastrarFilme = async (req, res) => {
  const { nome, descricao, diretor, ano_lancamento, tipo } = req.body

  if (!nome || !ano_lancamento) {
    return res
      .status(400)
      .json({ mensagem: 'Nome ou Ano de lançamento são obrigatório' })
  }

  try {
    const novoFilme = await knex('filmes')
      .insert({ nome, descricao, diretor, ano_lancamento, tipo })
      .returning('*')

    return res.status(201).json(novoFilme)
  } catch (error) {
    return res.status(500).json({ message: 'Erro interno do servidor' })
  }
}

module.exports = cadastrarFilme
