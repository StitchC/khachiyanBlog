<template>
    <div class="editor" ref="editor"></div>
</template>

<script type="text/ecmascript-6">
    import W from 'wangeditor';

    export default {
      props: {
        config: {
          type: Object,
          default: () => {
            return {};
          }
        }
      },
      mounted() {
        this._initEditor();

        this.$emit('mounted', true);

        if(this.config.uploadImgServer) {
          // 如果开启了图片上传服务器功能 监听图片上传成功回调
          this.editor.uploadImgHooks = {
            before(xhr, editor, img) {
              this.$emit('before', xhr, editor, img);
            },
            success(xhr, editor, result) {
              this.$emit('success', xhr, editor, result);
            },
            fail(xhr, editor, result) {
              this.$emit('fail', xhr, editor, result);
            },
            error: function (xhr, editor) {
              this.$emit('error', xhr, editor);
            },
            timeout: function (xhr, editor) {
              this.$emit('timeout', xhr, editor);
            },
          };
        }
      },
      methods: {
        _initEditor() {
          if(!this.editor) {
            this.editor = new W(this.$refs.editor);
            this.editor.customConfig = this.config;
            this.editor.create();
          }
        },
        getText() {
          return this.editor.txt.text();
        },
        getHtml() {
          return this.editor.txt.html();
        },
        setValue(val) {
          this.editor.txt.html(val);
        },
        clear() {
          this.editor.txt.clear();
        }
      }
    };
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">

</style>
