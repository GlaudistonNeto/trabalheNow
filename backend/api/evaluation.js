const queries = require('./queries')

module.exports = app => {
    const { existsOrError } = app.api.validation

    const save = (req, res) => {
        const article = { ...req.body }
        if(req.params.id) article.id = req.params.id

        try {
            existsOrError(article.articleId, 'Trabalho não informado')
            existsOrError(article.grade, 'Nota não informada')
        } catch(msg) {
            res.status(400).send(msg)
        }

        if(article.id) {
            app.db('evaluations')
                .update(article)
                .where({ id: article.id })
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        } else {
            app.db('evaluations')
                .insert(article)
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        }
    }

    const remove = async (req, res) => {
        try {
            const rowsDeleted = await app.db('evaluations')
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

        const result = await app.db('evaluations').count('id').first()
        const count = parseInt(result.count)

        app.db('evaluations')
            .select('id', 'articleId', 'grade')
            .limit(limit).offset(page * limit - limit)
            .then(evaluations => res.json({ data: evaluations, count, limit }))
            .catch(err => res.status(500).send(err))
    }

    const getById = (req, res) => {
        app.db('evaluations')
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

        app.db({e: 'evaluations', u: 'users'})
            .select('e.id', 'e.name', 'e.description', 'e.imageUrl', { author: 'u.name' })
            .limit(limit).offset(page * limit - limit)
            .whereRaw('?? = ??', ['u.id', 'a.userId'])
            .whereIn('categoryId', ids)
            .orderBy('a.id', 'desc')
            .then(evaluations => res.json(evaluations))
            .catch(err => res.status(500).send(err))
    }

    return { save, remove, get, getById, getByCategory }
}