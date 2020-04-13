const queries = require('./queries')

module.exports = app => {
    const { existsOrError } = app.api.validation

    const save = (req, res) => {
        const job = { ...req.body }
        if(req.params.id) job.id = req.params.id

        try {
            existsOrError(job.name, 'Name not set')
            existsOrError(job.description, 'Description not set')
            existsOrError(job.categoryId, 'Category not set')
            existsOrError(job.userId, 'Author not set')
            existsOrError(job.content, 'Content not set')
        } catch(msg) {
            res.status(400).send(msg)
        }

        if(job.id) {
            app.db('jobs')
                .update(job)
                .where({ id: job.id })
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        } else {
            app.db('jobs')
                .insert(job)
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        }
    }

    const remove = async (req, res) => {
        try {
            const rowsDeleted = await app.db('jobs')
                .where({ id: req.params.id }).del()
            
            try {
                existsOrError(rowsDeleted, 'Trabalho não encontrado.')
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

        const result = await app.db('jobs').count('id').first()
        const count = parseInt(result.count)

        app.db('jobs')
            .select('id', 'name', 'description')
            .limit(limit).offset(page * limit - limit)
            .then(jobs => res.json({ data: jobs, count, limit }))
            .catch(err => res.status(500).send(err))
    }

    const getById = (req, res) => {
        app.db('jobs')
            .where({ id: req.params.id })
            .first()
            .then(job => {
                job.content = job.content.toString()
                return res.json(job)
            })
            .catch(err => res.status(500).send(err))
    }

    const getByCategory = async (req, res) => {
        const categoryId = req.params.id
        const page = req.query.page || 1
        const categories = await app.db.raw(queries.categoryWithChildren, categoryId)
        const ids = categories.rows.map(c => c.id)

        app.db({a: 'jobs', u: 'users'})
            .select('a.id', 'a.name', 'a.description', 'a.imageUrl', { author: 'u.name' })
            .limit(limit).offset(page * limit - limit)
            .whereRaw('?? = ??', ['u.id', 'a.userId'])
            .whereIn('categoryId', ids)
            .orderBy('a.id', 'desc')
            .then(jobs => res.json(jobs))
            .catch(err => res.status(500).send(err))
    }

    return { save, remove, get, getById, getByCategory }
}