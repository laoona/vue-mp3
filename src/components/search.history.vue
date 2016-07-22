<template>
    <div class="search-history-box">
        <div class="search-history-title">
            <span>搜索历史</span>
        </div>
        <ul class="search-history-items clr">
            <li v-for="his in searchHistory" v-touch:tap="postQuery(his)" track-by="$index">
                    {{ his }}
            </li>
        </ul>
    </div>
</template>
<style>
    .search-history-box {
        padding: 0.15625rem 0.4375rem;
    }
    .search-history-items > li {
        float: left;
        border: solid 1px #999;
        margin-right: 0.23438rem;
        margin-top: 0.23438rem;
        padding: 0.03125rem 0.09375rem;
        border-radius: 0.03125rem;
        font-size: 13px;
        color: rgba(255, 255, 255, 0.7);
    }
    [data-dpr="2"] .search-history-items > li {
        font-size: 26px;
    }
    [data-dpr="2.5"] .search-history-items > li {
        font-size: 33px;
    }
    [data-dpr="2.75"] .search-history-items > li {
        font-size: 36px;
    }
    [data-dpr="3"] .search-history-items > li {
        font-size: 39px;
    }
    [data-dpr="4"] .search-history-items > li {
        font-size: 52px;
    }

    .search-history-title {
        font-size: 0;
        color: rgba(255, 255, 255, 0.5);
    }
    .search-history-title span {
        font-size: 13px;
    }
    [data-dpr="2"] .search-history-title span {
        font-size: 26px;
    }
    [data-dpr="2.5"] .search-history-title span {
        font-size: 33px;
    }
    [data-dpr="2.75"] .search-history-title span {
        font-size: 36px;
    }
    [data-dpr="3"] .search-history-title span {
        font-size: 39px;
    }
    [data-dpr="4"] .search-history-title span {
        font-size: 52px;
    }
</style>
<script>
    export default {
        props: ['searchHistory']
        , methods: {
            postQuery (query) {
                this.$dispatch('formSubmit', query);
            }
        }
    };
</script>


