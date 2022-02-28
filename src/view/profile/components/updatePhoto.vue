<template>
  <div class="update-photo">
      <img class="img" :src="value" alt="" ref="img">
      <div class="toolBar">
        <div class="cancel" @click="$emit('close')">取消</div>
        <div class="confirm" @click="onConfirm">确定</div>
      </div>
  </div>
</template>

<script>
import 'cropperjs/dist/cropper.css';
import Cropper from 'cropperjs';
import {updateAvatar} from '@/api/user.js'
export default {
    name:"updatePhoto",
    props:{
        value:{
            Type:[String,Object],
            required:true
        }
    },
    mounted(){
        const image = this.$refs.img
        this.cropper = new Cropper(image, {
            viewMode: 1,
            dragMode: 'move',
            aspectRatio: 1,
            autoCropArea: 1,
            cropBoxMovable: false,
            cropBoxResizable: false,
            background: false,
            movable: true
        })
    },
    methods:{
        onConfirm(){
            this.cropper.getCroppedCanvas().toBlob(async blob=>{
                try{
                    //防止网速过慢多次更改
                    this.$toast.loading({
                        duration: 0, // 持续展示 toast
                        forbidClick: true,
                        message: '保存中...',
                    });
                    const formdata = new FormData()
                    formdata.append('photo',blob)
                    const {data}=await updateAvatar(formdata)
                    //关闭弹出层
                    this.$emit('close')
                    
                    //更新视图
                    this.$emit('updateAvatar',data.data.photo)

                    //提示成功
                    this.$toast.success('更新成功')
                }catch(err){
                    this.$toast.fail('更新失败')
                }
            })
        }
    }
}
</script>

<style scoped lang="less">
    .update-photo{
        background-color: #000;
        height: 100%;
        .img{
            display: block;
            width: 100%;
        }
        .toolBar{
            position: fixed;
            left: 0;
            right: 0;
            bottom: 0;
            display: flex;
            justify-content: space-between;
            .confirm , .cancel{
                height: 90px;
                width: 90px;
                font-size: 30px;
                display: flex;
                justify-content: center;
                align-items: center;
                color: #fff;
            }
        }
    }
</style>