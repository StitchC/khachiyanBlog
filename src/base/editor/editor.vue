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
      },
      methods: {
        _initEditor() {
          if(!this.editor) {
            this.editor = new W(this.$refs.editor);
            this.editor.customConfig = this.config;

            const vue = this;

            if(this.config.uploadImgServer) {

              // 如果开启了图片上传服务器功能 监听图片上传成功回调
              this.editor.customConfig.uploadImgHooks = {
                before(xhr, editor, files) {
                  vue.$emit('before', xhr, editor, files);
                },
                success(xhr, editor, result) {
                  vue.$emit('success', xhr, editor, result);
                },
                fail(xhr, editor, result) {
                  vue.$emit('fail', xhr, editor, result);
                },
                error(xhr, editor) {
                  vue.$emit('error', xhr, editor);
                },
                timeout(xhr, editor) {
                  vue.$emit('timeout', xhr, editor);
                }
              };
            }
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
