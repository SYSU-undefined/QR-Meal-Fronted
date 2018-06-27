<template>
<div>
  <div class="container">
    <h3 class="title">菜单</h3>
    <ul id="unfinish" class="food-item-list">
      <li>
        <div class="food-item" v-for="(f,i) in foodList" :key="i">
          <h5 class="food-item-table">{{f.table}}桌</h5>
          <p class="food-item-name">{{f.name}}</p>
          <p class="food-item-note">{{f.note}}</p>
          <button class="food-item-btn" @click="changeFoodState(f)">{{f.state == 0 ? '未上菜': '已上菜'}}</button>
        </div>
      </li>
    </ul>
  </div>
  </div>
</template>
<style scoped>
#finished {
  display: none;
}
.title {
  width: 100%;
  border-bottom: 1px solid black;
  text-align: center;
}
.food-item-name {
  font-size: 1em;
  font-weight: bold;
}
.food-item-list {
  width: 100%;
  overflow: hidden;
  margin-bottom: 48px ;
}
.food-item-note {
  color:coral;
  font-size: 1.1em;
}
.food-item-btn {
  background-color:#1AAD19;
  color: white;
}
.food-item {
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
      foodList: [
        {
          name: '麻婆豆腐',
          table: '23',
          note: '加辣加麻',
          state: 0
        },
      ]
    }
  },
  created () {

  },
  methods: {
    changeFoodState(f) {
      if (f.state < 1)
        f.state += 1;
    },
  },
}
</script>

