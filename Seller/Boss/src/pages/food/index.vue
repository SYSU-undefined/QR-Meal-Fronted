<template>
  <div class="outter-container">
    <navb></navb>
    <div class="inner-container">
      <div class="sidebar">
        <ul class="sidebar-list">
          <!-- <li class="sidebar-list-item sidebar-list-active-item">新品上市</li> -->
          <draggable v-model="types" :options="{group:'people'}" @start="drag=true" @end="drag=false">

            <li v-for="(t,i) in types" :key="'3'+i" @click="activeItem(i)" :class="[{'sidebar-list-active-item': t.isActive},'sidebar-list-item']"
              title="按住拖动以排序">
              <input :class="[{'active-item-input': t.isActive},'item-input']" v-model.lazy="t.name" @change="typeNameChange(i)"  @dblclick="t.edit=true" @blur="t.edit=false"
                :readonly="!t.edit" />
              <span class="sidebar-del" @click.stop="delType(t,i)">X</span>
            </li>
            <!-- <li class="sidebar-list-item">新品上市</li>
          <li class="sidebar-list-item">新品上市</li>
          <li class="sidebar-list-item">新品上市</li>
          <li class="sidebar-list-item">新品上市</li> -->
          </draggable>
        </ul>
        <b-button class="add-btn" @click="addNewType()">添加新分类</b-button>
        <b-button class="add-btn" v-if="this.types.length > 0" @click="addNewFood()">添加新餐品</b-button><br />
        <b-button class="add-btn" variant="warning" @click="uploadChange()">上传修改</b-button>
      </div>
      <div class="main-content">
        <div class="food-item-group">
          <div class="food-item" v-for="(f,ind) in selectedFoods" :key="'2'+ind">
            <span class="food-del" @click="delOldFood(ind)">X</span>
            <div class="img-upload" @click="uploadOldImg(f)" v-if="!f.image">
              <span>上传食物图片</span>
            </div>
            <img @click="uploadOldImg(f)" v-if="f.image" class="food-img" alt="食物图片" :src="f.url" />
            <div class="food-detail">
              <b-form-input :value="f.name" @change="(e)=>oldFoodPropertyChange(e,'name',f)" placeholder="输入食物名字" />
              <b-input-group size="sm" prepend="￥">
                <b-form-input :value="f.price" @change="(e)=>oldFoodPropertyChange(e,'price',f)" placeholder="输入食物价格"></b-form-input>
              </b-input-group>
            </div>
            <p class="food-des">
              <textarea :value="f.description" @change="(e)=>oldFoodPropertyChange(e.target.value,'description',f)" rows="2" placeholder="输入食物描述"></textarea>
            </p>
          </div>
          <div class="food-item" v-for="(f,ind) in newFoods[this.selectedType]" :key="'1'+ind">
            <span class="food-del" @click="delNewFood(ind)">X</span>
            <div class="img-upload" @click="uploadNewImg(f)" v-if="!f.image">
              <span>上传食物图片</span>
            </div>
            <img @click="uploadNewImg(f)" v-if="f.image" class="food-img" alt="食物图片" :src="f.url" />
            <div class="food-detail">
              <b-form-input v-model="f.name" placeholder="输入食物名字" />
              <b-input-group size="sm" prepend="￥">
                <b-form-input v-model="f.price" placeholder="输入食物价格"></b-form-input>
              </b-input-group>
            </div>
            <p class="food-des">
              <textarea v-model="f.description" rows="2" placeholder="输入食物描述"></textarea>
            </p>
          </div>
        </div>
      </div>
    </div>
    <b-modal id='upload' @ok="setOldImg()">
      <b-form-file v-model="cloneImg" :state="Boolean(cloneImg)" placeholder="选择食物图片" autocomplete="off"></b-form-file>
    </b-modal>
    <b-modal id='upload2' @ok="setNewImg()">
      <b-form-file v-model="cloneImg" accept=".jpg" :state="Boolean(cloneImg)" placeholder="选择食物图片" autocomplete="off"></b-form-file>
    </b-modal>
  </div>
</template>

