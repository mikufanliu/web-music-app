<template>
  <div class="rank">
    <scroll class="top-list">
      <ul>
        <div class="item" v-for="(item, index) in topList" :key="item.id">
          <div class="icon">
            <img v-lazy="item.coverImgUrl" height="80px" width="80px">
          </div>
          <ul class="song-list">
            <li class="song" v-for="(song, index) in item.top" :key="index">
              <span>{{index + 1}}</span>
              <span>{{song.name}}</span>
            </li>
          </ul>
        </div>
      </ul>
    </scroll>
  </div>

</template>

<script>
  import {TOP_LIST} from 'api/rank'
  import {getTop} from 'api/rank'
  import Scroll from 'base/scroll/scroll'
  import {ERR_OK} from 'common/js/config'

  export default {
    data () {
      return {
        topList: []
      }
    },
    created () {
      // this._getTop()
    },
    methods: {
      _getTop () {
        for (let i = 0; i < TOP_LIST.length; i++) {
          getTop(TOP_LIST[i]).then((res) => {
            if (res.status === ERR_OK) {
              let list = res.data.playlist
              list.top = res.data.playlist.tracks.slice(0, 3)
              this.topList.push(list)
              console.log(list)
            } else {
              console.log(`get Top error.`)
            }
          })
        }
      }
    },
    components: {
      Scroll
    }
  }
</script>
<style scoped lang="stylus">

</style>
