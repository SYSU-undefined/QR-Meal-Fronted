<template>
<div>
  <div class="container">
    <ul id="unfinish" class="food-item-list">
      <li>
        <div class="table-item" v-for="(f,i) in waitList" :key="i">
          <h5 class="table-item-num">第{{f.number}}号</h5>
          <p class="table-item-cap">人数: {{f.capacity}}</p>
          <button class="table-item-btn" @click="setDown(i)">安排就餐</button>
        </div>
      </li>
    </ul>
    <div v-if="waitList.length == 0">无人等待</div>
  </div>
    <div class="tabbar">
      <div  @click="switchTo('/pages/waiter/index/main')" class="tabbar-item">
        <i class="fa fa-wrench"></i>
        <span class="tabbar-item-title">餐桌列表</span>
      </div>
      <div class="tabbar-item" style="color:black">
        <i class="fa fa-check-square"></i>
        <span class="tabbar-item-title">叫号</span>
      </div>
    </div>
  </div>
</template>
<style scoped>
#finished {
  display: none;
}

.table-item-num {
  font-size: 1em;
  font-weight: bold;
}
.food-item-list {
  width: 100%;
  overflow: hidden;
  margin-bottom: 48px;
}

.table-item-btn {
  background-color:#1AAD19;
  color: white;
  margin: 10px 0;
}
.btn-warn {
    background-color: #E64340;
}
.table-item {
  width: 100%;
  text-align: center;
  padding: 10px 0;
  border-bottom: 1px solid black;
  margin: 10px 0;
  background-color:rgba(184, 195, 196, 0.822);
}
.container {
  height: 100%;
  display: flex;
  align-items: center;
  /* justify-content: space-between; */
  padding: 0;
  overflow: hidden;

}
.tabbar {
  display: flex;
  position: fixed;
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
  cursor: pointer;
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
      waitList: [
        {
          number: 10,
          capacity: 4
        },
      ]
    }
  },
  created () {

  },
  methods: {
    changeTableState(f) {
      if (f.state < 1)
        f.state += 1;
    },
    switchTo(url) {
      wx.reLaunch({url});
    },
    setDown(ind) {
      this.waitList.splice(ind,1);
    }
  },
  async onPullDownRefresh() {
    console.log("下拉刷新")
    wx.stopPullDownRefresh();
  },
}
</script>

