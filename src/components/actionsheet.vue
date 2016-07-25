<template>
    <div class="actionsheet">
        <div class="mod-list-box">
            <h6 class="list-box-tit">播放队列<span
                    class="list-box-count js-playlist-num">({{ playingLists.length }}首)</span></h6>
            <div class="list-box-cont" id="js-playlist-scroll" style="overflow: scroll;">
                <ul class="mod-play-list js-playlist-box">
                    <li v-for="list in playingLists" v-bind:class="{'play-list-item-current': currentListId == list.id}">
                        <div class="play-list-scroll" v-touch:tap="playMusic(list.id)">
                            <span class="play-list-song ">{{ list.title }}</span>
                            <b class="play-list-line">-</b>
                            <span class="play-list-singer">{{ list.artists }}</span>
                            <span class="ani-playing-animation"><b><i></i><i></i><i></i><i></i></b></span>
                        </div>

                        <button class="list-item-del" v-touch:tap="swipeDel($index)"><i class="ico ico-del"></i>
                        </button>
                    </li>
                </ul>
            </div>
            <a class="list-box-close js-close-playlist" v-touch:tap="toggleList" href="javascript:;">关闭</a>
        </div>
    </div>
</template>
<style scoped>
    .play-list-item-current .ani-playing-animation {
        display: inline-block;
    }
    .ani-playing-animation {
        display: none;
        margin-left: 0.15625rem;
    }
    .play-list-song, .play-list-singer {
        max-width: 37%;
    }
</style>
<script>
    import ctrl from '../utils/ctrl';
    import scroll from 'iScroll-4.2.5';

    var IScroll = scroll.iScroll;


    export default {
        props: ['listOpen', 'playingLists', 'currentListId']

        , ready () {
            new IScroll("js-playlist-scroll", {
                vScrollbar: false,
                checkDOMChanges: true
            });
        }

        , methods: {
            playMusic (id) {
                this.$dispatch('playMusic', id);
            }
            , swipeDel (index) {
                this.$dispatch('swipeDel', index);
            }
            , toggleList () {
                this.$dispatch('toggleList');
            }
        }
    };
</script>

