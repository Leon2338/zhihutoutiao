<template>
  <div class="articleList">
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh" :success-text="successText" success-duration="1500">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        :error.sync="error"
        error-text="请求失败，点击重新加载" 
        @load="onLoad"        
        >
        <!-- <van-cell v-for="(article,index) in list" :key="index" :title="article.title" /> -->
        <articleItem v-for="(article,index) in list" :key="index" :article="article"/>
        </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import {getArticle} from "@/api/article.js"
import articleItem from "@/components/articleItem"

export default {
    name:"articleList", 
    components:{
      articleItem
    },
    props:{
        channel:{
            type:Object,
            required:true,
            timestamp:null
        }
    },
    data() {
    return {
      list: [],
      loading: false,
      finished: false,
      error:false,
      refreshing:false,
      successText:"刷新成功"
    };
  },
  methods: {
    async onLoad() {
      try{
          //1，获取数据
          const {data}=await getArticle({
              channel_id:this.channel.id,
              timestamp:this.timestamp||Date.now
          })
          // console.log(data);
        //模拟列表数据获取失败
        // if(Math.random()>0.5){
        //   JSON.parse('FEFESFEAS')
        // }

          //2,将数据放到list中
          const {results} = data.data
          this.list.push(...results)
          console.log(this.list);

          //3,将loading改为false
          this.loading=false

          //4,获取下一页，通过请求到数据的pre_timestamp
          if(results.length){
              this.timestamp=data.data.pre_timestamp
          }else{
              this.finished=true
          }
      }catch(err){
          //设置错误重新加载
          this.error=true
          this.loading=false
      }
    },
    async onRefresh(){
      try{
          const {data}=await getArticle({
              channel_id:this.channel.id,
              timestamp:this.timestamp||Date.now
          })
          //2,将数据放到list中
          const {results} = data.data
          this.list.unshift(...results)
          this.successText="刷新成功"
          this.refreshing=false
      }catch(err){
          this.successText="刷新失败"
          this.refreshing=false
      }
    }
  },
}
</script>

<style scoped lang="less">
  .articleList{
    height: 79vh;
    overflow-y: auto;
  }
</style>