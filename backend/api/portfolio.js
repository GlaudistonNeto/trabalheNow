const queries = require('./queries')

module.exports = app => {
    const { existsOrError } = app.api.validation

    const save = (req, res) => {
        const portfolio = { ...req.body }
        if(req.params.id) portfolio.id = req.params.id

        try {
            existsOrError(portfolio.work, 'Nome do serviço não informado')
            existsOrError(portfolio.description, 'Descrição do serviço não informada')
            existsOrError(portfolio.categoryId, 'Categoria do serviço não informada')
            existsOrError(portfolio.userId, 'Trabalhador não informado')
            existsOrError(portfolio.evaluation, 'Avaliação não informado')
        } catch(msg) {
            res.status(400).send(msg)
        }

        if(portfolio.id) {
            app.db('portfolios')
                .update(portfolio)
                .where({ id: portfolio.id })
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        } else {
            app.db('portfolios')
                .insert(portfolio)
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        }
    }

    const remove = async (req, res) => {
        try {
            const rowsDeleted = await app.db('portfolios')
                .where({ id: req.params.id }).del()
            
            try {
                existsOrError(rowsDeleted, 'Trabalho não foi encontrado.')
            } catch(msg) {
                return res.status(400).send(msg)    
            }

            res.status(204).send()
        } catch(msg) {
            res.status(500).send(msg)
        }
    }

    const limit = 10 // usado para paginação
    const get = async (req, res) => {
        const page = req.query.page || 1

        const result = await app.db('portfolios').count('id').first()
        const count = parseInt(result.count)

        app.db('portfolio')
            .select('id', 'work', 'description')
            .limit(limit).offset(page * limit - limit)
            .then(categories => res.json({ data: categories, count, limit }))
            .catch(err => res.status(500).send(err))
    }

    const getById = (req, res) => {
        app.db('portfolios')
            .where({ id: req.params.id })
            .first()
            .then(portfolio => {
              portfolio.content = portfolio.content.toString()
                return res.json(portfolio)
            })
            .catch(err => res.status(500).send(err))
    }

    const getByCategory = async (req, res) => {
        const categoryId = req.params.id
        const page = req.query.page || 1
        const categories = await app.db.raw(queries.categoryWithChildren, categoryId)
        const ids = categories.rows.map(c => c.id)

        app.db({p: 'portfolios', u: 'users'})
            .select('p.id', 'p.name', 'p.description', 'p.imageUrl', { author: 'u.name' })
            .limit(limit).offset(page * limit - limit)
            .whereRaw('?? = ??', ['u.id', 'a.userId'])
            .whereIn('categoryId', ids)
            .orderBy('p.id', 'desc')
            .then(articles => res.json(articles))
            .catch(err => res.status(500).send(err))
    }

    return { save, remove, get, getById, getByCategory }
}