const admin = require('./admin')
const worker = require('./worker')
const employer = require('./employer')

module.exports = app => {
    app.post('/signup', app.api.user.save)
    app.post('/signin', app.api.auth.signin)
    app.post('/validateToken', app.api.auth.validateToken)

    app.route('/users')
        .all(app.config.passport.authenticate())
        .post(admin(app.api.user.save))
        .get(admin(app.api.user.get))

    app.route('/users/:id')
        .all(app.config.passport.authenticate())
        .put(admin(app.api.user.save))
        .get(admin(app.api.user.getById))
        .delete(admin(app.api.user.remove))

    app.route('/categories')
        .all(app.config.passport.authenticate())
        .get(app.api.category.get)
        .post(app.api.category.save)

    // Cuidado com ordem! Tem que vir antes de /categories/:id
    app.route('/categories/tree')
        .all(app.config.passport.authenticate())
        .get(app.api.category.getTree)

    app.route('/categories/:id')
        .all(app.config.passport.authenticate())
        .get(app.api.category.getById)
        .put(app.api.category.save)
        .delete(app.api.category.remove)

    app.route('/articles')
        .all(app.config.passport.authenticate())
        .get(employer(app.api.article.get))
        .post(employer(app.api.article.save))

    app.route('/articles/:id')
        .all(app.config.passport.authenticate())
        .get(app.api.article.getById)
        .put(employer(app.api.article.save))
        .delete(employer(app.api.article.remove))

    app.route('/categories/:id/articles')
        .all(app.config.passport.authenticate())
        .get(app.api.article.getByCategory)
        
        app.route('/portfolios')
        .all(app.config.passport.authenticate())
        .get(worker(app.api.portfolio.get))
        .post(worker(app.api.portfolio.save))
        
        app.route('/portfolios/:id')
        .all(app.config.passport.authenticate())
        .get(app.api.portfolio.getById)
        .put(worker(app.api.portfolio.save))
        .delete(worker(app.api.portfolio.remove))
        
    app.route('/portfolios/:id/categories')
        .all(app.config.passport.authenticate())
        .get(app.api.portfolio.getByCategory)

    app.route('/stats')
        .all(app.config.passport.authenticate())
        .get(app.api.stat.get)
}