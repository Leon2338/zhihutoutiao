<template>
  <div>
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
        >
        <commentItem
            v-for="(item,index) in list" 
            :key="index" 
            :data="item"
        />
    </van-list>
  </div>
</template>

<script>
import {getComments} from "@/api/comment.js"
import commentItem from "./commentItem.vue"
export default {
    name:'commentsList',
    components:{
        commentItem
    },
    props:{
        artId:{
            type:[Number,String,Object],
            required:true
        },
        list:{
            type:Array,
            default:()=>[]
        }
    },
  data() {
    return {
    //   list: [],
      loading: false,
      finished: false,
      offset:null, //获取下一页的标记,
      limit:10
    };
  },
  created(){
      this.onLoad()
  },
  methods: {
    async onLoad() {
      
       try{
           //1,获取数据
           const{data}=await getComments({
                type:'a',
                source:this.artId,
                offset:this.offset,
                limit:this.limit
            })
            //2，将数据放入list之中
            
            const {results} =data.data
            this.list.push(...results)
            //将评论总数传递到文章详情页面
            this.$emit('commentsTotal',data.data)
            //3,将loading设置为false
            this.loading =false
            //4,判断是否还原数据
            if(results.length){
                this.offset = data.data.last_id
            }else{
                this.finished =true
            }
       }catch(err){
           
       }
    },
  },
};
</script>

<style>

</style>