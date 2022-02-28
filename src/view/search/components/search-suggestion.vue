<template>
  <div class="search-suggestion">
      <van-cell 
      icon="search" 
      v-for="(text,index) in suggestions" 
      :key="index"
      @click="$emit('search',text)">
      <div slot="title" v-html="hignLight(text)"></div>
      </van-cell>
  </div>
</template>

<script>
import {getSuggestion} from "@/api/search"
import { debounce } from "lodash"
export default {
    name:"searchSuggestion",
    data(){
        return {
            suggestions:[], //返回的搜索建议
            timer:null
        }
    },
    props:{
        searchText:{
            type:String,
            required:"true"
        }
    },
    watch:{
        searchText:{
            //监听搜索框内的变化
            handler:debounce(function(value){
                this.loadsus(value)
            },200),
            immediate:true   //在监听数据后立即执行一次事件 
        }
    },
    methods: {
        //从后台获得数据函数
        async loadsus(q){
            try{
                let {data}=await getSuggestion(q)
                this.suggestions=data.data.options
                console.log(this.suggestions);
            }catch(err){
                console.log(err);
            }
        },
        //处理高亮字符串
        hignLight(text){
            //避免没有推荐的情况出现
            try{
                const hignLightStr = `<span class="active">${this.searchText}</span>`
                // console.log(text);
                const reg = new RegExp(this.searchText,'gi')
                return  text.replace(reg,hignLightStr)
            }catch(err){

            }
        }
    },
}
</script>

<style scoped lang="less">
    .search-suggestion{
        /deep/ span.active{
            color:#3296fa;
        }
    }
</style>