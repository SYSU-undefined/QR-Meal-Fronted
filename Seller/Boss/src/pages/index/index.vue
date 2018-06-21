<template>
  <div class="outter-container">
    <b-navbar toggleable="md" type="dark" variant="dark">

      <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

      <b-navbar-brand href="#">餐厅管理系统</b-navbar-brand>

      <b-collapse is-nav id="nav_collapse">
        <b-navbar-nav>
          <b-nav-item href="#">餐品管理</b-nav-item>
          <b-nav-item href="#">餐桌管理</b-nav-item>
          <b-nav-item href="#">人员管理</b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <div class="inner-container">
      <div class="sidebar">
        <ul class="sidebar-list">
          <!-- <li class="sidebar-list-item sidebar-list-active-item">新品上市</li> -->
          <draggable v-model="types" :options="{group:'people'}" @start="drag=true" @end="drag=false">

            <li v-for="(t,i) in types" :key="t.name" @click="activeItem(i)" :class="[{'sidebar-list-active-item': t.isActive},'sidebar-list-item']"
              title="按住拖动以排序">
              <input :class="[{'active-item-input': t.isActive},'item-input']" v-model.lazy="t.name" @dblclick="t.edit=true" @blur="t.edit=false"
                :readonly="!t.edit" />
            </li>
            <!-- <li class="sidebar-list-item">新品上市</li>
          <li class="sidebar-list-item">新品上市</li>
          <li class="sidebar-list-item">新品上市</li>
          <li class="sidebar-list-item">新品上市</li> -->
          </draggable>
        </ul>
        <b-button class="add-btn" @click="addNewType()">添加新分类</b-button>
        <b-button class="add-btn" @click="addNewFood()">添加新餐品</b-button>
      </div>
      <div class="main-content">
        <div class="food-item-group">
          <div class="food-item"  v-for="f in selectedFoods" :key="f.description">
            <img class="food-img" alt="食物图片" src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1529453433&di=70ad1c754dcc750f4fcfba2edcf61ff3&imgtype=jpg&er=1&src=http%3A%2F%2Fimg.juimg.com%2Ftuku%2Fyulantu%2F121020%2F240425-12102020030650.jpg"
            />
            <div class="food-detail">
              <input v-model.lazy="f.name" placeholder="输入食物名字">
              <label>￥</label><input v-model.lazy="f.price" placeholder="输入食物价格">
            </div>


            <p class="food-des">
              <textarea v-model.lazy="f.description" placeholder="输入食物描述"></textarea>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import draggable from 'vuedraggable'
  export default {
    data() {
      return {
        types: [{
            name: '麻辣',
            isActive: false,
            edit: false
          },
          {
            name: '微辣',
            isActive: false,
            edit: false
          },
          {
            name: '重辣',
            isActive: false,
            edit: false
          }
        ],
        foods: {
          '麻辣': [
            {
              name: '螺狮粉',
              price: 666,
              description: '麻辣香锅 --- 你没有吃过的船新版本',
              image: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1529453433&di=70ad1c754dcc750f4fcfba2edcf61ff3&imgtype=jpg&er=1&src=http%3A%2F%2Fimg.juimg.com%2Ftuku%2Fyulantu%2F121020%2F240425-12102020030650.jpg"
            },
            {
              name: '螺狮粉',
              price: 666,
              description: '麻辣香锅 --- 你没有吃过的船新版本o',
              image: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1529453433&di=70ad1c754dcc750f4fcfba2edcf61ff3&imgtype=jpg&er=1&src=http%3A%2F%2Fimg.juimg.com%2Ftuku%2Fyulantu%2F121020%2F240425-12102020030650.jpg"
            },
            {
              name: '螺狮粉',
              price: 666,
              description: '麻辣香锅 --- 你没有吃过的船新版本a',
              image: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1529453433&di=70ad1c754dcc750f4fcfba2edcf61ff3&imgtype=jpg&er=1&src=http%3A%2F%2Fimg.juimg.com%2Ftuku%2Fyulantu%2F121020%2F240425-12102020030650.jpg"
            },
          ]
        },
        selectedFoods : [],
        selectedType : null
      }
    },

    mounted() {
      this.activeItem(0);
    },
    components: {
      draggable,
    },
    methods: {
      activeItem(index) {
        for (var i = 0; i < this.types.length; i++) {
          if (i == index) {
            this.types[i].isActive = true;
            this.selectedType = this.types[i].name;
            this.selectedFoods = this.foods[this.types[i].name];
          }
          else this.types[i].isActive = false;
        }
      },
      addNewType() {
        this.types.push({
          name: '新类型',
          isActive: false,
          edit: false
        });
      },
      addNewFood() {
        this.foods[this.selectedType].push({
          name: '',
          price: 0,
          description: '',
          image: '',
        })
      },
      requestFood(typename) {

      },
      uploadChange() {

      }
    }
  }

</script>


<style scoped>
  .active-item-input {
    background-color: rgb(38, 52, 69) !important;
    color: rgb(64, 158, 255) !important;
  }

  .item-input {
    display: inline-block;
    background-color: rgb(48, 65, 86);
    border: none;
    color: rgb(191, 203, 217);
    text-align: center;
    min-width: 10px;
    cursor: pointer;
  }

  .add-btn {
    margin-top: 10px;
  }

  .food-detail {
    padding-top: 10px;
  }
  .food-detail h5 {
    display: inline-block;
    margin-right: 50px;
  }
  .food-des {
    padding-top: 10px;
  }

  .food-des textarea {
    width: 100%;
  }

  .food-img {
    height: 50%;
    width: 100%;
  }

  .sidebar-list {
    list-style: none;
    margin: 0;
    padding: 0;
    width: 100%;

  }

  .sidebar-list-active-item {
    background-color: rgb(38, 52, 69);
    color: rgb(64, 158, 255) !important;
  }



  .sidebar-list-item {
    cursor: pointer;
    text-align: center;
    color: rgb(191, 203, 217);
    padding: 1rem;

  }
  .food-item-group {
    flex: 5;
    background-color: white;
    padding: 10px;
    display: flex;
    flex-wrap: wrap;

    justify-content: space-around;
  }
  .food-item {
    flex-grow: 0;
    width: 30%;
    padding: 10px;
    margin: 0;
    height: 30vh;
    border-width: .2rem;
    border: solid #f7f7f9;
  }


  .outter-container {
    height: 100vh;
    display: flex;
    flex-direction: column;
  }

  .inner-container {
    height: 100vh;
    width: 100%;
    margin: 0;
    display: flex;
  }

  .sidebar {
    background-color: rgb(48, 65, 86);
    padding-top: 15px;
    height: 100%;
    flex: 1;
    text-align: center;
  }

  .main-content {
    flex: 5;
    background-color: white;
    padding: 10px;
    display: flex;
    flex-wrap: wrap;

    justify-content: space-between;

    overflow-y:scroll;
  }

</style>
