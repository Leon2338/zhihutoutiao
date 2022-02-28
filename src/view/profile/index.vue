<template>
  <div class="user-profile">
      <!-- 导航栏 -->
        <van-nav-bar
            class="page-nav-bar"
            title="个人信息"
            left-text="返回"
            left-arrow
            @click-left="$router.back()"
        />
      <!-- /导航栏 -->
    <!-- 用于上传文件 -->
      <input 
        type="file" 
        ref="file" 
        hidden
        @change="onFileChange"
        >
      <!-- 个人信息 -->
        <van-cell 
        title="头像" 
        value="内容" 
        is-link
        @click="$refs.file.click()"
       >
            <van-image
                class="avatar"
                fit='cover'
                round
                :src="userInfo.photo"
            />
        </van-cell>
        <van-cell title="昵称"  @click="isUpdataNameShow=true" :value="userInfo.name" is-link/>
        <van-cell title="性别" @click="isUpdataGenderShow=true" :value="userInfo.gender?'女':'男'" is-link/>
        <van-cell title="生日" @click="isUpdataBirthShow=true" :value="userInfo.birthday" is-link/>
        
      <!-- /个人信息 -->
      <!-- 编辑昵称 -->
        <van-popup 
        v-model="isUpdataNameShow"
        style="height: 100%;"
        position="bottom"
        >
            <updateName 
            v-if="isUpdataNameShow"
            @close="isUpdataNameShow=false" 
            v-model="userInfo.name"
            /> 
            <!-- 注意取消修改昵称时再打开要初始化昵称的值，这里就需要使用v-if -->
        </van-popup>
      <!-- /编辑昵称 -->
      <!-- 编辑性别 -->
      <van-popup 
        v-model="isUpdataGenderShow"
        position="bottom"
        >
        <updateGender
            v-if="isUpdataGenderShow"
            v-model="userInfo.gender"
            @close="isUpdataGenderShow=false" 
        />
      </van-popup>
      <!-- /编辑性别 -->
      <!-- 编辑生日 -->
      <van-popup 
        v-model="isUpdataBirthShow"
        position="bottom"
        >
        <updateBirth
            v-if="isUpdataBirthShow"
            v-model="userInfo.birthday"
            @close="isUpdataBirthShow=false" 
        />
      </van-popup>
      <!-- /编辑生日 -->
      <!-- 编辑头像 -->
      <van-popup 
        v-model="isUpdataPhotoShow"
        style="height: 100%;"
        position="bottom"
        
        >
        <updatePhoto
            v-if="isUpdataPhotoShow"
            v-model="avatar"
            @close="isUpdataPhotoShow=false"
            @updateAvatar="userInfo.photo=$event"
        />
      </van-popup>
      <!-- /编辑头像 -->
  </div>
</template>

<script>
import {getProfile} from "@/api/user"
import updateName from "./components/updateName.vue"
import updateGender from "./components/updateGender.vue"
import updateBirth from "./components/updateBirth.vue"
import updatePhoto from "./components/updatePhoto.vue"
export default {
    name:"userProfile",
    components:{
        updateName,
        updateGender,
        updateBirth,
        updatePhoto
    },
    data(){
        return {
            userInfo:{},
            isUpdataNameShow:false,
            isUpdataGenderShow:false,
            isUpdataBirthShow:false,
            isUpdataPhotoShow:false,
            avatar:null            
        }
    },
    created() {
        this.loadUserProfile()
    },
    methods:{
        async loadUserProfile(){
            try{
                const {data} = await getProfile()
                this.userInfo=data.data
            }catch(err){

            }
        },
        onFileChange(){
            //获取文件对象
            const file = this.$refs.file.files[0]            
           //基于文章对象获取 blob 数据
            const photoUrl = URL.createObjectURL(file)
            this.avatar=photoUrl
            this.isUpdataPhotoShow=true
            //处理特殊情况 如果选了同样的图片不会触发change事件
            //解决办法就是每次使用完毕，把它的value清空
            this.$refs.file.value = ''
        }
    }
}
</script>

<style scoped lang="less">
.user-profile{
    .avatar{
        width:60px;
        height:60px
    }
    .van-popup{
        background-color: #f5f7f9;
    }
}
</style>