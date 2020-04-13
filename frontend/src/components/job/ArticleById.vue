<template>
    <div class="job-by-id">
        <PageTitle icon="fa fa-file-o" :main="job.name" :sub="job.description" />
        <div class="job-content" v-html="job.content"></div>
    </div>
</template>

<script>
import 'highlightjs/styles/dracula.css'
import hljs from 'highlightjs/highlight.pack.js'
import { baseApiUrl } from '@/global'
import axios from 'axios'
import PageTitle from '../template/PageTitle'

export default {
    name: 'JobById',
    components: { PageTitle },
    data: function() {
        return {
            job: {}
        }
    },
    mounted() {
        const url = `${baseApiUrl}/jobs/${this.$route.params.id}`
        axios.get(url).then(res => this.job = res.data)
    },
    updated() {
        document.querySelectorAll('.job-content pre.ql-syntax').forEach(e => {
            hljs.highlightBlock(e)
        })
    }
}
</script>

<style>
    .job-content {
        background-color: #FFF;
        border-radius: 8px;
        padding: 25px;
    }

    .job-content pre {
        padding: 20px;
        border-radius: 8px;
        font-size: 1.2rem;
        background-color: #1e1e1e;
        color: #FFF;
    }

    .job-content img {
        max-width: 100%;
    }

    .job-content :last-child {
        margin-bottom: 0px;
    }
</style>
