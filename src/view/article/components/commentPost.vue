<template>
  <div class="comment-post">
    <van-field
      class="post-field"
      v-model.trim="message"
      rows="2"
      autosize
      type="textarea"
      maxlength="50"
      placeholder="请输入留言"
      show-word-limit
    />
    <van-button
      class="post-btn"
      @click="postComment"
      :disabled="!message.length"
    >发布</van-button>
  </div>
</template>

<script>
import {postComment} from "@/api/comment.js"
export default {
  name: 'CommentPost',
  components: {},
  props: {
      target:{
          type:[String,Number],
          required:true
      }
  },
  data () {
    return {
      message: ''
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
      async postComment(){
          this.$toast.loading({
                message: '加载中...',
                forbidClick: true,
                duration:0
            });
          try{    
              const {data} = await postComment({
                  target:this.target,
                  content:this.message,
                  art_id:null
              })
              console.log(data);
            this.message=''
            this.$emit('post-success',data.data)
            this.$toast.success('发布成功!')
          }catch(err){
              console.log(err);
              this.$toast.fail('发布失败')
          }
      }
  }
}
</script>

<style scoped lang="less">
.comment-post {
  display: flex;
  align-items: center;
  padding: 32px 0 32px 32px;
  .post-field {
    background-color: #f5f7f9;
  }
  .post-btn {
    width: 150px;
    border: none;
    padding: 0;
    color: #6ba3d8;
    &::before {
      display: none;
    }
  }
}
</style>
