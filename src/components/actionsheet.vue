<template>
    <div class="actionsheet">
        <div class="mod-list-box">
            <h6 class="list-box-tit">播放队列<span
                    class="list-box-count js-playlist-num">({{ playingLists.length }}首)</span></h6>
            <div class="list-box-cont" id="js-playlist-scroll" style="overflow: scroll;">
                <ul class="mod-play-list js-playlist-box">
                    <li class="play-list-item-current" v-for="list in playingLists">
                        <div class="play-list-scroll" v-touch:tap="playMusic(list.id)">
                            <span class="play-list-song ">{{ list.title }}</span>
                            <b class="play-list-line">-</b>
                            <span class="play-list-singer">{{ list.artists }}</span>
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
<script>
    export default {
        props: ['listOpen', 'playingLists']

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

