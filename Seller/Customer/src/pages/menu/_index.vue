<template>
  <div class="root">
    <dish :dish="dish" :total="true" :button="false"/>
    <div class="info"/>
    <div class="menu">
      <scroll-view class="tags">
        <div v-for="tag in tags" :key="tag">{{tag}}</div>
      </scroll-view>
      <scroll-view class="dishes">
        <div v-for="dish in dishes" :key="dish.dish_id">
          <dish :dish="dish"/>
        </div>
      </scroll-view>
    </div>
    <div class="cart_button"></div>
    <div class="cart"></div>
  </div>
</template>

<script src="./menu.js"></script>

<style scoped>
.tags {
  float: left;
  width: 100rpx;
}
.tags > div {
  overflow: hidden;
}
.dishes {
  float: right;
  width: 650rpx;
}
</style>
