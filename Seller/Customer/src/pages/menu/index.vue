<template>
  <div class="root">
    <div class="menu">
      <scroll-view class="tags">
        <div class="tag" :class="{selected: tag === selectedTag}" v-for="(tag, index) in tags" :key="tag" @click="tag_click(index)">{{tag}}</div>
      </scroll-view>
      <scroll-view class="dishes" scroll-y="true" @scroll="menu_scroll" :scroll-into-view="selectedTagIndexWrap">
        <div v-for="(tagedDish, tagIndex) of taged_dishes" :key="tagIndex" :id="'tag-' + tagIndex">
          <div class="menu-tag">{{tags[tagIndex]}}</div>
          <div v-for="(dish, index) of tagedDish" :key="index">
            <div class="dish_panel">
              <img class="dish_image" :src="dish.image">
              <div class="dish_info">
                <div class="dish_name">{{dish.name}}</div>
                <div class="dish_price">&yen;&nbsp;{{dish.price}}</div>
                <div class="button_panel">
                  <div v-if="dish.count > 0">
                    <i class="dish_btn fa fa-minus-circle" @click="remove_dish(tagIndex, index)"/>
                    <div class="dish_count">{{dish.count > 99 ? '99+' : dish.count}}</div>
                  </div>
                  <i class="dish_btn fa fa-plus-circle" @click="add_dish(tagIndex, index)"/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </scroll-view>
    </div>
    <div class="cart">
      <div class="cart-button">
        <i class="fa fa-shopping-cart"></i>
      </div>
      <div class="price">总计 {{totalPrice}} 元</div>
      <div class="submit" @click="submit">结算</div>
    </div>
  </div>
</template>

<script src="./menu.js">
</script>

<style scoped>
.root,
.tags,
.dishes {
  height: 100%;
}
.root > div {
  display: inline-block;
  position: absolute;
  width: 100%;
}
.root {
  position: relative;
}
.info {
  height: 130rpx;
  top: 0;
  background: #0E0E0E;
  color: white;
}
.menu {
  top: 0rpx;
  bottom: 100rpx;
}

.cart {
  bottom: 0;
  line-height: 100rpx;
  height: 100rpx;
}

.tags {
  float: left;
  width: 150rpx;
  background: #f0f0f0;
}
.tags > div {
  overflow: hidden;
}
.dishes {
  float: right;
  width: 600rpx;
}
.tag {
  overflow-wrap: break-word;
  overflow: hidden;
  text-align: center;
  height: 80rpx;
  line-height: 80rpx;
}

.menu-tag {
  text-align: left;
  background: #f0f0f0;
  font-size: 0.8em;
  height: 50rpx;
  line-height: 50rpx;
  padding-left: 10rpx;
}

.tag.selected {
  background: white;
}

.cart-button {
  height: 80rpx;
  width: 80rpx;
  border-radius: 50%;
  box-sizing: border-box;
  margin-left: 15rpx;
  line-height: 80rpx;
  text-align: center;
}
.cart > div {
  display: inline-block;
}
.submit {
  float: right;
  width: 200rpx;
  text-align: center;
  background: #f0f0f0;
}

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

