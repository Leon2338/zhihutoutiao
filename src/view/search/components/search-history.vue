<template>
  <div>
      <van-cell title="搜索历史">
            <div v-if="isDeleteShow">
                <span @click="$emit('clearItem')">全部删除</span>
                &nbsp;&nbsp;
                <span @click="isDeleteShow=false">完成</span>
            </div>
            <van-icon name="delete-o" v-else @click="isDeleteShow=true"/>
          
      </van-cell>
      <van-cell 
      v-for="(item,index) in searchHistory" 
      :key="index" 
      :title="item"
      @click="onSearchItemClick(item,index)">
          <van-icon 
          name="close" 
          v-if="isDeleteShow"
          />
      </van-cell>
  </div>
</template>

<script>

export default {
    name:"searchHistory",
    data() {
        return {
            isDeleteShow:false
        }
    },
    props:{
        searchHistory:{
            type:Array,
            required:true
        },
    },
    methods: {
        onSearchItemClick(item,index){
            if(this.isDeleteShow){
                //可以对props传入的数组执行splic等数组操作
                //但不可以执行赋值等操作，需要传给传入数据的组件进行操作
                this.searchHistory.splice(index,1)
            }else{
                this.$emit('search',item)
            }
        }
    },
}
</script>

<style>

</style>