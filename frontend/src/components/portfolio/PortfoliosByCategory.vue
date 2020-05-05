<template>
    <div class="portfolios-by-category">
        <PageTitle icon="fa fa-folder-o"
            :main="category.name" sub="Categoria" />
        <ul>
            <li v-for="portfolio in portfolios" :key="portfolio.id">
                <PortfolioItem :portfolio="portfolio" />
            </li>
        </ul>
        <div class="load-more">
            <button v-if="loadMore"
                class="btn btn-lg btn-outline-primary"
                @click="getPortfolios">Carregar Mais Artigos</button>
        </div>
    </div>
</template>

<script>
import { baseApiUrl } from '@/global'
import axios from 'axios'
import PageTitle from '../template/PageTitle'
import PortfolioItem from './PortfolioItem'

export default {
    name: 'PortfoliosByCategory',
    components: { PageTitle, PortfolioItem },
    data: function() {
        return {
            category: {},
            portfolios: [],
            page: 1,
            loadMore: true
        }
    },
    methods: {
        getCategory() {
            const url = `${baseApiUrl}/categories/${this.category.id}`
            axios(url).then(res => this.category = res.data)
        },
        getPortfolios() {
            const url = `${baseApiUrl}/categories/${this.category.id}/portfolios?page=${this.page}`
            axios(url).then(res => {
                this.portfolios = this.portfolios.concat(res.data)
                this.page++

                if(res.data.length === 0) this.loadMore = false
            })
        }
    },
    watch: {
        $route(to) {
            this.category.id = to.params.id
            this.portfolios = []
            this.page = 1
            this.loadMore = true

            this.getCategory()
            this.getPortfolios()
        }
    },
    mounted() {
        this.category.id = this.$route.params.id
        this.getCategory()
        this.getPortfolios()
    }
}
</script>

<style>
    .portfolios-by-category ul {
        list-style-type: none;
        padding: 0px;
    }

    .portfolios-by-category .load-more {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-top: 25px;
    }
</style>
