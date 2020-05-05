const schedule = require('node-schedule')

module.exports = app => {
    schedule.scheduleJob('*/1 * * * *', async function () {
        const usersCount = await app.db('users').count('id').first()
        const categoriesCount = await app.db('categories').count('id').first()
        const articlesCount = await app.db('articles').count('id').first()
        const portfoliosCount = await app.db('portfolios').count('id').first()

        const { Stat } = app.api.stat

        const lastStat = await Stat.findOne({}, {},
            { sort: { 'createdAt' : -1 } })

        const stat = new Stat({
            users: usersCount.count,
            categories: categoriesCount.count,
            articles: articlesCount.count,
            portfolios: portfoliosCount.count,
            createdAt: new Date()
        })

        const changeUsers = !lastStat || stat.users !== lastStat.users // to request users number
        const changeCategories = !lastStat || stat.categories !== lastStat.categories // to request categories number
        const changeArticles = !lastStat || stat.articles !== lastStat.articles // to request articles number
        const changePortfolios = !lastStat || stat.portfolios !== lastStat.portfolios // to request portfolios number

        if(changeUsers || changeCategories || changeArticles || changePortfolios) {
            stat.save().then(() => console.log('[Stats] Estatíticas atualizadas!'))
        }
    })
}