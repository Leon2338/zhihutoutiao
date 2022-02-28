<template>
  <div class="channel-edit">
    <van-cell class="channel-title">
        <div slot="title">我的频道</div>
        <van-button class="add-btn" plain type="danger" size="mini" round @click="showClear=!showClear">
            {{showClear?'完成':'编辑'}}
        </van-button>
    </van-cell>
    <!-- 我的频道具体项 -->
    <van-grid :gutter="10" class="my-grid">
        <van-grid-item 
        class="grid-item" 
        v-for="(channel,index) in channels" 
        :key="index" 
        :text="channel.name" 
        @click="changeChannel(channel,index)"
        >
        <!-- 单独将删除图标拿出方便，显示隐藏 -->
        <van-icon name="clear" slot="icon" v-if="showClear && !fixedChanner.includes(channel.id)"></van-icon>
        <span
        class="text"
        :class="{active:active===index}" 
        slot="text">
        {{channel.name}}
        </span>
        </van-grid-item>
    </van-grid>
    <!-- //////// -->
    <van-cell class="channel-title">
        <div slot="title">频道推荐</div>
    </van-cell>
    <!-- 推荐频道具体项 -->
    <van-grid :gutter="10" class="recommend-grid">
        <van-grid-item 
        class="grid-item" 
        v-for="(value,index) in recommendChannels" 
        :key="index" 
        icon="plus" 
        :text="value.name"
        @click="addChannel(value)" />
    </van-grid>
    <!-- ////////// -->
  </div>
</template>

<script>
//导入接口函数
import {getAllChannels,addUserChannel,deleteUserChannel} from "@/api/user"
import {mapState} from "vuex"
import {setItem} from "@/util/storage"
export default {
    name:"channelEdit",
    props:{
        channels:{
            type:Array,
            require:true
        },
        active:{
            type:Number,
            require:true
        },
    },
    computed:{
        ...mapState(['user']),
        recommendChannels(){
            return this.allChannels.filter(item=>{
                return !this.channels.find(channel=>{
                    return channel.id===item.id 
                })
            })
        }
    },
    created() {
        this.getAllChannels()
    },
    data(){
        return{
            allChannels:[],
            showClear:false, //标志是否显示×号
            fixedChanner:[0]  //设置那些频道是固定不可删除的

        }
    },
    methods: {
        async getAllChannels(){
            try{
                const {data} = await getAllChannels()
                this.allChannels=data.data.channels
            }catch(err){
                console.log(err);
            }
        }
        ,
        addChannel(channel){
            this.channels.push(channel)
            //数据持久化处理
            if(this.user){
                try{
                    //已登录，把数据请求接口放到线上
                    addUserChannel({
                        id:channel.id, //频道ID
                        seq:this.channels.length //序号
                    })
                }catch(err){
                    this.$toast('保存失败，请稍后重试！')
                }
                
            }else{
                //未登录，把数据存储到本地
                setItem("TOUTIAO_CHANNELS",this.channels)
            }
        },
        changeChannel(channel,index){
            if(this.showClear){
                //表示当有❌的时候
                //防止推荐频道一同被删除
                if(this.fixedChanner.includes(channel.id)){
                    return
                }
                //当要删除项在选中项的后面的时候，index-1
                if(index<=this.active){
                    this.$emit("changeActive",this.active-1,true)
                }
                //删除选中项
                this.channels.splice(index,1);
                //4,实现数据持久化
                this.deleteChannel(channel)
            }else{
                //表示没有❌的时候
                // console.log(channel,index);
                this.$emit("changeActive",index,false)
                
            }
        },
        //实现删除频道数据持久化

        async deleteChannel(channel){
            try{
                if(this.user){
                    //已登录
                    await deleteUserChannel(channel.id)
                }else{
                    //未登录
                    setItem("TOUTIAO_CHANNELS",this.channels)
                }
            }catch(err){
                this.$toast('操作失败，请稍后再试！')
            }
            
        }
    },

}
</script>

<style scoped lang="less">
.channel-edit{
    padding: 85px 0;
    .channel-title{
        font-size: 32px;
        color:#3a3a3a;
        .add-btn{
            width: 104px;
            height: 48px;
            font-size:26px;
            color:#f85959;
            border: 1px solid #f85959;
        }
    }
    /deep/ .grid-item{
        width: 160px;
        height: 86px;
        .van-grid-item__content{
            white-space: nowrap;
            background-color: #f4f5f6;
            .van-grid-item__text,.text{
                font-size: 26px;
                color: #222;
            }
            .active{
                color:red
            }
        }
    }
    /deep/ .recommend-grid{
        .grid-item{
            .van-grid-item__content{
                flex-direction: row;
                .van-icon-plus{
                    font-size:28px;
                    margin-right:6px;
                }
                .van-grid-item__text{
                    margin-top: 0px;
                }
            }
        }
    }

    /deep/  .my-grid{
        .grid-item{
            .van-grid-item__icon-wrapper{
                position: unset;
            }
            .van-icon-clear{
                position:absolute;
                right: -10px;
                top: -10px;
                font-size: 30px;
                color:#cacaca;
                z-index:2;
            }
        }
    }
}
</style>