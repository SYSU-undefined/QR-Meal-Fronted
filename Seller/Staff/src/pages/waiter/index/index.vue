<template>
<div>
  <div class="container">
    <ul id="unfinish" class="food-item-list">
      <li>
        <div class="table-item" v-for="(f,i) in tableList" :key="i">
          <h5 class="table-item-num">{{f.table}}桌</h5>
          <p class="table-item-cap">人数: {{f.capacity}}</p>
          <p class="table-item-state">当前状态: {{f.state == 0? '空闲':'用餐中'}}</p>
          <p class="table-item-state" v-if="f.state == 1">支付状态: {{f.payState == 0? '未支付':'已支付'}}</p>
          <button v-if="f.state == 1" class="table-item-btn" @click="getMenu()">查看菜单</button>
          <button v-if="f.state == 1" class="table-item-btn btn-warn" @click="freeTable(f)">顾客离桌</button>
        </div>
      </li>
    </ul>
  </div>
    <div class="tabbar">
      <a href="../index/main" class="tabbar-item">
        <i class="fa fa-wrench"></i>
        <span class="tabbar-item-title">餐桌列表</span>
      </a>
      <a href="../call/main" class="tabbar-item">
        <i class="fa fa-check-square"></i>
        <span class="tabbar-item-title">叫号</span>
      </a>
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
  margin-bottom: 48px ;
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
      tableList: [
        {
          table: '23',
          capacity: 4,
          state: 0,
          payState: 0
        },
        {
          table: '23',
          capacity: 4,
          state: 0,
          payState: 0
        },
        {
          table: '23',
          capacity: 4,
          state: 1,
          payState: 0
        },
        {
          table: '23',
          capacity: 4,
          state: 0,
          payState: 0
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
    getMenu() {
        var url = "../menu/main"
        wx.navigateTo({url})
    },
    freeTable(f) {
        f.state = 0;
    }
  },
}
</script>

