<template>
  <div class="singer">
    <list-view :data="singers"></list-view>
  </div>
</template>

<script>
  import {getSingers} from 'api/singer'
  import {ERR_OK} from 'common/js/config'
  import Singer from 'common/js/singer'
  import ListView from 'base/listview/listview'

  const pinyin = require('pinyin')
  const HOT_NAME = '热门'
  const HOT_SINGERS = 10

  export default {
    data () {
      return {
        singers: []
      }
    },
    created () {
      this._getSingers()
    },
    methods: {
      _getSingers () {
        getSingers().then((res) => {
          if (res.status == ERR_OK) {
            let s = res.data.artists
            s.map((item) => {
              let py = pinyin(item.name[0], {
                style: pinyin.STYLE_FIRST_LETTER
              })
              item.initial = py[0][0].toUpperCase()
            })
            this.singers = this._normalizeSinger(s)
            // console.log(this.singers)
          } else {
            console.log('get singers error')
          }
        })
      },
      _normalizeSinger (list) {
        let map = {
          hot: {
            title: HOT_NAME,
            items: []
          }
        }

        list.forEach((item, index) => {
          if (index < HOT_SINGERS) {
            map.hot.items.push(new Singer({
              id: item.id,
              name: item.name,
              avatar: item.img1v1Url
            }))
          }
          const key = item.initial
          if (!map[key]) {
            map[key] = {
              title: key,
              items: []
            }
          }
          map[key].items.push(new Singer({
              id: item.id,
              name: item.name,
              avatar: item.img1v1Url
            })
          )
        })
        // 使列表有序化
        let hot = []
        let ret = []
        for (let key in map) {
          let val = map[key]
          if (val.title.match(`[A-Z]`)) {
            ret.push(val)
          } else if (val.title === HOT_NAME) {
            hot.push(val)
          }
        }
        ret.sort((a,b) => {
          return a.title.charCodeAt(0) - b.title.charCodeAt(0)
        })
        return hot.concat(ret)
      }

    },
    components: {
      ListView
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  .singer
    position: fixed
    top: 88px
    bottom: 0
    width: 100%
</style>
