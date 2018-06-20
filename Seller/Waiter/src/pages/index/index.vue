<template>
  <div class="container">
    <div class="content">
      <div class="content-row avatar-row">
        <img class="avatar" v-if="userInfo.avatarUrl" :src="userInfo.avatarUrl" background-size="cover" />
      </div>
      <div class="content-row">
        <div class="input-row">
          <div class="input-row-hd">
           <label>商家名</label>
          </div>
          <input class="weui-input" :value="userInfo.name"/>
        </div>
      </div>
      <div class="content-row">
        <div class="input-row">
          <div class="input-row-hd">
           <label>商家电话</label>
          </div>
          <input class="weui-input" :value="userInfo.phone"/>
        </div>
      </div>
      <div class="content-row">
        <div class="input-row">
          <div class="input-row-hd">
           <label>商家地址</label>
          </div>
          <input class="weui-input" :value="userInfo.address"/>
        </div>
      </div>
    </div>

    <div class="tabbar">
      <a href="#" class="tabbar-item">
        <i class="fa fa-address-card"></i>
        <span class="tabbar-item-title">商家主页</span>
      </a>
      <a href="#" class="tabbar-item">
        <i class="fa fa-shopping-basket"></i>
        <span class="tabbar-item-title">商品管理</span>
      </a>
      <a href="#"  class="tabbar-item">
        <i class="fa fa-user"></i>
        <span class="tabbar-item-title">服务员</span>
      </a>
      <a href="#"  class="tabbar-item">
        <i class="fa fa-fire"></i>
        <span class="tabbar-item-title">后厨</span>
      </a>
    </div>
  </div>
</template>
<style scoped>
.container {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0;
  overflow: auto;
  background-color: #f8f8f8;
}
.content {

  width: 100%;
  align-items: center;
}
.content-row {
  display: block;
  padding: 20px 15px ;
}
.input-row-hd {
  overflow: hidden;
  text-align: left;
  width: 105px;
  padding-right: 15px;
}

.input-row {
  display: flex;
  padding: 10px 15px;
  background-color: #ffffff;
  line-height: 1.41176471;
  align-items: center;
  justify-content:center;
}

.weui-input {
    width: 100%;
    border: 0;
    outline: 0;
    -webkit-appearance: none;
    background-color: transparent;
    font-size: inherit;
    color: inherit;
    height: 1.47058824em;
    line-height: 1.47058824;
}

.content-input {
  background-color: #ffffff;
}

.avatar-row {
  text-align: center;
}
.avatar {
  display: inline-block;
  width: 128rpx;
  height: 128rpx;
  margin: 20rpx;
  border-radius: 50%;
}

.header {
  width: 100%;
  text-align: center;
  border-bottom: 1px solid gray;
}
.tabbar {
  display: flex;
  position: absolute;
  z-index: 500;
  bottom: 0;
  width: 100%;
  background-color: #F7F7FA;
}

.tabbar-item {
  display: block;
  flex: 1;
  padding: 5px 0 0;
  /* font-size: 0; */
  color: #808080;
  text-align: center;
}
.tabbar-item-title {
  display:block;
  font-size: 15px;
}
</style>



<script>


export default {
  data () {
    return {
      userInfo: {
        name: `Yellow Master`,
        phone: `666666`,
        address: `SYSU`,
        avatarUrl: ``
      }
    }
  },
  created () {
    // 调用应用实例的方法获取全局数据
    this.getUserInfo()
  },
  methods: {
    getUserInfo () {
      // 调用登录接口
      wx.login({
        success: () => {
          wx.getUserInfo({
            success: (res) => {
              this.userInfo.avatarUrl = res.userInfo.avatarUrl
            }
          })
        }
      })
    },
    clickHandle (msg, ev) {
      console.log('clickHandle:', msg, ev)
    }
  },
}
</script>

