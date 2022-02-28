<template>
  <div class="update-name">
      <!-- 导航栏 -->
        <van-nav-bar
            title="设置昵称"
            left-text="取消"
            right-text="完成"
            @click-left="$emit('close')"
            @click-right="updateName"
        />
      <!-- /导航栏 -->
      <!-- 输入框 -->
      <div class="field-wrap">
        <van-field
          v-model.trim="message"
          rows="2"
          autosize
          type="textarea"
          maxlength="11"
          placeholder="请输入昵称"
          show-word-limit
        />
      <!-- /输入框 -->
      </div>
  </div>
</template>

<script>
import {updateProfile} from "@/api/user.js"
export default {
    name:'updateName',
    data(){
      return {
        message:this.value
      }
    },
    props:{
      value:{
        type:String,
        required:true
      }
    },
    methods:{
      async updateName(){
        try{
          //防止网速过慢多次更改
          this.$toast.loading({
            duration: 0, // 持续展示 toast
            forbidClick: true,
            message: '保存中...',
          });
          if(!this.message){
            return this.$toast('名字不能为空')
          }
          await updateProfile({name:this.message})
          //更新视图
          this.$emit('input',this.message)
          //关闭图层
          this.$emit('close')
          //提示成功
          this.$toast.success('更新成功')
        }catch(err){
          this.$toast.fail('更新失败')
        }
      }
    }
}
</script>

<style scoped lang="less">
  .field-wrap{
    padding: 20px;
  }
</style>