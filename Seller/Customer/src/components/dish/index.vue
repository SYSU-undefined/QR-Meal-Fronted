<template>
  <div class="dish_panel">
    <img class="dish_image" :src="dish.image">
    <div class="dish_info">
      <span>{{dish.name}}</span>
      <span>{{dish.price}}</span>
    </div>
    <div class="button_panel">
      <div v-if="dish.count != 0">
        <i class="dish_btn fa fa-minus-circle" @click="remove_dish"/>
        <span>{{dish.count}}</span>
      </div>
      <i class="dish_btn fa fa-plus-circle" @click="add_dish"/>
    </div>
  </div>
</template>


<style scoped>

.dish_image {
  height: 100rpx;
  width: 100rpx;
}

.dish_panel>div, .button_panel>div {
  display: inline-block;
}

.dish_info {
  flex-grow: 1;
}

.dish_panel {
  height: 100rpx;
  width: 100%;
  display: flex;
  padding: 20rpx;
  box-sizing: border-box;
  align-items: center;
}
</style>

<script src="./dish.js"/>

