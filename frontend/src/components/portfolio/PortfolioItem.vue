<template>
    <div class="portfolio-item">
        <router-link :to="{ name: 'portfolioById', params: { id: portfolio.id } }">
            <div class="portfolio-item-image d-none d-sm-block">
                <img v-if="portfolio.imageUrl"
                    :src="portfolio.imageUrl"
                    height="150" width="150" alt="Portfolio">
                <img v-else
                    src="@/assets/portfolio.png"
                    height="150" width="150" alt="Portfolio">
            </div>
            <div class="portfolio-item-info">
                <h2>{{ portfolio.name }}</h2>
                <p>{{ portfolio.description }}</p>
                <span class="portfolio-item-author">
                    <strong>Autor: </strong>{{ portfolio.author }}
                </span>
            </div>
        </router-link>
    </div>
</template>

<script>
export default {
    name: 'PortfolioItem',
    props: ['portfolio']
}
</script>

<style>
    .portfolio-item {
        border-radius: 8px;
        margin-bottom: 20px;
        background-color: #FFF;
        padding: 20px;
        border: 1px solid rgba(0, 0, 0, 0.2);
        box-shadow: 0 1px 5px rgba(0, 0, 0, 0.15);
    }

    .portfolio-item a {
        display: flex;
        align-items: flex-start;
        text-decoration: none;
        color: #000;
    }

    .portfolio-item-info h2 {
        font-size: 1.7rem;
    }

    .portfolio-item-image {
        padding-right: 20px;
        margin-right: 20px;
        border-right: 1px solid #AAA;
    }

    .portfolio-item-image img {
        border-radius: 5px;
    }

    .portfolio-item-info {
        display: flex;
        align-self: stretch;
        flex-direction: column;
    }

    .portfolio-item-info p {
        flex: 1;
        color: #555;
        font-size: 1.1rem;
    }
</style>
