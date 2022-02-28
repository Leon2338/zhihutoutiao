<template>
  <div class="search-container">
    <form action="/" class="search-form">
        <van-search
            v-model="searchText"
            show-action
            placeholder="请输入搜索关键词"
            @search="onSearch"
            @cancel="onCancel"
            @focus="isResultShow=false"
            background="#3296fa"
        />
    </form>

    <!-- 搜索结果 -->
    <search-result 
    v-if="isResultShow" 
    :searchText="searchText"/>
    <!-- /搜索结果 -->

    <!-- 搜索建议 -->
    <search-suggestion 
    v-else-if="searchText" 
    :searchText="searchText"
    @search="onSearch"
    />
    <!-- /搜索建议 -->

    <!-- 历史记录 -->
    <search-history 
    v-else
    :searchHistory="searchHistory" @clearItem="searchHistory=[]" @search="onSearch"/>
    <!-- 历史记录 -->



    
    
  </div>
</template>

<script>
import SearchHistory from './components/search-history.vue';
import SearchResult from './components/search-result.vue';
import searchSuggestion from "./components/search-suggestion"
import {setItem,getItem} from "@/util/storage.js"
export default {
  name:'search',
  components:{
    SearchHistory,
    searchSuggestion,
    SearchResult
  },
  data() {
    return {
      searchText: '',
      //标记是否有搜索结果
      isResultShow:false,
      searchHistory:getItem('TOUTIAO_HISTORY')||[]//记录搜索历史
    };
  },
  methods: {
    onSearch(val) {
      //存储历史记录
      const index = this.searchHistory.indexOf(val)
      if(index !=-1){
        this.searchHistory.splice(index,1)
      }

      this.searchHistory.unshift(val)
      //按下搜索后显示搜索结果
      this.isResultShow=true
      //更新文本框内容
      this.searchText = val

    },
    onCancel() {
        this.$router.back();
    },
  },
  watch:{
    //搜索历史持久化
    searchHistory(value){
        setItem("TOUTIAO_HISTORY",value)
    }
  }
};
</script>

<style lang="less" scoped>
.search-container{
    padding-top: 108px;
    .van-search__action{
        color: white;
    }
    .search-form{
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: 1;
    }
}
</style>