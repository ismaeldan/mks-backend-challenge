const knex = require('../database/connection')

const listarFilmes = async (req, res) => {
  try {
    const lista = await knex('filmes').returning('*')

    return res.status(200).json(lista)
  } catch (error) {
    return res.status(500).json({ message: 'Erro interno do servidor.' })
  }
}

module.exports = listarFilmes
