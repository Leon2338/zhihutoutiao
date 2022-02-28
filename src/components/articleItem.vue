<template>
  <div>
      <van-cell class="articleItem" :to="'/article/'+article.art_id">
        <div slot="title" class="title van-multi-ellipsis--l2" >{{article.title}}</div>
        <div slot="label">
          <div class="cover-wrap " 
          v-if="article.cover.type==3" >
            <div v-for="(cover , index) in article.cover.images" 
            :key="index" 
            class="cover-item">
                <van-image
                  :src="cover"
                  class="cover-item-img"
                  fit="cover"
                />
            </div>
          </div>
          <div class="text-wrap">
            <span >{{article.aut_name}}</span>
            <span >{{article.comm_count}}评论</span>
            <span >{{article.pubdate | relativeTime}}</span>
          </div>
        </div>
        <van-image
            class="right-img"
            v-if="article.cover.type==1"
            slot="default"
            fit="cover"
            :src="article.cover.images[0]"
          />
      </van-cell>
  </div>
</template>

<script>
export default {
  name:"articleItem",
  props:{
    article:{
      type:Object,
      required:true
    }
  }
}
</script>

<style scoped lang="less">
.articleItem{
  .title{
    font-size: 32px;
    color: #585858;
  }
  .van-cell__value{
    flex: unset;
    width: 232px;
    height: 146px;
    padding-right: 25px;
  }
  .right-img{
    width: 232px;
    height: 146px;
  }
  .text-wrap span{
    font-size: 22px;
    color:#b4b4b4;
    margin-left:25px;    
  }
  .cover-wrap{
    padding:30px 0;
    display: flex;
    .cover-item{
      flex:1;
      height:146px;
      &:not(:last-child){
        padding-right:4px;
      }
      .cover-item-img{
        width: 100%;
        height: 146px;
      }
    }
  }
}
</style>