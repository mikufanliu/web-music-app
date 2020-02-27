<template>
  <transition name="slide">
    <music-list :songs="songs" :bgImage="bgImage" :title="title"></music-list>
  </transition>
</template>

<script>
  import {mapGetters} from  'vuex'
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
      ...mapGetters([
        'singer'
      ])
    },
    created () {
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
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .slide-enter-active, .slide-leave-active
    transition all 0.3s

  .slide-enter, .slide-leave-to
    transform translate3d(100%, 0, 0)
</style>


