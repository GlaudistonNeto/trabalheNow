<template>
    <div class="employer-pages">
        <PageTitle icon="fa fa-eye" main="Employeristração do Sistema"
            sub="Cadastros" />
        <div class="employer-pages-tabs">
            <b-card no-body>
                <b-tabs card>
                    <b-tab title="Trabalhos">
                        <articleEmployer />
                    </b-tab>
                    <b-tab title="Categorias">
                        <categoryEmployer />
                    </b-tab>
                </b-tabs>
            </b-card>
        </div>
    </div>
</template>

<script>
import PageTitle from '../template/PageTitle'
import ArticleEmployer from './ArticleEmployer'
import CategoryEmployer from './CategoryEmployer'

export default {
    name: 'EmployerPages',
    components: { PageTitle, ArticleEmployer, CategoryEmployer }
}
</script>

<style>

</style>
