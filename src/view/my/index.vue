<template>
  <div class="my-container">
    <div class="header not-login" v-if="!user">
      <div class="login-btn"> 
        <img class="mobile-img" src="~@/assets/mobile.png" @click="$router.push('/login')" alt="">
        <span class="text">登录/注册</span>
      </div>
    </div>
    <div class="header user-info" v-else> 
      <div class="base-info">
        <div class="left">
          <van-image
            class="avatar"
            round
            fit="cover"
            :src="userInfo.photo"
          />
          <span class="text">{{userInfo.name}}</span>
        </div>
        <div class="right">
          <van-button 
          round 
          size="mini"
          to="/profile">编辑资料</van-button>
        </div>
      </div>
      <div class="data-stats">
        <div class="data-item">
          <span class="count">头条</span>
          <span class="text">{{userInfo.art_count}}</span>
        </div>
        <div class="data-item">
          <span class="count">关注</span>
          <span class="text">{{userInfo.follow_count}}</span>
        </div>
        <div class="data-item">
          <span class="count">粉丝</span>
          <span class="text">{{userInfo.fans_count}}</span>
        </div>
        <div class="data-item">
          <span class="count">获赞</span>
          <span class="text">{{userInfo.like_count}}</span>
        </div>
      </div>
    </div>
    <div class="grid-nav" >
      <van-grid :column-num="2" clickable>
        <van-grid-item  class="grid-item" >
          <i slot="icon"  class="iconfont icon-shoucang image collection"></i>
          <span slot="text"  class="text ">收藏</span>
        </van-grid-item>
        <van-grid-item  class="grid-item" >
          <i slot="icon" class="iconfont icon-lishi image history"></i>
          <span slot="text" class="text ">历史</span>
        </van-grid-item>
      </van-grid>
    </div>
    <!-- 消息通知 小智同学 退出登录 -->
    <div class="cell-nav">
      <van-cell-group>
        <van-cell title="消息通知" is-link/>
        <van-cell title="小智同学" is-link/>
        <van-cell title="退出登录" class="logout-cell" v-if="user" clickable @click="logout"/>
      </van-cell-group>
    </div>
  </div>
  
</template>

<script>
import {mapState} from "vuex"
//获取用户信息的方法
import {getUserInfo} from "@/api/user.js"
export default {
  data(){
    return {
      userInfo:{}
    }
  },
  computed:{
    ...mapState(["user"])
  },
  methods: {
    logout(){
      this.$dialog.confirm({
        title: '您确认想要退出么?',
        
      })
        .then(() => {
          // on confirm
          this.$store.commit("setUser",null)
        })
        .catch(() => {
          // on cancel
      });
      
    }
  },
  //获取用户个人信息
  async created() {
    try{
      const Info = await getUserInfo()
      this.userInfo = Info.data.data
      console.log(this.userInfo);
    }catch (err){
      this.$toast("获取用户信息失败");
    }
  },
}
</script>

<style lang="less">
  .my-container{
    .header{
      height: 361px;
      background:url("~@/assets/banner.png");
      background-size: cover;
    }
  .not-login{
    display: flex;
    justify-content: center;
    align-items: center;
    .login-btn{
      display:flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .mobile-img{
        width: 132px;
        height: 132px;
        margin-bottom: 15px;
      }
      .text{
        font-size:28px; 
        color: white;
      }
    }
  }
  .user-info{
    .base-info{
      height: 231px;
      padding: 76px 32px 23px;
      box-sizing: border-box;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .left{
        display: flex;
        align-items: center;
        .avatar{
          border: #fff 4px solid;
          width: 132px;
          height: 132px;
          margin-right: 23px;
        }
        .text{
          font-size: 30px;
          color:#fff;
          
        }
      }
    }
    .data-stats{
      display: flex;
      .data-item{
        display: flex;
        flex:1;
        height: 130px;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        color: white;
        .count{
          font-size: 36px;
        }
        .text{
          font-size: 23px;
        }
      }
    }
  }
  .grid-nav{
    .grid-item{
      height: 135px;
      .image{
        font-size: 45px;
      }
      .text{
        font-size: 28px;
      }
      .collection{
        color:#eb5253
      }
      .history{
        color:#ff9d1d ;
      }
    }
  }
  .cell-nav{
    .logout-cell{
      color:#d86262;
      text-align: center;
      margin-top: 9px;
    }
  }
  }
</style>