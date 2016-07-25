<template>
    <div class="vue-app" v-bind:class="{'view-menu': menuOpen}">
        <div class='view' v-bind:class="{'actionsheet-up': listOpen}">
            <v-header :menu-open='menuOpen'></v-header>

            <div class="cover-box" v-bind:style="{backgroundImage: 'url(' + picUrl + ')'}">
                <!--<img v-bind:src="picUrl" alt="">-->
            </div>

            <section class="main-wrap">
                <div class="m-content-wrap">
                    <div class="m-circle-box VAM">
                        <div class="m-circle-box-in"
                             v-bind:class="[ isPlay ? 'animation-running animation-rotate' : 'animation-pause animation-rotate']">
                            <img v-bind:src="picUrl">
                        </div>
                    </div>
                    <time class="time">{{ showCurrentTime }}</time>
                    <h3 class="m-name">{{playingTitle}} - {{playingArtist}}</h3>
                </div>
            </section>

            <div class="m-control-box">
                <div class="m-control">
                    <button class="m-control-btn" v-touch:tap="modeHandler">
                        <i class="ico" :class="currModeName"></i>
                    </button>
                    <button class="m-control-btn" v-touch:tap="nextPlay(-1)">
                        <i class="ico ico-pre"></i>
                    </button>
                    <button class="m-control-btn" v-touch:tap="setPlay">
                        <i class="ico ico-play" :class="[isPlay? 'ico-pause': 'ico-play']"></i>
                    </button>
                    <button class="m-control-btn" v-touch:tap="nextPlay(1)">
                        <i class="ico ico-next"></i>
                    </button>
                    <button class="m-control-btn" v-touch:tap="toggleList">
                        <i class="ico ico-m-list"></i>
                    </button>
                </div>
            </div>

            <v-actionsheet :list-open.sync="listOpen" :playing-lists.sync="playingLists"></v-actionsheet>
        </div>

        <v-search :search-open.sync="searchOpen"></v-search>
        <v-menu :menu-open.sync="menuOpen"></v-menu>
    </div>
</template>
<style scoped>
    .vue-app {
        height: 100%;
    }
    @import "./assets/css/base.css";
    @import "./assets/css/style.css";
