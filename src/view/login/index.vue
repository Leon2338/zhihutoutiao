<template>
<div class="login-container"> 
    <van-nav-bar class="page-nav-bar" title="登录">
        <van-icon name="arrow-left" slot="left" @click="$router.back()"/> 
    </van-nav-bar>
    <van-form ref="loginForm" @submit="onSubmit">
        <van-field
            v-model="user.mobile"
            name="mobile"
            placeholder="请输入手机号"
            :rules="userFormRules.mobile"
            type="number"
            maxlength="11"
        >
        <i slot="left-icon" class="toutiao iconfont icon-shouji"></i> 
        </van-field>
        <van-field
            v-model="user.code"
            name="code"
            placeholder="请输入验证码"
            :rules="userFormRules.code"
            maxlength="6"
        >
        <i slot="left-icon" class="toutiao iconfont icon-yanzhengma"></i> 
        
         <template  #button>
              <!-- 倒计时 -->
              <!-- format是定义格式的ss是计时器组件的秒数，s是格式字符串
              finish是计时器组件的事件类似于click这样的 -->
            <van-count-down v-if="isCountDownShow" 
            :time="1000 * 5" 
            format="ss s" 
            @finish="isCountDownShow=false"
            />
            <van-button 
            v-else
            round 
            class="login-send" 
            size="small" 
            type="default"
            @click="onSendSms"
            native-type="button"
            >发送验证码</van-button>
        </template>
        </van-field>
        <div class="login-btn-wrap">
            <van-button class="login-btn" block type="info" native-type="submit">提交</van-button>
        </div>
    </van-form>
</div>
  
   


</template>

<script>
import {login,sendSms} from "@/api/user.js"

export default {
    data(){
        return {
            user:{
                mobile:'',
                code:''
            },
            userFormRules:{
                mobile:[{ required: true, message: '请输入手机号!' },{pattern:/1[3|7|5|8]\d{8}/,message:"请输入正确的手机号!"}],
                code:[{ required: true, message: '请填写验证码!' },{pattern:/^\d{6}$/,message:"请输入正确格式的验证码!"}]
            },
            isCountDownShow:false
        }
    },
    methods: {
        //提交手机号和验证码
        async onSubmit(){
            //表单验证
            //在组件中必须通过this.$toast来调用方法
            this.$toast.loading({
                message: '加载中...',
                forbidClick: true,
                duration:0
            });
            //发送请求
            
            const user = this.user
            try{
                let res =await login(user)
                this.$toast.success("登录成功!")
                //设置token的值
                this.$store.commit("setUser",res.data.data)
                this.$router.back()
            }catch(err){
                if(err.response.status === 400){
                    //使用vant组件库中的toast轻提示
                    console.log("手机号验证码错误!");
                    this.$toast.fail('手机号或验证码错误!')
                }else{
                    console.log("发生未知错误!");
                }
            }
        },
        //发送验证码
        async onSendSms(){
            try{
                //校验手机验证码,手动触发验证规则
                await this.$refs.loginForm.validate('mobile')
                //切换是现实“发送验证码”还是计时器组件
                this.isCountDownShow=true
            }catch(err){
                return console.log("验证失败",err);
            }
            //请求验证码
            try{
                sendSms(this.user.mobile)
                this.$toast("发送短信成功!")
            }catch (err){
                if(err.response.status===429){
                    this.$toast("发送短信过于频繁")
                }else{
                    this.$toast("发生未知错误!")
                }
            }
        }
    },
}
</script>

<style scoped lang="less">
    .login-container{
        .toutiao{
            font-size: 37px;
        }
        .login-send{
            background-color: #ededed;
            width: 156px;
            height: 46px;
            line-height: 46px;
            font-size: 18px;
            color: #666;
        }
        .login-btn-wrap{
            padding: 53px 33px;
        }
        .login-btn{
            background-color: #6db4fb;
            border: none;
        }
    }
</style>