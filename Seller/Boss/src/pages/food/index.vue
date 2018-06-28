<template>
  <div class="outter-container">
    <navb></navb>
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
          <div class="food-item"  v-for="(f,ind) in selectedFoods" :key="f.description">
            <span class="food-del" @click="delFood(ind)">X</span>
            <b-button @click="uploadImg(f)" v-if="!f.image">上传食物图片</b-button>
            <img @click="uploadImg(f)"  v-if="f.image" class="food-img" alt="食物图片"
            />
            <div class="food-detail">
              <b-form-input v-model.lazy="f.name" placeholder="输入食物名字"/>
              <b-input-group size="sm" prepend="￥">
                <b-form-input v-model.lazy="f.price" placeholder="输入食物价格"></b-form-input>
               </b-input-group>
            </div>
            <p class="food-des">
              <b-form-textarea v-model.lazy="f.description" placeholder="输入食物描述"></b-form-textarea>
            </p>
          </div>
        </div>
      </div>
    </div>
    <b-modal id='upload' @ok="setImg()">
       <b-form-file v-model="selectedFood.image" :state="Boolean(selectedFood.image)" placeholder="选择食物图片"></b-form-file>
    </b-modal>
  </div>
</template>

<script>
  import draggable from 'vuedraggable';
  import navb from '../../components/navbar.vue';
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
              image: null
            },
            {
              name: '螺狮粉',
              price: 666,
              description: '麻辣香锅 --- 你没有吃过的船新版本o',
              image: null
            },
            {
              name: '螺狮粉',
              price: 666,
              description: '麻辣香锅 --- 你没有吃过的船新版本a',
              image: null
            },
          ]
        },
        selectedFoods : [],
        selectedType : null,
        selectedFood: {}
      }
    },

    mounted() {
      this.activeItem(0);
    },
    components: {
      draggable,navb
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
          image: null,
        })
      },
      requestFood(typename) {

      },
      uploadChange() {

      },
      uploadImg(f) {
        this.selectedFood = f;
        this.$root.$emit('bv::show::modal','upload');
      },
      setImg() {
        console.log(this.selectedFood);
        let fr = new FileReader();
        let url = fr.readAsDataURL(this.selectedFood.image);
      }
    }
  }

</script>


<style scoped>
  .food-del {
    color:red;
    font-size: 20px;
    position: absolute;
    top:0;
    right: 0;
    vertical-align: text-top;
    cursor: pointer;
  }
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
    cursor: pointer;
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
    padding-top: 20px;
    padding-left: 10px;
    padding-right: 10px;
    margin: 0;
    max-height: 50vh;
    border-width: .2rem;
    border: solid #f7f7f9;
    position: relative;
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
