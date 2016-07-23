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
        <button class="search-history-clean" v-touch:tap="clean">清除历史搜索</button>
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
        font-size: 14px;
        color: rgba(255, 255, 255, 0.7);
    }
    [data-dpr="2"] .search-history-items > li {
        font-size: 28px;
    }
    [data-dpr="2.5"] .search-history-items > li {
        font-size: 35px;
    }
    [data-dpr="2.75"] .search-history-items > li {
        font-size: 39px;
    }
    [data-dpr="3"] .search-history-items > li {
        font-size: 42px;
    }
    [data-dpr="4"] .search-history-items > li {
        font-size: 56px;
    }

    .search-history-title {
        font-size: 0;
        color: rgba(255, 255, 255, 0.5);
    }
    .search-history-title span {
        font-size: 14px;
    }
    [data-dpr="2"] .search-history-title span {
        font-size: 28px;
    }
    [data-dpr="2.5"] .search-history-title span {
        font-size: 35px;
    }
    [data-dpr="2.75"] .search-history-title span {
        font-size: 39px;
    }
    [data-dpr="3"] .search-history-title span {
        font-size: 42px;
    }
    [data-dpr="4"] .search-history-title span {
        font-size: 56px;
    }

    .search-history-clean {
        display: block;
        width: 100%;
        font-size: 14px;
        padding: 0.3125rem 0.23438rem;
        margin-top: 0.3125rem;
        line-height: 1;
        color: rgba(255, 255, 255, 0.7);
        text-align: center;
    }
    [data-dpr="2"] .search-history-clean {
        font-size: 28px;
    }
    [data-dpr="2.5"] .search-history-clean {
        font-size: 35px;
    }
    [data-dpr="2.75"] .search-history-clean {
        font-size: 39px;
    }
    [data-dpr="3"] .search-history-clean {
        font-size: 42px;
    }
    [data-dpr="4"] .search-history-clean {
        font-size: 56px;
    }
</style>
<script>
    export default {
        props: ['searchHistory']
        , methods: {
            postQuery (query) {
                this.$dispatch('formSubmit', query);
            }

            , clean () {
                console.log(1);
                this.searchHistory = [];
            }
        }
    };
</script>


