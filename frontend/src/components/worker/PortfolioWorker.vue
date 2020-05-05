<template>
    <div class="template-worker">
        <b-form>
            <input id="template-id" type="hidden" v-model="portfolio.id" />
            <b-form-group label="Descrição" label-for="portfolio-description">
                <b-form-input id="portfolio-description" type="text"
                    v-model="portfolio.description" required
                    :readonly="mode === 'remove'"
                    placeholder="Descreva este Trabalho..." />
            </b-form-group>
            <b-form-group v-if="mode === 'save'"
                label="Imagem (URL):" label-for="portfolio-imageUrl">
                <b-form-input id="portfolio-imageUrl" type="text"
                    v-model="portfolio.imageUrl" required
                    :readonly="mode === 'remove'"
                    placeholder="Informe a URL da Imagem..." />
            </b-form-group>
            <b-form-group v-if="mode === 'save'" 
                label="Autor:" label-for="portfolio-userId">
                <b-form-select id="portfolio-userId"
                    :options="users" v-model="portfolio.userId" />
            </b-form-group>
            <b-form-group v-if="mode === 'save'"
                label="Descrição" label-for="portfolio-description">
                <VueEditor v-model="portfolio.description"
                    placeholder="Descreva as funções desse trabalho..." />
            </b-form-group>
            <b-button variant="primary" v-if="mode === 'save'"
                @click="save">Salvar</b-button>
            <b-button variant="danger" v-if="mode === 'remove'"
                @click="remove">Excluir</b-button>
            <b-button class="ml-2" @click="reset">Cancelar</b-button>
        </b-form>
        <hr>
        <b-table hover striped :items="portfolios" :fields="fields">
            <template slot="actions" slot-scope="data">
                <b-button variant="warning" @click="loadPortfolio(data.item)" class="mr-2">
                    <i class="fa fa-pencil"></i>
                </b-button>
                <b-button variant="danger" @click="loadPortfolio(data.item, 'remove')">
                    <i class="fa fa-trash"></i>
                </b-button>
            </template>
        </b-table>
        <b-pagination size="md" v-model="page" :total-rows="count" :per-page="limit" />
    </div>
</template>

<script>
import { VueEditor } from "vue2-editor"
import { baseApiUrl, showError } from '@/global'
import axios from 'axios'

export default {
    name: 'PortfolioEmployer',
    components: { VueEditor },
    data: function() {
        return {
            mode: 'save',
            portfolio: {},
            portfolios: [],
            categories: [],
            users: [],
            page: 1,
            limit: 0,
            count: 0,
            fields: [
                { key: 'id', label: 'Código', sortable: true },
                { key: 'description', label: 'Descrição', sortable: true },
                { key: 'worker', label: 'Trabalhador', sortable: true },
                { key: 'actions', label: 'Ações' }
            ]
        }
    },
    methods: {
        loadPortfolios() {
            const url = `${baseApiUrl}/portfolios?page=${this.page}`
            axios.get(url).then(res => {
                this.portfolios = res.data.data
                this.count = res.data.count
                this.limit = res.data.limit
            })
        },
        reset() {
            this.mode = 'save'
            this.portfolio = {}
            this.loadPortfolios()
        },
        save() {
            const method = this.portfolio.id ? 'put' : 'post'
            const id = this.portfolio.id ? `/${this.portfolio.id}` : ''
            axios[method](`${baseApiUrl}/portfolios${id}`, this.portfolio)
                .then(() => {
                    this.$toasted.global.defaultSuccess()
                    this.reset()
                })
                .catch(showError)
        },
        remove() {
            const id = this.portfolio.id
            axios.delete(`${baseApiUrl}/portfolios/${id}`)
                .then(() => {
                    this.$toasted.global.defaultSuccess()
                    this.reset()
                })
                .catch(showError)
        },
        loadPortfolio(portfolio, mode = 'save') {
            this.mode = mode
            axios.get(`${baseApiUrl}/portfolios/${portfolio.id}`)
                .then(res => this.portfolio = res.data)
        },
        loadCategories() {
            const url = `${baseApiUrl}/categories`
            axios.get(url).then(res => {
                this.categories = res.data.map(category => {
                    return { value: category.id, text: category.path }
                })
            })
        },
        loadUsers() {
            const url = `${baseApiUrl}/users`
            axios.get(url).then(res => {
                this.users = res.data.map(user => {
                    return { value: user.id, text: `${user.name} - ${user.email}` }
                })
            })
        }
    },
    watch: {
        page() {
            this.loadPortfolios()
        }
    },
    mounted() {
        this.loadUsers()
        this.loadCategories()
        this.loadPortfolios()
    }
}
</script>

<style>

</style>