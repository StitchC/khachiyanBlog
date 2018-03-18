<template>
    <div class="publish">
      <div class="edit-row">
        <label for="article-title">题目</label>
        <input type="text" id="article-title" class="art-title" placeholder="文章标题" v-model="articleTitle">
      </div>
      <div class="edit-row">
        <label for="article-title">描述</label>
        <input type="text" id="article-desc" class="art-desc" placeholder="文章描述" v-model="articleDesc">
      </div>
      <div class="edit-row">
        <p>封面图</p>
        <label for="article-cover" class="upload-cover">上传封面图</label>
        <transition name="img-slide">
          <img class="display-cover-img" :src="coverImgUrl" v-show="coverImgUrl !== ''">
        </transition>
        <input type="file" id="article-cover" class="art-cover" ref="file" @change="coverImgChange">
      </div>
      <div class="edit-row">
        <editor class="editor" :config="editorConfig"
                ref="editor"
                @before ="beforeUpload"
                @success="uploadSuccess"
                @fail="uploadFail"
                @error="uploadError"
                @timeout="uploadTimeout"></editor>
      </div>
      <div class="edit-row">
        <label for="article-tag">标签</label>
        <input type="text" id="article-tag" class="art-tag" placeholder="文章标签按回车添加" v-on:keyup.enter="addTag" v-model="tagContent">
        <ul class="tag-list">
          <li class="tag-item" v-for="(tag, index) in articleTags" :key="index">
            {{tag}}
            <span class="del-btn" @click="deleteTag(index)">✖</span>
          </li>
        </ul>
      </div>
      <div class="edit-row">
        <button class="publish-btn" type="button">发布</button>
      </div>
    </div>
</template>

<script type="text/ecmascript-6">
    import editor from 'base/editor/editor.vue';
    import { wangEditorConfig } from 'common/script/config.js';
    import { turnBase64 } from "common/script/util.js";

    export default {
        data() {
          return {
            articleTitle: '',
            articleDesc: '',
            coverImgUrl: '',
            coverImgObj: {},
            tagContent: '',
            editorConfig: wangEditorConfig,
            articleTags: []
          };
        },
        components: {
          editor
        },
        methods: {
          addTag() {
            this.articleTags.push(this.tagContent);
            this.tagContent = '';
          },
          deleteTag(index) {
            this.articleTags.splice(index, 1);
          },
          coverImgChange(e) {
            if(!/image\/\w/.test(e.target.files[0].type)) {
              alert('请上传图片');
              return false;
            }
            turnBase64(e.target.files[0])
              .then(url => {
                console.log(url);
                this.coverImgUrl = url;
              })
              .catch(err => {
                alert('预览图片失效请重新上传');
                console.log(err);
              })
              .finally(() => {
                // 清空文件
                this.$refs.file.value = '';
              });
          },


          // 富文本上传图片事件回调
          beforeUpload(xhr, editor, img) {
            alert('first');
          },
          uploadSuccess(xhr, editor, result) {
            console.log(result);
          },
          uploadFail(xhr, editor, result) {
            console.log(result);
          },
          uploadError(xhr, editor) {
            alert('图片上传失败');
          },
          uploadTimeout(xhr, editor) {
            alert('抱歉 图片上传超时');
          }
        }
    };
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .publish
    width: 90%
    padding-top: 20px
    padding-bottom: 30px
    .edit-row
      margin-top: 20px
      .editor
        background: #fff
      &:first-child
        margin: 0
      label
        display: block
        font-size: 16px
        &.upload-cover
          display: inline-block
          vertical-align middle
          width: 300px
          line-height: 180px
          margin-top: 15px
          text-align: center
          border: 3px dashed #ccc
          color: #ccc;
          cursor: pointer
          &:hover
            border-color: #4CABFF
            color: #4CABFF
      .display-cover-img
        vertical-align: middle
        margin-top: 15px
        width: 300px
        height: 180px
        &.img-slide-enter
          opacity: 0
          transform: translate3d(30px, 0, 0)
        &.img-slide-enter-to
          opacity: 1
          transform: translate3d(0, 0, 0)
        &.img-slide-enter-active
          transition: all .4s ease
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
        transition: box-shadow  ease .4s
        &:focus
          box-shadow: 0 0 15px rgba(76, 171, 255, 0.8)
        &[type=file]
         display: none
      .tag-list
        margin-top: 15px
        font-size: 0
        .tag-item
          position: relative
          display: inline-block
          margin-left: 10px
          padding: 5px 10px
          font-size: 12px
          background-color: #fff
          border-radius: 2px
          &:first-child
            margin-left: 0
          .del-btn
            position: absolute
            top: -5px
            left: -5px
            width: 14px
            height: 14px
            border-radius: 50%
            font-size: 10px
            background: #e91b25
            color: #fff
            text-align: center
            cursor: pointer
      .publish-btn
        width: 100px
        line-height: 30px
        text-align: center
        color: #fff
        background: #4CABFF
        border-radius: 5px
        outline: none
        border: none
        &:active
          background: #3c84c6
</style>
