<template>
    <section class="search-page-wrap" v-bind:class="{'search-page-wrap-show': searchOpen}">
        <div class="search-page">
            <div class="header">
                <form @submit.prevent action onsubmit="return false;">
                    <header>
                        <div class="header-search">
                            <button class="header-search-btn" type="button" v-touch:tap="formSubmit">
                                <i class="ico ico-search"></i>
                            </button>
                            <input type="search" required class="header-search-field" v-model="sValue"
                                   value="{{ sValue }}"
                                   autocomplete="off" placeholder="搜索音乐" @keyup.enter="formSubmit">
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
                    <li v-for="list in songLists" v-touch:tap="playMusic(list.id, $event)">
                        <i class="ico ico-music"></i>
                        <span class="play-list-song ">{{ list.name }}</span>
                        <span class="play-list-singer">{{ list.artists[0].name }}</span>
                    </li>

                    <section class="ani-playing-box" v-bind:style="{visibility: isSearching ? 'visible' : 'hidden'}">
                        <div class="ani-playing">
                            <span class="ani-playing-animation"><b><i></i><i></i><i></i><i></i></b></span>
                            <span class="ani-playing-txt">正在加载</span>
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
            };
        }
        , ready () {
            this.init();
        }
        , watch: {
            songLists () {
                this.scroll.refresh();
            }
        }
        , props: ['searchOpen']
        , methods: {
            toggleSearch: function () {
                (this.searchOpen = !this.searchOpen);
                !this.searchOpen && (this.sValue = '', this.songLists = []);
            }
            , formSubmit () {
                this.isSearching = true;
                this.currPage = 1;

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
                    _data = _data.result.songs || [];

                    this.songLists = _data;
                    this.isSearching = false;
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
                        if (!(Math.abs(scroll.y) + height + 10 >= scroll.scrollerH)) {
                            return;
                        }

                        if (_me.isSearching === true || !_me.searchOpen) return;

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
                            _data = (_data.result && _data.result.songs) || [];

                            _me.songLists = _me.songLists.concat(_data);
                            _me.isSearching = false;
                        }, function (res) {
                            _me.isSearching = false;
                        });
                    }
                });
            }
            , playMusic (id) {
                this.$dispatch('playMusic', id);
            }
            , clearSValue: function () {
                this.sValue = "";
            }
        }
    };
</script>