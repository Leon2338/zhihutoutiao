<template>
  <div class="layout-container">
      <router-view></router-view>
      <van-tabbar class="layout-tabbar" v-model="active" route>
        <van-tabbar-item to="/">
            <i slot="icon" class="iconfont icon-shouye"></i>
            <span>首页</span> 
        </van-tabbar-item>
        <van-tabbar-item to="/qa">
            <i slot="icon" class="iconfont icon-wenda"></i>
            <span>问答</span> 
        </van-tabbar-item>
        <van-tabbar-item  to="/video">
            <i slot="icon" class="iconfont icon-shipin"></i>
            <span>视频</span> 
        </van-tabbar-item>
        <van-tabbar-item to="/my">
            <i slot="icon" class="iconfont icon-wode"></i>
            <span>{{$store.state.user?"我的":"未登录"}}</span> 
        </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: 0,
    };
  },
};
</script>

<style lang="less">
.layout-container{
  .layout-tabbar{
    i{
      font-size: 40px;
    }
  }
}
</style>