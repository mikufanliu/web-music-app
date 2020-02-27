<template>
  <transition name="slide">
<<<<<<< HEAD
    <music-list :songs="songs" :bgImage="bgImage" :title="title"></music-list>
=======
    <div class="singer-detail"></div>
>>>>>>> 53f2aef89b00742456a88215aa32c4bf6f8f49aa
  </transition>
</template>

<script>
  import {mapGetters} from  'vuex'
<<<<<<< HEAD
  import {getSingerDetail} from 'api/singer'
  import {ERR_OK} from 'common/js/config'
  import {createSong} from 'common/js/song'
  import MusicList from 'components/music-list/music-list'
  export default {
    data() {
      return {
        songs: []
      }
    },
    computed: {
      title() {
        return this.singer.name
      },
      bgImage() {
        return this.singer.avatar
      },
=======

  export default {
    computed: {
>>>>>>> 53f2aef89b00742456a88215aa32c4bf6f8f49aa
      ...mapGetters([
        'singer'
      ])
    },
    created () {
<<<<<<< HEAD
      this._getDetail()
    },
    methods: {
      _getDetail() {
        if (!this.singer.id) {
          this.$router.push('/singer')
          return
        }

        getSingerDetail(this.singer.id).then((res) => {
          if (res.status === ERR_OK) {
            this.songs = this._normalizeSongs(res.data.hotSongs)
            // console.log(this.songs)
          } else {
            console.log('get singer detail error.')
          }
        })
      },
      _normalizeSongs(list) {
        let ret = []

        list.forEach((item) => {
          let musicData = item
          if (musicData.id && musicData.al.id) {
            ret.push(createSong(musicData))
          }
        })
        return ret
      }
    },
    components: {
      MusicList
=======
      console.log(this.singer)
>>>>>>> 53f2aef89b00742456a88215aa32c4bf6f8f49aa
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

<<<<<<< HEAD
=======
  .singer-detail
    position fixed
    z-index 100
    top 0
    left 0
    right 0
    bottom 0
    background $color-background

>>>>>>> 53f2aef89b00742456a88215aa32c4bf6f8f49aa
  .slide-enter-active, .slide-leave-active
    transition all 0.3s

  .slide-enter, .slide-leave-to
    transform translate3d(100%, 0, 0)
</style>
<<<<<<< HEAD


=======
>>>>>>> 53f2aef89b00742456a88215aa32c4bf6f8f49aa
