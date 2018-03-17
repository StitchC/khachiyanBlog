<template>
  <div class="management">
    <ul class="side-bar">
      <li class="side-bar-item">
        <router-link to="/Management/publish">发布文章</router-link>
      </li>
    </ul>
    <div class="console">
      <router-view></router-view>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
    export default {

    };
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .side-bar
    position: fixed
    top: 0
    left: 0
    width: 280px
    height: 100%
    background-color: #fff
  .console
    padding-left: 300px
</style>
