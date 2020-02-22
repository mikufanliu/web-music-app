<template>
    <div class="recommend">
      <scroll ref="scroll" class="recommend-content">
        <div>
          <div v-if="banner.length" class="slider-wrapper">
            <slider>
              <div v-for="item in banner" :key="item.id">
                <img @load="loadImage" :src="item.imageUrl" >
              </div>
            </slider>
          </div>
          <div class="recommend-list">
            <h1 class="list-title">热门歌单推荐</h1>
            <ul>
              <li v-for="item in discList" :key="item.id" class="item">
                <div class="icon">
                  <img width="60" height="60" v-lazy="item.picUrl">
                </div>
                <div class="text">
                  <h2 class="name">{{item.name}}</h2>
                  <p class="desk">播放数：{{item.playCount}}</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div class="loading-container" v-show="!discList.length">
          <loading></loading>
        </div>
      </scroll>
    </div>
</template>

<script>
  import Loading from 'base/loading/loading'
  import Scroll from 'base/scroll/scroll'
  import Slider from 'base/slider/slider'
  import {getBanner, getRecommendList} from 'api/recommend'
  import {ERR_OK} from 'common/js/config'

  export default {
    data () {
      return {
        banner: [],
        discList: []
      }
    },
    created () {
      this._getRecommend()
      this._getRecommendList()
    },
    methods: {
      _getRecommend () {
        getBanner().then((res) => {
          if (res.status === ERR_OK) {
            let list = res.data.banners
            this.banner = list.splice(4)
            // console.log(res.data)
          } else {
            console.log('get banner error.')
          }
        })
      },
      _getRecommendList () {
        getRecommendList().then((res) => {
          if(res.status === ERR_OK) {
            this.discList = res.data.result
            // console.log(this.discList)
          }
        })
      },
      loadImage() {
        if(!this.checkLoaded){
          this.$refs.scroll.refresh()
          this.checkLoaded = true
        }
      }
    },
    components: {
      Slider,
      Scroll,
      Loading
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .recommend
    position: fixed
    width: 100%
    top: 88px
    bottom: 0
    .recommend-content
      height: 100%
      overflow: hidden
      .slider-wrapper
        position: relative
        width: 100%
        overflow: hidden
      .recommend-list
        .list-title
          height: 65px
          line-height: 65px
          text-align: center
          font-size: $font-size-medium
          color: $color-theme
        .item
          display: flex
          box-sizing: border-box
          align-items: center
          padding: 0 20px 20px 20px
          .icon
            flex: 0 0 60px
            width: 60px
            padding-right: 20px
          .text
            display: flex
            flex-direction: column
            justify-content: center
            flex: 1
            line-height: 20px
            overflow: hidden
            font-size: $font-size-medium
            .name
              margin-bottom: 10px
              color: $color-text
            .desc
              color: $color-text-d
      .loading-container
        position: absolute
        width: 100%
        top: 50%
        transform: translateY(-50%)
</style>
