<template>
    <section class="search-page-wrap" v-bind:class="{'search-page-wrap-show': searchOpen}">
        <div class="search-page">
            <div class="header">
                <form @submit.prevent action onsubmit="return false;">
                    <header>
                        <div class="header-search">
                            <button class="header-search-btn" type="button" v-touch:tap="formSubmit(null)">
                                <i class="ico ico-search"></i>
                            </button>
                            <input type="search" required class="header-search-field" v-model="sValue"
                                   value="{{ sValue }}"
                                   autocomplete="off" placeholder="搜索音乐" @keyup.enter="formSubmit(null)">
                            <button class="header-search-clear" type="button" v-touch:tap="clearSValue">
                                <i class="ico ico-close"></i>
                            </button>
                        </div>
                        <button class="header-btn-right" type="button" v-touch:tap="toggleSearch">取消</button>
                    </header>
                </form>
            </div>

            <div id="js-serachlist-scroll" class="search-page-scroll">
                <ul class="search-items">
                    <search-history :search-history.sync="searchHistory" v-show="!songLists.length && !isSearching && searchHistory.length"></search-history>
                    <li v-for="list in songLists" v-touch:tap="playMusic(list.id, $event)">
                        <i class="ico ico-music"></i>
                        <span class="play-list-song ">{{ list.name }}</span>
                        <span class="play-list-singer">{{ list.artists[0].name }}</span>
                    </li>

                    <section v-if="!isOver" class="ani-playing-box" v-bind:style="{visibility: isSearching ? 'visible' : 'hidden'}">
                        <div class="ani-playing">
                            <span class="ani-playing-animation"><b><i></i><i></i><i></i><i></i></b></span>
                            <span class="ani-playing-txt">正在加载</span>
                        </div>
                    </section>
                    <section v-else class="ani-playing-box">
                        <div class="ani-playing">
                            <!--<span class="ani-playing-animation"><b><i></i><i></i><i></i><i></i></b></span>-->
                            <span class="ani-playing-txt">数据没了</span>
                        </div>
                    </section>
                </ul>
            </div>
        </div>
    </section>
</template>

<script>
    import scroll from 'iScroll-4.2.5';
    var IScroll = scroll.iScroll;

    import ctrl from '../utils/ctrl';
    import SearchHistory from './search.history';

    export default {
        data () {
            return {
                songLists: []
                , offset: 40
                , pages: 0
                , currPage: 1
                , scroll: null
                , isSearching: false
                , sValue: ''
                , songCount: 0
                , isOver: false
                , searchHistory: []
            };
        }
        , ready () {
            this.init();
            this.searchHistory = JSON.parse(window.localStorage.getItem(ctrl.lsSHis)) || []
        }
        , watch: {
            songLists () {
                this.scroll.refresh();
            }
            , searchHistory (val) {
                window.localStorage.setItem(ctrl.lsSHis, JSON.stringify(val));
            }
        }
        , computed () {

        }
        , props: ['searchOpen']
        , methods: {
            toggleSearch: function () {
                (this.searchOpen = !this.searchOpen);
                !this.searchOpen && (this.sValue = '', this.songLists = [], this.isOver = false);
            }
            , formSubmit (query) {
                this.isSearching = true;
                this.currPage = 1;
                this.songCount = 0;
                this.isOver = false;
                query ? (this.sValue = query) : this.pushSearchHistory(this.sValue);

                this.$http.get(ctrl.url + '/api/music/', {
                    params: {
                        controller: 'search'
                        , s: this.sValue
                    }
                    , before: function () {
                        this.songLists = [];
                    }
                }).then(function (res) {
                    res = res || {};

                    var _data = JSON.parse(res.data) || {};
                    this.songCount = _data.result.songCount;

                    _data = _data.result.songs || [];

                    this.songLists = _data;
                    this.isSearching = false;

                    this.songCount == this.songLists.length && (this.isOver = true);
                }, function (res) {
                    console.log(res, 'error');
                    this.isSearching = false;
                });
            }
            , init () {
                var _me = this;
                var scrollEle = document.getElementById('js-serachlist-scroll');
                var height = scrollEle.offsetHeight;

                _me.scroll = new IScroll(scrollEle, {
                    vScrollbar: false
//                    , checkDOMChanges: true
                    , onRefresh: function () {
                    }
                    , onScrollEnd: function () {
                        var scroll = _me.scroll;

//                        console.log(scroll.y + ':' + height + ':' + scroll.scrollerH);
                        if (!(Math.abs(scroll.y) + height + 10 >= scroll.scrollerH) || scroll.y == 0) {
                            return;
                        }

                        if (_me.isSearching === true || !_me.searchOpen) return;

                        if (_me.songCount == _me.songLists.length) {
                            _me.isOver = true;
                            return;
                        }

                        var p = _me.currPage++;
                        _me.pages = p * _me.offset;

                        _me.isSearching = true;

                        _me.$http.get(ctrl.url + '/api/music/', {
                            params: {
                                controller: 'search'
                                , s: _me.sValue
                                , p: _me.pages
                            }
                        }).then(function (res) {
                            res = res || {};

                            var _data = JSON.parse(res.data) || {};
                            _me.songCount = _data.result && _data.result.songCount;

                            _data = (_data.result && _data.result.songs) || [];

                            _me.songLists = _me.songLists.concat(_data);
                            _me.isSearching = false;
                            _me.songCount == _me.songLists.length && (_me.isOver = true);
                        }, function (res) {
                            _me.isSearching = false;
                        });
                    }
                });
            }
            , playMusic (id) {
                this.$dispatch('playMusic', id);
            }
            , clearSValue () {
                this.sValue = "";
            }
            , pushSearchHistory (query) {
                var his = this.searchHistory;
                var len = his.length;

                if (query.trim()) {
                    len >= 20 && his.shift();
                    his.unshift(query);
                }
            }
        }
        , events: {
            formSubmit (query) {
                this.formSubmit(query);
            }
        }
        , components: {
            searchHistory: SearchHistory
        }
    };
</script>