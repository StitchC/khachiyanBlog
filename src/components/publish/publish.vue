<template>
    <div class="publish">
      <div class="edit-row">
        <label for="article-title">题目</label>
        <input type="text" id="article-title" class="art-title" placeholder="文章标题">
      </div>
      <div class="edit-row">
        <label for="article-title">描述</label>
        <input type="text" id="article-desc" class="art-desc" placeholder="文章描述">
      </div>
      <div class="edit-row">
        <label for="article-cover" class="upload-cover"></label>
        <input type="file" id="article-cover" class="art-cover">
      </div>
      <div class="edit-row">
        <div id="article-txt" class="art-txt" ref="editor"></div>
      </div>
      <div class="edit-row">
        <input type="text" id="article-tag" class="art-tag" placeholder="文章标签按回车添加">
        <ul class="tag-list"></ul>
      </div>
    </div>
</template>

<script type="text/ecmascript-6">
    import W from 'wangeditor';
    import { wangEditorConfig } from 'common/script/config.js';

    export default {
        mounted() {
          this.editor = new W(this.$refs.editor);
          this.editor.customConfig.menus = wangEditorConfig;
          this.editor.create();
        }
    };
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .publish
    width: 90%
    padding-top: 20px
    .edit-row
      margin-top: 20px
      &:first-child
        margin: 0
      label
        display: block
        font-size: 16px
      input
        width: 100%
        height: 35px
        margin-top: 10px
        padding-left: 10px
        background-color: #fff
        border-radius: 5px
        border: none
        outline: none
        font-size: 14px
        transition: box-shadow .4s ease
        &:focus
          box-shadow: 0 0 15px rgba(76, 171, 255, 0.8)

</style>
