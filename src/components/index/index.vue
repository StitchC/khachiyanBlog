<template>
  <div class="index-wrap">
    <div class="index-header">
      <img src="./home-bg.jpg" class="bg-img">
    </div>
    <div class="index-main">
      <div class="author-content">
        <div class="avatar">
          <img src="./Avatar.png">
        </div>
        <div class="author-info">
          <h4 class="author-name">khachiyan</h4>
          <p class="author-desc">啦啦啦</p>
        </div>
        <ul class="article-tags-list"></ul>
      </div>
      <ul class="author-article">
        <li class="article-item" v-for="(article, index) in articles" @click="enterArticle(article.id)" :key="index">
          <div class="article-cover">
            <img src="https://gss0.bdstatic.com/-4o3dSag_xI4khGkpoWK1HF6hhy/baike/c0%3Dbaike150%2C5%2C5%2C150%2C50/sign=5352686dc3fcc3cea0cdc161f32cbded/d01373f082025aafb04d9a84f0edab64034f1a05.jpg">
          </div>
          <div class="article-info">
            <h6 class="article-title">{{article.title}}</h6>
            <p class="article-desc">文章描述</p>
            <p class="post-time">2018-07-02</p>
            <ul class="tags-list" v-show="article.tags.length !== 0">
              <li class="article-tag" v-for="(tag, index) in article.tags" :key="index">{{tag.content}}</li>
            </ul>
          </div>
        </li>
      </ul>
    </div>
    <router-view></router-view>
  </div>

</template>

<script type="text/ecmascript-6">
export default {
  data() {
    return {
      avatar: '',     // 头像url
      tags: [],       // 文章分类标签
      articles: []    // 文章列表
    };
  },
  mounted() {
    this.$http.get('/khachiyanBlog/articles')
      .then((res) => {
        this.articles = res.body;
      })
      .catch((err) => {
        console.log(err);
      });

    // 获取头像
    this.$http.get('khachiyanBlog/avatar')
      .then((res) => {
        this.avatar = res.body;
      });
  },
  methods: {
    enterArticle(id) {
      this.$router.push({
        path: '/article',
        query: {
          articleId: id
        }
      });
    }
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/style/mixin.styl"


  .index-wrap
    .index-header
      position: relative
      height: 500px
      overflow: hidden
      .bg-img
        width: 100%
    .index-main
      width: 1200px
      margin: 40px auto 0 auto
      clearfix()
      .author-content
        float: left
        width: 300px
        .avatar
          width: 100%
          height: 300px
          overflow: hidden
          img
            width: 100%
        .author-info
          padding-top: 10px
          padding-bottom: 20px
          background-color: #fff
          .author-name
            padding-left: 5px
            font-size: 20px
          .author-desc
            padding-left: 5px
            margin-top: 10px
            font-size: 14px
        .article-tags-list
          margin-top: 20px
          .article-tag-item
            margin-top: 10px
            padding-left: 5px
            line-height: 38px
            font-size: 14px
            color: #333
            background-color: #fff
            &:first-child
              margin-top: 0
      .author-article
        margin-left: 380px
        .article-item
          display: inline-block
          vertical-align: top
          width: 340px  /* TODO:  */
          height: 400px
          margin: 0 5px 15px
          padding-bottom: 20px
          background-color: #fff
          transition: all .4s ease
          cursor: pointer
          &:hover
            box-shadow: 0 0 18px rgba(0 ,0 ,0, 0.4)
          .article-cover
            height: 240px
            overflow: hidden
            &:hover
              img
                transform: scale(1.1)
            img
              width: 100%
              transition: transform .4s ease
          .article-info
            padding-left: 15px
            .article-title
              margin-top: 15px
              font-size: 20px
              color: #333
              cursor: pointer
            .article-desc,
            .post-time
              margin-top: 15px
              font-size: 14px
              color: #666
            .tags-list
              margin-top: 10px
              font-size: 0
              .article-tag
                display: inline-block
                line-height: 20px
                margin-left: 5px
                padding: 0 5px
                border: 1px solid #666
                font-size: 12px
                color: #666
                border-radius: 2px
                &:first-child
                  margin-left: 0


</style>
