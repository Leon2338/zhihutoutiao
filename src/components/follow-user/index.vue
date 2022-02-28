<template>
   <van-button
        class="follow-btn"
        round
        size="small" 
        v-if="value"
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
    >关注</van-button>
</template>

<script>
import {addFollow,cancelFollow} from "@/api/user.js"
export default {
  props:{
    //使用v-model 传入的值默认叫做value，且默认有一个input事件
    value:{
      type:Boolean,
      require:true
    },
    autId:{
      type:[String,Object,Number],
      require:true
    }
  },
  data(){
    return {
      followLoading:false
    }
  },
  methods:{
    async onfollow(){
      try{
        this.followLoading=true
        if(this.value){
          await cancelFollow(this.autId)
        }else{
          await addFollow(this.autId)
        }
        // this.article.is_followed=!this.article.is_followed
        this.$emit('input',!this.value)
        this.followLoading=false
      }catch(err){
        
      }
        
      }
  }
}
</script>

<style>

</style>