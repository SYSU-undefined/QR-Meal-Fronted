<template>
  <div class="dish_panel">
    <img class="dish_image" :src="dish.image">
    <div class="dish_info">
      <div class="dish_name">{{dish.name}}</div>
      <div class="dish_price">&yen;&nbsp;{{showTotal ? totalPrice : dish.price}}</div>
      <div class="button_panel">
        <div v-show="dish.count != 0">
          <i v-if="!hideBotton" class="dish_btn fa fa-minus-circle" @click="remove_dish"/>
          <div class="dish_count">{{dish.count > 99 ? '99+' : dish.count}}</div>
        </div>
        <i v-if="!hideBotton" class="dish_btn fa fa-plus-circle" @click="add_dish"/>
      </div>
    </div>
  </div>
</template>


<style scoped>
.dish_image {
  height: 160rpx;
  width: 160rpx;
  float: left;
  margin-right: 20rpx;
}

.button_panel div,
.button_panel,
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

.button_panel {
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

<script src="./dish.js"/>

