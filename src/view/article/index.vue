<template>
  <div class="article-container">
    <!-- 导航栏 -->
    <van-nav-bar
      class="page-nav-bar"
      title="黑马头条"
    >
    <van-icon name="arrow-left" slot="left" @click="onCancel"/>
    </van-nav-bar>
    <!-- /导航栏 -->

    <div class="main-wrap">
      <!-- 加载中 -->
      <div class="loading-wrap" v-if="loading">
        <van-loading
          color="#3296fa"
          vertical
        >加载中</van-loading>
      </div>
      <!-- /加载中 -->

      <!-- 加载完成-文章详情 -->
      <div class="article-detail" 
      v-else-if="article.content"
      >
        <!-- 文章标题 -->
        <h1 class="article-title">{{article.title}}</h1>
        <!-- /文章标题 -->

        <!-- 用户信息 -->
        <van-cell class="user-info" center :border="false">
          <van-image
            class="avatar"
            slot="icon"
            round
            fit="cover"
            :src="article.aut_photo"
          />
          <div slot="title" class="user-name">{{article.aut_name}}</div>
          <div slot="label" class="publish-date">{{article.pubdate | relativeTime}}</div>
           <!-- <van-button
            class="follow-btn"
            round
            size="small" 
            v-if="article.is_followed"
            @click="onfollow"
            :loading="followLoading"
          >已关注</van-button>
          <van-button
            class="follow-btn"
            type="info"
            color="#3296fa"
            round
            size="small"
            icon="plus"
            v-else
            @click="onfollow"
            :loading="followLoading"
          >关注</van-button> -->
          <!-- 当子组件需要用到父组件传入的数据且需要修改时建议使用v-model
            :isFollow="article.is_followed"
            @changeIsFollow="article.is_followed=$event"
           -->
          <followUser  :autId="article.aut_id" v-model="article.is_followed" />
        </van-cell>
        <!-- /用户信息 -->

        <!-- 文章内容 -->
        <div 
        class="article-content markdown-body" 
        v-html="article.content"
        ref="article"
        ></div>
        <van-divider>正文结束</van-divider>
        <!-- 文章评论列表 -->
          <commentList 
          :artId="article.art_id" 
          :list="commentList"
          @commentsTotal='totalComments=$event.total_count'/>
        <!-- /文章评论列表 -->
        <!-- 底部区域 -->
          <div class="article-bottom">
            <van-button
              class="comment-btn"
              type="default"
              round
              size="small"
              @click="onPost"
            >写评论</van-button>
            <van-icon
              name="comment-o"
              :info="totalComments"
              color="#777"
            />
            
            <collectArticle v-model="article.is_collected" :artId="article.art_id"/>
            <likeArticle v-model="article.attitude" :artId="article.art_id"/>
            <van-icon name="share" color="#777777"></van-icon>
          </div>
        <!-- /底部区域 -->
        <!-- 发布评论弹出层 -->
          <van-popup
            v-model="isPostShow"
            position="bottom"
          >
            <commentPost :target="article.art_id " @post-success='onPostSuccess'/>
          </van-popup>
      <!-- /发布评论弹出层 -->
      </div>
      <!-- /加载完成-文章详情 -->
      <!-- 加载失败：404 -->
      <div class="error-wrap" v-else-if="errState=404">
        <van-icon name="failure" />
        <p class="text">该资源不存在或已删除！</p>
      </div>
      <!-- /加载失败：404 -->

      <!-- 加载失败：其它未知错误（例如网络原因或服务端异常） -->
      <div class="error-wrap" v-else>
        <van-icon name="failure" />
        <p class="text">内容加载失败！</p>
        <van-button class="retry-btn" @click="getArticle">点击重试</van-button>
      </div>
      <!-- /加载失败：其它未知错误（例如网络原因或服务端异常） -->
    </div>

    
  </div>
</template>

