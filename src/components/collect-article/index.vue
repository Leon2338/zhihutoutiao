<template>
  <van-icon
        :name="value?'star':'star-o'"
        :color="value? '#ffa500' : '' "
        @click="oncollect"
    />
</template>

<script>
import {collect,uncollect} from "@/api/user.js"
export default {
    name:'collectArticle',
    props:{
        value:{
            type:Boolean,
            required:true
        },
        artId:{
            type:[String,Number,Object],
            required:true
        }
    },
    methods:{
        async oncollect(){
            try{
                if(this.value){
                    uncollect(this.artId)
                }else{
                    collect(this.artId)
                }
                this.$emit('input',!this.value)
                this.$toast.success(this.value?'收藏成功':'取消成功')
            }catch(err){
                this.$toast.fail('操作失败,请重试!')
            }
        }
    }
}
</script>

<style>

</style>