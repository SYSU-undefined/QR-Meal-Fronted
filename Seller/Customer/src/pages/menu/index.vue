<template>
  <div class="root">
    <scroll-view class="tags">
        <div v-for="tag in tags" :key="tag">{{tag}}</div>
    </scroll-view>
    <scroll-view class="dishes" scroll-y="true">
      <div v-for="dish in dishes" :key="dish.dish_id">
        <dish :dish="dish"/>
      </div>
    </scroll-view>
  </div>
</template>

<script src="./vue.js">
</script>

<style scoped>
.root, .tags, .dishes {
  height: 100%;
}

.tags {
  float: left;
  width: 150rpx;
  background: #F0F0F0;
}
.tags > div {
  overflow: hidden;
}
.dishes {
  float: right;
  width: 600rpx;
}
</style>

