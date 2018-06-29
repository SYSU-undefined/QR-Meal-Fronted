<template>
  <div class="root">
    <div class="status-bar">{{formattedStatus}}</div>
    <scroll-view class="order" scroll-y="true" >
      <div v-for="dish of dishes" :key="dish">
        <div class="dish_panel">
          <img class="dish_image" :src="dish.image">
          <div class="dish_info">
            <div class="dish_name">{{dish.name}}</div>
            <div class="dish_price"><span class="bold">{{dish.count}}</span>例共<span class="bold">{{dish.price * dish.count}}</span>元</div>
            <div class="dish_status">{{dish.status}}</div>
          </div>
        </div>
      </div>
    </scroll-view>
  </div>
</template>

<script src="./order.js">
</script>


<style scoped>
.root {
  height: 100%;
}

span.bold {
  font-weight: bold;
  font-size: 1.05em;
}

.status-bar {
  height: 60rpx;
  line-height: 60rpx;
  font-size: 0.85em;
  text-align: center;
  background: #f0f0f0;
}

.order {
  bottom: 0;
  top: 60rpx;
  position: absolute;;
}

.dish_image {
  height: 160rpx;
  width: 160rpx;
  float: left;
  margin-right: 20rpx;
}

.dish_status,
.dish_price {
  display: inline-block;
}

.dish_info {
  overflow: hidden;
}

.dish_count {
  display: block;
  width: 2em;
  padding: 0 0.2em;
  text-align: center;
}

.dish_status {
  margin: 0 10rpx;
  right: 15rpx;
  position: absolute;
}

.dish_panel {
  width: 100%;
  height: 175rpx;
  padding: 15rpx;
  padding-top: 0;
  box-sizing: border-box;
  align-items: center;
  position: relative;
}

img,
.dish_info {
  vertical-align: middle;
}

.dish_name {
  width: 100%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-size: 1.5em;
  font-weight: bolder;
}

</style>
