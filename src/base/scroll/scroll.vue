<template>
  <div ref="scroll">
    <slot></slot>
  </div>
</template>

<script type="text/ecmascript-6">
  /**
   * 滚动组件
   *
   * @param {Number} probeType - 控制better-scroll probeType 属性 默认: 1
   *
   * @param {Boolean} click - 设置better-scroll 是否可以点击 默认: true
   *
   * @param {Array} data - 加载到滚动组件的数据 以便监听数据的变化刷新 better-scroll
   *
   * @param {Boolean} listenScroll - 监听组件的滚动事件
   *
   * @event scroll - 组件滚动的时候触发 返回一个滚动的pos 对象
   * */

  import Bscroll from 'better-scroll';

  export default {
    props: {
      probeType: {
        type: Number,
        default: 1
      },
      click: {
        type: Boolean,
        default: true
      },
      data: {
        type: Object,
        default: () => {
          return {};
        }
      },
      listenScroll: {
        type: Boolean,
        default: false
      },
      mouseWheel: {
        // 开启鼠标滚轮滑动
        type: Object,
        default: () => {
          return {};
        }
      },
      scrollbar: {
        // 开启滚动条
        type: Object,
        default: () => {
          return {};
        }
      }
    },
    mounted() {
      if(!this.scroll) {
        setTimeout(() => {
          this._initScroll();
        }, 20);
      }else {
        setTimeout(() => {
          this.refresh();
        }, 50);
      }
    },
    methods: {
      _initScroll() {
        this.scroll = new Bscroll(this.$refs.scroll, {
          probeType: this.probeType,
          click: this.click,
          mouseWheel: this.mouseWheel,
          scrollbar: this.scrollbar
        });

        if(this.listenScroll) {
          // 因为better-scroll 在监听回调的时候 this 默认指向better-scroll
          // 所以要用一个变量保存一个vue 对象
          let _self = this;
          this.scroll.on('scroll', (pos) => {
            _self.$emit('scroll', pos);
          });
        }
      },
      enabled() {
        this.scroll.enable();
      },
      disabled() {
        this.scroll.disable();
      },
      refresh() {
        this.scroll.refresh();
      },
      scrollTo() {
        this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments);
      },
      scrollToElement() {
        this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments);
      }
    },
    watch: {
      data() {
        console.log('refresh');
        setTimeout(() => {
          this.refresh();
        }, 20);
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">

</style>
