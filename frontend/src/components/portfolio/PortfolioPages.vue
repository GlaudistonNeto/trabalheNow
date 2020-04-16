<template>
    <div class="portfolio-pages">
        <PageTitle icon="fa fa-cogs" main="Portfolio do trabalhador"
            sub="Empregos & Serviços" />
        <div class="portfolio-pages-tabs">
            <b-card no-body>
                <b-tabs card>
                    <b-tab title="Ofertas" active>
                        <ArticleAdmin />
                    </b-tab>
                    <b-tab title="Categorias">
                        <CategoryAdmin />
                    </b-tab>
                    <b-tab title="Usuários">
                        <UserAdmin />
                    </b-tab>
                </b-tabs>
            </b-card>
        </div>
    </div>
</template>

<script>
import PageTitle from '../template/PageTitle'
import ArticlePortfolio from './ArticlePortfolio'
import CategoryPortfolio from './CategoryPortfolio'
import UserPortfolio from './UserPortfolio'

export default {
    name: 'PortfolioPages',
    components: { PageTitle, ArticlePortfolio, CategoryPortfolio, UserPortfolio }
}
</script>

<style>

</style>