<script>
import { ImagePreview } from 'vant';
import {getArticleById} from "@/api/article.js"
import followUser from "@/components/follow-user"
import collectArticle from "@/components/collect-article"
import likeArticle from "@/components/like-article"
import commentList from "./components/commentList.vue"
import commentPost from "./components/commentPost.vue"
export default {
  name: 'ArticleIndex',
  components: {
    followUser,
    collectArticle,
    likeArticle,
    commentList,
    commentPost
  },
  props: {
    articleId: {
      type: [Number, String,Object],
      required: true
    }
  },
  data () {
    return {
      article:{},
      errState:0,
      loading:true,
      totalComments:0,
      isPostShow:false,
      commentList:[] 
    }
  },
  computed: {},
  watch: {},
  created () {
      this.getArticle(this.articleId)
  },
  mounted () {},
  methods: {
      //获取文章详情
      async getArticle(articleId){

          try{
            this.loading=true
              const{data}=await  getArticleById(articleId)
              //测试网络不好的情况
              if(Math.random()>0.5){
                JSON.parse('123553555')
              }
              this.article=data.data
              console.log(this.article);
              //获取文章内的所有图片,并添加动作
              setTimeout(()=>{
                const article=this.$refs['article']
                const imgs = article.querySelectorAll('img')
                const images = []
                imgs.forEach((img,index) => {
                  images.push(img.src)
                  img.onclick=()=>{
                    ImagePreview({
                    images,
                    startPosition: index,
                  });
                  } 
                });
              },0)
              
              // console.log(this.article);
          }catch(err){
              if(err.response && err.response.status===404){
                this.errState=404
              }
              console.log(err.response.status)
          }
          //当获取到数据时停止加载数据
          this.loading=false
      },
      onCancel() {
        this.$router.back();
      },
      onPost(){
        this.isPostShow=true
      },
      onPostSuccess(data){
        this.isPostShow=false
        //将新发布的内容显示到列表顶部
        this.commentList.unshift(data.new_obj)
      }
      // async onfollow(){
      //   this.followLoading=true
      //   if(this.article.is_followed){
      //     await cancelFollow(this.article.aut_id)
      //   }else{
      //     await addFollow(this.article.aut_id)
      //   }
      //   this.article.is_followed=!this.article.is_followed
      //   this.followLoading=false
      // }
  }
}
</script>

<style scoped lang="less">
@import "github-markdown.css"; 
.article-container {
  .main-wrap {
    position: fixed;
    left: 0;
    right: 0;
    top: 92px;
    bottom: 88px;
    overflow-y: scroll;
    background-color: #fff;
  }
  .article-detail {
    .article-title {
      font-size: 40px;
      padding: 50px 32px;
      margin: 0;
      color: #3a3a3a;
    }

    .user-info {
      padding: 0 32px;
      .avatar {
        width: 70px;
        height: 70px;
        margin-right: 17px;
      }
      .van-cell__label {
        margin-top: 0;
      }
      .user-name {
        font-size: 24px;
        color: #3a3a3a;
      }
      .publish-date {
        font-size: 23px;
        color: #b7b7b7;
      }
      .follow-btn {
        width: 170px;
        height: 58px;
      }
    }

    .article-content {
      padding: 55px 32px;
      /deep/ p {
        text-align: justify;
      }
    }
  }

  .loading-wrap {
    padding: 200px 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
  }

  .error-wrap {
    padding: 200px 32px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    .van-icon {
      font-size: 122px;
      color: #b4b4b4;
    }
    .text {
      font-size: 30px;
      color: #666666;
      margin: 33px 0 46px;
    }
    .retry-btn {
      width: 280px;
      height: 70px;
      line-height: 70px;
      border: 1px solid #c3c3c3;
      font-size: 30px;
      color: #666666;
    }
  }

  .article-bottom {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
    box-sizing: border-box;
    height: 88px;
    border-top: 1px solid #d8d8d8;
    background-color: #fff;
    .comment-btn {
      width: 282px;
      height: 46px;
      border: 2px solid #eeeeee;
      font-size: 30px;
      line-height: 46px;
      color: #a7a7a7;
    }
    .van-icon {
      font-size: 40px;
      .van-info {
        font-size: 16px;
        background-color: #e22829;
      }
    }
  }
}
</style>
