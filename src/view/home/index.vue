<template>
  <div class="home-container"> 
    <van-nav-bar class="page-nav-bar" fixed>
      <!-- 搜索按钮 -->
         <van-button 
         size="small" 
         round 
         slot="title" 
         icon="search" 
         class="search-btn"
         to="/search">
           搜索
         </van-button>
    </van-nav-bar>
    <!-- 调用tab -->
      <van-tabs v-model="active" swipeable animated class="channel-tabs">
        <van-tab v-for="channel in channels" :key="channel.id" :title="channel.name">
          <articleList :channel="channel"/>
        </van-tab>
        <div slot="nav-right" class="ham-btn" @click="showChannelsEdit()">
          <i  class="iconfont icon-gengduo"></i>
        </div>
      </van-tabs>
      <!-- 编辑弹出层 -->
      <van-popup 
        v-model="show"
        position="bottom"
        closeable
        close-icon-position="top-left" 
        :style="{ height: '100%' }"
        >
      <channelEdit :channels="channels" :active="active" @changeActive="changeActive"/>
      
      </van-popup>
      
  </div>
</template>

<script>
import {getChannels} from "@/api/user.js"
import articleList from "./components/article-list"
//引入频道编辑页面
import channelEdit from "./components/channel-edit"
import {mapState} from "vuex"
import {getItem} from "@/util/storage"
export default {
name:'home',
components:{
  articleList,
  channelEdit
},
computed:{
  ...mapState(['user'])
}
,
data() {
    return {
      active: 0,
      channels:[],
      show: false,
    };
  },
async created() {
  let channels = []
  if(this.user){
    //已登陆
    const data = await getChannels()
    channels = data.data.data.channels
  }else{
    //未登录
    const localChannels = getItem('TOUTIAO_CHANNELS')
    if(localChannels){
      channels=localChannels
    }else{
      //没有本地存储，
      const data = await getChannels()
      channels = data.data.data.channels
    }
  }
  this.channels=channels
},
methods: {
    showChannelsEdit() {
      this.show = true;
    },
    changeActive(index,isshow){
      // console.log(index);
      // 将active即页面激活的页面改变
      this.show = isshow;
      this.active=index;

    }
  },
}
</script>

<style scoped lang="less">
  .home-container{
    padding-bottom: 100px;
    /deep/ .van-nav-bar__title{
      max-width: unset;
    }
    .search-btn{
      width: 555px;
      height: 64px;
      background-color: #5babfb;
      border:none;

    }
    .van-button__content{
      color: white;
      font-size: 28px;
    }
    /deep/ .channel-tabs{
      .van-tabs__wrap{
        height: 82px;
        position: fixed;
        top: 92px;
        z-index: 1;
        left: 0px;
        right: 0px; 
      }
      .van-tabs__content{
        padding-top: 180px;
      }
      .van-tab{
        border-right:1px solid #edeff3;
        min-width: 200px;
        font-size: 30px;
        color:#777;
        position: relative;
      }
      .van-tab--active{
        color:#333;
      }
      .van-tabs__line{
        width: 31px !important;
        height: 6px;
        background-color: #3296fa;
      }
      .van-tab__nav{
        padding-bottom:0px
      }
      .ham-btn{
        position: fixed;
        right: 0;
        width: 66px;
        display: flex;
        height: 82px;
        justify-content: center;
        align-items: center; 
        background-color: #fff;
        opacity: 0.9;
        i.iconfont{
          font-size: 33px;
        }
        &:before{
          content:"";
          position: absolute;
          left:0;
          width: 1px;
          height: 100%;
          background-size: content;
          background-image: url(~@/assets/gradient-gray-line.png);
        }
      }
    }
  }
</style>