<template>
    <van-icon
        :name="value===1?'good-job':'good-job-o'"
        :color="value===1? '#ffa500' : '' "
        @click="onlike"
    />
</template>

<script>
import {like,unlike} from "@/api/user.js"
export default {
    name:'likeArticle',
    props:{
        value:{
            type:[String,Object,Number],
            required:true
        },
        artId:{
            type:[String,Number,Object],
            required:true
        }
    },
    methods:{
        async onlike(){
            try{
                if(this.value==1){
                    unlike(this.artId)
                    this.$emit('input',-1)
                }else{
                    like(this.artId)
                    this.$emit('input',1)
                }
                this.$toast.success(this.value==-1?'点赞成功':'取消点赞')
            }catch(err){
                this.$toast.fail('操作失败,请重试!')
            }
        }
    }
}
</script>

<style>

</style>