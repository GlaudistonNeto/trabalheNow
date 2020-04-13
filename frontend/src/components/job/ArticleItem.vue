<template>
    <div class="job-item">
        <router-link :to="{ name: 'jobById', params: { id: job.id } }">
            <div class="job-item-image d-none d-sm-block">
                <img v-if="job.imageUrl"
                    :src="job.imageUrl"
                    height="150" width="150" alt="job">
                <img v-else
                    src="@/assets/job.png"
                    height="150" width="150" alt="job">
            </div>
            <div class="job-item-info">
                <h2>{{ job.name }}</h2>
                <p>{{ job.description }}</p>
                <span class="job-item-author">
                    <strong>Autor: </strong>{{ job.author }}
                </span>
            </div>
        </router-link>
    </div>
</template>

<script>
export default {
    name: 'JobItem',
    props: ['job']
}
</script>

<style>
    .job-item {
        border-radius: 8px;
        margin-bottom: 20px;
        background-color: #FFF;
        padding: 20px;
        border: 1px solid rgba(0, 0, 0, 0.2);
        box-shadow: 0 1px 5px rgba(0, 0, 0, 0.15);
    }

    .job-item a {
        display: flex;
        align-items: flex-start;
        text-decoration: none;
        color: #000;
    }

    .job-item-info h2 {
        font-size: 1.7rem;
    }

    .job-item-image {
        padding-right: 20px;
        margin-right: 20px;
        border-right: 1px solid #AAA;
    }

    .job-item-image img {
        border-radius: 5px;
    }

    .job-item-info {
        display: flex;
        align-self: stretch;
        flex-direction: column;
    }

    .job-item-info p {
        flex: 1;
        color: #555;
        font-size: 1.1rem;
    }
</style>
