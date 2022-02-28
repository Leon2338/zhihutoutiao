<template>
  <div>
    <van-list
    v-model="loading"
    :finished="finished"
    finished-text="没有更多了"
    @load="onLoad"
    :error="error"
    error-text="加载失败，请点击再试!"
    >
    <van-cell v-for="(item,index) in list" :key="index" :title="item.title" />
    </van-list>
  </div>
</template>

<script>
import {getSearchResult} from "@/api/search"
export default {
    props:{
        searchText:{
            type:String,
            required:"true"
        }
    },
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      page:1,
      pageSize:20,
      error:false
    };
  },
  methods: {
    async onLoad() {
        try{
            //1,请求数据
            const {data} = await getSearchResult({
                page:this.page,
                per_page:this.pageSize,
                q:this.searchText
            })
            console.log(data);
            //2，将本次添加数组列表中
            const {results}= data.data
            this.list.push(...results)
            //3，将本次加载中的loading关闭
            this.loading=false
            //4，判断是否结束
            if(results.length){
                this.page++
            }else{
                this.finished=true
            }
        }catch (err){
            this.error=true
            this.loading=false
        }
     
  },
 }
}
</script>

<style>

</style>