<template>
  <div>
      <van-datetime-picker
        v-model="currentDate"
        type="date"
        :min-date="minDate"
        :max-date="maxDate"
        @cancel="onCancel"
        @confirm="onConfirm"
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
  data() {
    return {
      minDate: new Date(1989, 0, 1),
      maxDate: new Date(),
      currentDate: new Date(this.value),
    };
  },
  methods:{
      onCancel(){
          this.$emit('close')
      },
      async onConfirm(val){
          try{
            const year = val.getFullYear()
            const month= val.getMonth()+1
            const day = val.getDate()
            const a=`${year}-${month}-${day}`
            //防止网速过慢多次更改
            this.$toast.loading({
                duration: 0, // 持续展示 toast
                forbidClick: true,
                message: '保存中...',
            });
            await updateProfile({birthday:a})
            //更新视图
            this.$emit('input',a)
            //关闭图层
            this.$emit('close')
            //提示成功
            this.$toast.success('更新成功')
          }catch(err){
            this.$toast.fail('更新失败')
            console.log(err);
          }
      },
  }
};
</script>

<style>

</style>