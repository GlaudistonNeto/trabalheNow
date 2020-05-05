<template>
    <div class="portfolio-by-id">
        <PageTitle icon="fa fa-file-o" :main="portfolio.name" :sub="portfolio.description" />
        <div class="portfolio-content" v-html="portfolio.content"></div>
    </div>
</template>

<script>
import 'highlightjs/styles/dracula.css'
import hljs from 'highlightjs/highlight.pack.js'
import { baseApiUrl } from '@/global'
import axios from 'axios'
import PageTitle from '../template/PageTitle'

export default {
    name: 'PortfolioById',
    components: { PageTitle },
    data: function() {
        return {
            portfolio: {}
        }
    },
    mounted() {
        const url = `${baseApiUrl}/portfolios/${this.$route.params.id}`
        axios.get(url).then(res => this.portfolio = res.data)
    },
    updated() {
        document.querySelectorAll('.portfolio-content pre.ql-syntax').forEach(e => {
            hljs.highlightBlock(e)
        })
    }
}
</script>

<style>
    .portfolio-content {
        background-color: #FFF;
        border-radius: 8px;
        padding: 25px;
    }

    .portfolio-content pre {
        padding: 20px;
        border-radius: 8px;
        font-size: 1.2rem;
        background-color: #1e1e1e;
        color: #FFF;
    }

    .portfolio-content img {
        max-width: 100%;
    }

    .portfolio-content :last-child {
        margin-bottom: 0px;
    }
</style>
