<template>
  <div class="article">
    <scroll class="scroll-view" :mouse-wheel="mouseWheel" :scrollbar="scrollbar" :data="article">
      <div class="article-content">
        <h6 class="article-title">{{article.title}}</h6>
        <ul class="article-tags">
          <li class="article-tag-item" v-for="(tag, index) in article.tags" :key="index">{{tag.content}}</li>
        </ul>
        <p class="article-post-time">{{article.updateTime | formatTime}}</p>
        <div class="article-txt" v-html="article.content"></div>
      </div>
    </scroll>
  </div>
</template>

<script type="text/ecmascript-6">
  import {getQuery, formatDate} from 'common/script/util.js';
  import scroll from 'base/scroll/scroll.vue';


  export default {
    data() {
      return {
        articleId: -1,
        article: {},
        // 配置scroll 组件属性
        mouseWheel: {
          speed: 5,
          invert: false
        },
        scrollbar: {
          fade: true,
          interactive: true
        }
      };
    },
    mounted() {
      console.log('article mounted');
      this.articleId = getQuery(location.search).articleId;

      this.$http.get('/khachiyanBlog/articles/' + this.articleId)
        .then((res) => {
          this.article = res.body;
          console.log(this.article);
        })
        .catch((err) => {
          console.log(err);
        });

    },
    components: {
      scroll
    },
    filters: {
      formatTime(value) {
        if(value) {
          return formatDate(value, 'yyyy-MM-dd hh:mm:ss');
        }else {
          return '';
        }
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus" scope>
  .article
    position: fixed
    top: 0
    left: 0
    width: 100%
    height: 100%
    background-color: #fff
    overflow: hidden
    .scroll-view
      position: relative
      width: 70%
      height: 100%
      margin: 0 auto
      padding: 0 20px
      overflow: hidden
      border-right: 1px solid #ccc
      border-left: 1px solid #ccc
    .article-content
      .article-title
        font-size: 20px
      .article-tags
        margin-top: 15px
        font-size: 0
        .article-tag-item
          display: inline-block
          line-height: 20px
          padding: 0 5px
          margin-left: 5px
          color: #999
          font-size: 12px
          border: 1px solid #999
          border-radius: 2px
          &:first-child
            margin-left: 0
      .article-post-time
        margin-top: 20px
        font-size: 14px
        color: #666
      .article-txt
        margin-top: 30px
        font-size: 14px
        img
          display: block
          margin: 15px 0
</style>
