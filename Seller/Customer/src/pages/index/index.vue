<template>
  <div class="root">
    <div class="user-info">
      <image class="avatar" :src="userInfo.avatarUrl"/>
      <div class="name">{{userInfo.nickName}}</div>
    </div>
    <div class="function-area">
      <div class="button-wrap" @click="scanCode">
        <div class="icon-wrap qrcode">
          <i class="fa fa-qrcode"/>
        </div>
        <div>扫码点餐</div>
      </div>
      <div class="button-wrap" @click="toOrderStatus">
        <div class="icon-wrap order-status">
          <i class="fa fa-utensils"/>
        </div>
        <div>上菜进度</div>
      </div>
      <div class="button-wrap" @click="toOrders">
        <div class="icon-wrap order">
          <i class="fa fa-history"/>
        </div>
        <div>历史订单</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.root,
.user-info,
.function-area {
  width: 100%;
}

.avatar {
  height: 150rpx;
  width: 150rpx;
  border-radius: 50%;
}

.name {
  display: inline-block;
  margin-left: 34px;
}

.user-info {
  display: flex;
  align-items: center;
  box-sizing: border-box;
  padding: 30rpx 80rpx;
}

.function-area {
  display: flex;
  justify-content: space-around;
}

.button-wrap {
  display: inline-block;
}

.button-wrap > div {
  text-align: center;
  margin-left: auto;
  margin-right: auto;
}

i {
  font-size: 2em;
  color: white;
}

.icon-wrap {
  border-radius: 50%;
  height: 3em;
  width: 3em;
  display: flex;
  align-items: center;
  justify-content: center;
}

.icon-wrap.qrcode {
  background: #0076FF;
}

.icon-wrap.order-status {
  background: #F7D002;
}

.icon-wrap.order {
  background: #FF4081;
}

</style>


<script src="./vue.js">
</script>