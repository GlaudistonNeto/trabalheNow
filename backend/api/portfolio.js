const queries = require('./queries')

module.exports = app => {
    const { existsOrError } = app.api.validation

    const save = (req, res) => {
        const portfolio = { ...req.body }
        if(req.params.id) portfolio.id = req.params.id

        try {
            existsOrError(portfolio.description, 'Descrição não informada')
            existsOrError(portfolio.categoryId, 'Categoria não informada')
            existsOrError(portfolio.userId, 'Trabalhador não informado')
        } catch(msg) {
            res.status(400).send(msg)
        }

        if(portfolio.id) {
            app.db('portfolios')
                .update(article)
                .where({ id: article.id })
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        } else {
            app.db('portfolios')
                .insert(article)
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        }
    }

    const remove = async (req, res) => {
        try {
            const rowsDeleted = await app.db('portfolios')
                .where({ id: req.params.id }).del()
            
            try {
                existsOrError(rowsDeleted, 'Portfolio não encontrado.')
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

        app.db('portfolios')
            .select('id', 'description')
            .limit(limit).offset(page * limit - limit)
            .then(portfolios => res.json({ data: portfolios, count, limit }))
            .catch(err => res.status(500).send(err))
    }

    const getById = (req, res) => {
        app.db('portfolios')
            .where({ id: req.params.id })
            .first()
            .then(article => {
                article.content = article.content.toString()
                return res.json(article)
            })
            .catch(err => res.status(500).send(err))
    }

    const getByCategory = async (req, res) => {
        const categoryId = req.params.id
        const page = req.query.page || 1
        const categories = await app.db.raw(queries.categoryWithChildren, categoryId)
        const ids = categories.rows.map(c => c.id)

        app.db({p: 'portfolios', u: 'users'})
            .select('p.id', 'p.description', 'p.imageUrl', { author: 'u.name' })
            .limit(limit).offset(page * limit - limit)
            .whereRaw('?? = ??', ['u.id', 'a.userId'])
            .whereIn('categoryId', ids)
            .orderBy('p.id', 'desc')
            .then(portfolios => res.json(portfolios))
            .catch(err => res.status(500).send(err))
    }

    return { save, remove, get, getById, getByCategory }
}