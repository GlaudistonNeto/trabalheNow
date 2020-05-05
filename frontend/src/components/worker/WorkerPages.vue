<template>
    <div class="worker-pages">
        <PageTitle icon="fa fa-cogs" main="Portfolios do Trabalhador"
            sub="Cadastros" />
        <div class="worker-pages-tabs">
            <b-card no-body>
                <b-tabs card>
                    <b-tab title="Portfolios">
                        <PortfolioWorker />
                    </b-tab>
                    <b-tab title="Categorias">
                        <CategoryWorker />
                    </b-tab>
                </b-tabs>
            </b-card>
        </div>
    </div>
</template>

<script>
import PageTitle from '../template/PageTitle'
import PortfolioWorker from './PortfolioWorker'
import CategoryWorker from './CategoryWorker'

export default {
    name: 'WorkerPages',
    components: { PageTitle, PortfolioWorker, CategoryWorker }
}
</script>

<style>

</style>
