<template>
    <div class="jobs-by-category">
        <PageTitle icon="fa fa-folder-o"
            :main="category.name" sub="Categoria" />
        <ul>
            <li v-for="job in jobs" :key="job.id">
                <JobItem :job="job" />
            </li>
        </ul>
        <div class="load-more">
            <button v-if="loadMore"
                class="btn btn-lg btn-outline-primary"
                @click="jobs">Carregar Mais Trabalhos</button>
        </div>
    </div>
</template>

<script>
import { baseApiUrl } from '@/global'
import axios from 'axios'
import PageTitle from '../template/PageTitle'
import JobItem from './JobItem'

export default {
    name: 'JobsByCategory',
    components: { PageTitle, JobItem },
    data: function() {
        return {
            category: {},
            jobs: [],
            page: 1,
            loadMore: true
        }
    },
    methods: {
        getCategory() {
            const url = `${baseApiUrl}/categories/${this.category.id}`
            axios(url).then(res => this.category = res.data)
        },
        getJobs() {
            const url = `${baseApiUrl}/categories/${this.category.id}/jobs?page=${this.page}`
            axios(url).then(res => {
                this.jobs = this.jobs.concat(res.data)
                this.page++

                if(res.data.length === 0) this.loadMore = false
            })
        }
    },
    watch: {
        $route(to) {
            this.category.id = to.params.id
            this.jobs = []
            this.page = 1
            this.loadMore = true

            this.getCategory()
            this.getJobs()
        }
    },
    mounted() {
        this.category.id = this.$route.params.id
        this.getCategory()
        this.getJobs()
    }
}
</script>

<style>
    .jobs-by-category ul {
        list-style-type: none;
        padding: 0px;
    }

    .jobs-by-category .load-more {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-top: 25px;
    }
</style>