<script>
  const fooditems = {
    '麻辣': [{
        name: '螺狮粉',
        price: 666,
        description: '麻辣香锅 --- 你没有吃过的船新版本',
        image: null,
        url: ''
      },
      {
        name: '麻辣烫',
        price: 666,
        description: '麻辣香锅 --- 你没有吃过的船新版本o',
        image: null,
        url: ''
      },
      {
        name: '挂面',
        price: 666,
        description: '麻辣香锅 --- 你没有吃过的船新版本a',
        image: null,
        url: ''
      },
    ]
  };
  const foodtypes = [{
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
        ];
  import draggable from 'vuedraggable';
  import navb from '../../components/navbar.vue';
  export default {
    data() {
      return {
        types: foodtypes,
        foods: fooditems,
        updateFoods: {},
        deleteFoods: {},
        newFoods: {},
        selectedFoods: [],
        selectedType: null,
        selectedFood: {},
        cloneImg: null,
        typeCnt: 0
      }
    },

    mounted() {
      this.requestFood();
      this.activeItem(0);
    },
    components: {
      draggable,
      navb
    },
    methods: {
      typeNameChange(i) {
        console.log(this.types[i].name, this.selectedType, this.foods);
        this.$set(this.foods, this.types[i].name, []);
        for (var it of this.foods[this.selectedType]) {
          this.foods[this.types[i].name].push(it);
          console.log(it)
        }
        this.$set(this.newFoods, this.types[i].name, this.newFoods[this.selectedType]);
        console.log(this.foods);
        this.foods[this.selectedType] = null;
        this.newFoods[this.selectedType] = null;
        this.selectedType = this.types[i].name;
        this.selectedFoods = this.foods[this.types[i].name];
        // console.log(i, this.selectedFoods, this.foods[this.selectedType])
      },
      activeItem(index) {
        // console.log(this.foods)
        for (var i = 0; i < this.types.length; i++) {
          if (i == index) {
            this.types[i].isActive = true;
            this.selectedType = this.types[i].name;
            this.selectedFoods = this.foods[this.types[i].name];
          } else this.types[i].isActive = false;
        }
        // console.log(this.selectedFoods);
      },
      addNewType() {
        this.types.push({
          name: '新类型'+this.typeCnt++,
          isActive: false,
          edit: false
        });

        this.$set(this.foods, this.types[this.types.length-1].name, []);
        if (this.types.length == 1) this.activeItem(0);
      },
      addNewFood() {
        if (!this.newFoods[this.selectedType]) this.$set(this.newFoods, this.selectedType, [])
        this.newFoods[this.selectedType].push({
          name: '',
          price: 0,
          description: '',
          image: null,
          url: ''
        })
      },
      requestFood(typename) {

      },
      uploadChange() {
        console.log(this.updateFoods, this.newFoods,this.deleteFoods);
      },
      uploadOldImg(f) {
        this.selectedFood = f;
        this.cloneImg = null;
        this.$root.$emit('bv::show::modal', 'upload');
      },
      uploadNewImg(f) {
        this.selectedFood = f;
        this.cloneImg = null;
        this.$root.$emit('bv::show::modal', 'upload2');
      },
      setOldImg() {
        console.log(this.cloneImg);
        if (this.cloneImg==null) return;
        let fr = new FileReader();
        let url = fr.readAsDataURL(this.cloneImg);
        var t = this.selectedFood;
        var that = this;
        fr.onload = function () {
          t['url'] = this.result;
          that.oldFoodPropertyChange(that.cloneImg, 'image', t);
        }
      },
      setNewImg() {
        if (this.cloneImg==null) return;
        let fr = new FileReader();
        let url = fr.readAsDataURL(this.cloneImg);
        var t = this.selectedFood;
        var that = this;
        fr.onload = function () {
          t['url'] = this.result;
          t.image = that.cloneImg;
        }
      },
      delOldFood(ind) {
        if (!this.deleteFoods[this.selectedType]) this.$set(this.deleteFoods, this.selectedType, []);
        this.deleteFoods[this.selectedType].push(this.foods[this.selectedType][ind]);
        if (this.updateFoods[this.selectedType]){
          for (var i = 0; i < this.updateFoods[this.selectedType].length; i++) {
            if (this.updateFoods[this.selectedType][i] == this.foods[this.selectedType][ind]) {
              this.updateFoods[this.selectedType].splice(i, 1);
              break;
            }
          }
        }
        this.foods[this.selectedType].splice(ind, 1);
        
        console.log(this.deleteFoods, this.updateFoods);
      },
      delNewFood(ind) {
        this.newFoods[this.selectedType].splice(ind, 1);
      },
      delType(t, ind) {
        this.types.splice(ind, 1);
        console.log(this.selectedType in this.foods)
        if (!(this.selectedType in this.foods)) {
          this.activeItem(0);
          return;
        }
        if (!this.deleteFoods[this.selectedType]) {
          this.$set(this.deleteFoods, this.selectedType, []);
        }
        this.updateFoods[this.selectedType] = null;
        this.deleteFoods[this.selectedType] = this.foods[this.selectedType];
        this.activeItem(0);
        console.log(this.deleteFoods, this.updateFoods);
      },
      oldFoodPropertyChange(val, p, f) {
        f[p] = val;
        if (!this.updateFoods[this.selectedType]) {
          this.$set(this.updateFoods, this.selectedType, [])
          this.updateFoods[this.selectedType].push(f);
        } else {
          for (var i = 0; i < this.updateFoods[this.selectedType].length; i++) {
            if (f == this.updateFoods[this.selectedType][i]) return;
          }
          this.updateFoods[this.selectedType].push(f);
        }
      },

    }
  }

</script>


<style scoped>
  .food-del {
    color: red;
    font-size: 20px;
    position: absolute;
    top: 0;
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

  .img-upload {
    height: 50%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    border-width: .2rem;
    border: solid #f7f7f9;
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

  .sidebar-del {
    color: red;
    font-size: 20px;
    position: absolute;
    top: 0;
    right: 2px;
    vertical-align: text-top;
    cursor: pointer;
  }

  .sidebar-list-item {
    cursor: pointer;
    text-align: center;
    color: rgb(191, 203, 217);
    padding: 1rem;
    position: relative;

  }

  .food-item-group {
    flex: 5;
    background-color: white;
    padding: 10px;
    display: flex;
    flex-wrap: wrap;

    justify-content: flex-start;
  }

  .food-item {
    flex-grow: 0;
    width: 30%;
    padding-top: 20px;
    padding-left: 10px;
    padding-right: 10px;
    margin: 0 0 20px 0;
    min-height: 500px;
    max-height: 500px;
    border-width: .2rem;
    border: solid #f7f7f9;
    position: relative;
    overflow: auto;
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

    overflow-y: scroll;
  }

</style>
