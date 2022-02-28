<template>
  <div>
      <van-picker
        title="标题"
        show-toolbar
        :columns="columns"
        @confirm="onConfirm"
        @cancel="onCancel"
        @change="onChange"
        :default-index="value"
    />
  </div>
</template>

<script>
import {updateProfile} from "@/api/user.js"
export default {
    props:{
        value:{
        type:[Number,String],
        required:true
      }
    },
    data(){
        return {
            columns:['男','女'],
            message:this.value
        }
    },
    methods:{
        onCancel(){
            this.$emit('close')
        },
        async onConfirm(){
            try{
            //防止网速过慢多次更改
            this.$toast.loading({
                duration: 0, // 持续展示 toast
                forbidClick: true,
                message: '保存中...',
            });
            await updateProfile({gender:this.message})
            //更新视图
            this.$emit('input',this.message)
            //关闭图层
            this.$emit('close')
            //提示成功
            this.$toast.success('更新成功')
            }catch(err){
            this.$toast.fail('更新失败')
            }
        },
        onChange(picker,value,index){
            this.message=index
        }
    }
}
</script>

<style>

</style>