</style>
<script>
    import ctrl from './utils/ctrl';
    import Header from './components/header.vue';
    import Search from './components/search.vue';
    import Actionsheet from './components/actionsheet.vue';
    import Menu from './components/menu.vue';

    import Toast from './components/toast.vue';

    var toast = Toast.methods.init();

    export default {
        data () {
            return {
                audio: document.createElement('audio')
                , storage: window.localStorage
                , picUrl: ''
                , playingTitle: ''
                , playingArtist: ''
                , playingLists: []
                , songLists: []
                , sValue: ''
                , showCurrentTime: '00:00'
                , showDurationTime: '00:00'
                , isPlay: false
                , listOpen: false
                , searchOpen: false
                , menuOpen: false
                , touchEnabled: true
                , loading: false
                , isAnimationComplete: false
                , isSwipe: false
                , nextIndex: 0
                , currId: 0
                , nextId: 0
                , isSearching: false
                , mode: ['loop', 'repeat', 'rand']
                , currMode: 0
                , scroll: {}
            };
        }
        , ready: function () {
            setInterval(this.setProgress, 250);
            this.init();
            this.currMode = this.storage.getItem(ctrl.lsMode) || this.currMode;
        }
        , events: {
            playMusic (id) {
                this.playMusic(id);
            }
            , swipeDel (index) {
                this.swipeDel(index);
            }
            , toggleList () {
                this.toggleList();
            }
            , toggleMenu () {
                this.toggleMenu();
            }
            , toggleSearch () {
                this.toggleSearch();
            }
        }
        , methods: {
            setPlay () {
                if (this.audio.readyState == 0) {
                    this.isPlay = false;
                    return;
                }

                if (this.audio.paused) {
                    this.audio.play();
                    this.isPlay = true;
                } else {
                    this.audio.pause();
                    this.isPlay = false;
                }
            }
            , playMusic: function (id) {
                this.searchOpen = false;
                this.listOpen = false;
                this.touchEnabled = true;
                this.isPlay = false;

                this.$http.get(ctrl.url + '/api/music/', {
                    params: {
                        controller: 'detail'
                        , id: id
                    }
                }).then(function (res) {
                    var music = JSON.parse(res.data).songs[0] || {};

                    var id = music.id
                            , title = music.name
                            , url = music.mp3Url
                            , picUrl = (music.album && music.album.picUrl) || ''
                            , artists;

                    artists = (music.artists && music.artists[0].name) || '';

                    this.playingTitle = title;
                    this.playingArtist = artists;
                    this.picUrl = picUrl;

                    var _me = this, audio = _me.audio;

                    audio.src = url;

                    audio.addEventListener('canplay', function () {
                        audio.play();
                    }, false);

                    var data = {
                        id: id
                        , title: title
                        , url: url
                        , picUrl: picUrl
                        , artists: artists
                    }
                            , s = this.storage;

                    var list = ctrl.fillData(data);

                    this.playingLists = list;
                    this.currId = id;
                    s.setItem(ctrl.lsName, JSON.stringify(list));

                }, function (res) {
                });
            }
            , init () {
                var list = ctrl.fillData()
                        , s = this.storage
                        , len = list.length
                        , currId = s.getItem(ctrl.lsCurr) || ctrl.defaultMusic.id
                        , k = 0;

                for (var i = 0; i < len; i++) {
                    if (list[i].id == currId) {
                        k = i;
                    }
                }

                this.playingTitle = list[k].title;
                this.playingArtist = list[k].artists;
                this.picUrl = list[k].picUrl;
                this.audio.src = list[k].url;

                this.playingLists = list;
                s.setItem(ctrl.lsName, JSON.stringify(list));

                var _me = this;

                this.audio.addEventListener("ended", function () {
                    var id = _me.storage.getItem(ctrl.lsCurr);

                    var mode = _me.storage.getItem(ctrl.lsMode) || _me.currMode;

                    if(mode == 1) {
                        _me.setPlay();
                    } else if (mode == 2) {
                        _me.nextId = ctrl.shuffle(_me.playingLists).id;
                        _me.playMusic(_me.nextId);
                    } else {
                        _me.nextId = _me.getNext(id, 1).id;
                        _me.playMusic(_me.nextId);
                    }

                    _me.isPlay = false;
                });

                this.audio.addEventListener("pause", function () {
                    _me.isPlay = false;
                });

                this.audio.addEventListener("play", function () {
                    _me.isPlay = true;
                    _me.audio.autoplay = true;
                });

                this.audio.addEventListener("error", function (error) {
                    toast.init("歌曲加载失败").destroy();
                }, false);
            }
            , setProgress: function () {
                var audio = this.audio;
                var MM, SS, CT, DT,
                        currentTime = audio.currentTime,
                        duration = audio.duration;

                var _currentTime = (duration - currentTime) || 0;

                MM = parseInt((_currentTime) / 60);
                SS = parseInt((_currentTime) % 60);

                this.showCurrentTime = CT = (MM < 10 ? "0" + MM : MM) + ':' + (SS < 10 ? "0" + SS : SS);

                MM = parseInt(duration / 60);
                SS = parseInt(duration % 60);
                this.showDurationTime = DT = MM + ':' + (SS < 10 ? '0' + SS : SS);

                /*            var value = currentTime / duration * 100;
                 this.progress = value.toFixed(3);*/
            }

            , swipeDel: function (index) {

                console.log(index);
                var storage = this.storage
                        , lsName = ctrl.lsName
                        , tempList
                        , lists = JSON.parse(storage.getItem(lsName))

                        , changeList = lists.slice(0, index).concat(lists.slice(parseInt(index, 10) + 1));

                storage.setItem(lsName, JSON.stringify(changeList));

                tempList = JSON.parse(this.storage.getItem(lsName));
                this.playingLists = tempList;
            }
            , getNext: function (id, sequence) {
                var list = this.storage.getItem(ctrl.lsName)
                        , nextId
                        , index = 0;

                list = JSON.parse(list) || [];

                list.forEach(function (v, k) {
                    if (v.id == id) {
                        index = k;
                    }
                });

                index = sequence > 0 ? ++index : --index;

                index = (index == list.length) ? 0 : (index < 0 ? list.length - 1 : index);

                nextId = list[index].id;

                return {
                    id: nextId
                    , index: index
                }
            }
            , nextPlay: function (sequence) {
                var id = this.storage.getItem(ctrl.lsCurr);

                var next = this.getNext(id, sequence);

                this.nextIndex = next.index;
                this.nextId = next.id;
                this.playMusic(next.id);
            }
            , modeHandler: function () {
                this.currMode = this.storage.getItem(ctrl.lsMode) || this.currMode;
                this.currMode++;
                this.currMode >= 3 && (this.currMode = 0);

                var modes = this.mode
                        , mode
                        , i = this.currMode
                        , len = modes.length;


                mode = modes[i];

                this.audio.loop = false;

                switch (mode) {
                    case "repeat":
                        this.audio.loop = true;
                        break;

                    case "rand":
                        break;

                    default:
                        break;
                }
            }
            , toggleList () {
                this.listOpen = !this.listOpen;
                this.touchEnabled = this.listOpen ? false : true;
            }
            , toggleMenu () {
                this.touchEnabled && (this.menuOpen = !this.menuOpen);
            }
            , toggleSearch () {
                window.scroll(0, 0);
                this.touchEnabled && (this.searchOpen = !this.searchOpen);
                !this.searchOpen && (this.sValue = '', this.songLists = []);
            }
        }
        , computed: {
            currModeName: function () {
                return "ico-" + this.mode[this.currMode];
            }
        }
        , components: {
            vHeader: Header
            , vSearch: Search
            , vActionsheet: Actionsheet
            , vMenu: Menu
        }
        , watch: {
            currId: function (val) {
                this.storage.setItem(ctrl.lsCurr, val);
            }
            , currMode: function (val) {
                this.storage.setItem(ctrl.lsMode, val);
            }
        }
    };
</script>