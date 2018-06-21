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
            <b-nav-item href="#">订单管理</b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <b-container>
      <b-table striped hover :items="items" :fields="fields" :current-page="currentPage" :per-page="perPage">
        <template slot="actions" slot-scope="row">
          <!-- We use @click.stop here to prevent a 'row-clicked' event from also happening -->
          <b-button size="sm" @click.stop="setUpdate(row.item, row.index)">
            修改
          </b-button>
          <b-button size="sm" class="mr-1" variant="danger" @click.stop="deleteStaff(row.index)">
            删除
          </b-button>
        </template>
      </b-table>
      <b-row  align-h="end">
      <b-col cols="4">
        <b-pagination :total-rows="totalRows" :per-page="perPage" v-model="currentPage" class="my-0" />
      </b-col>
    </b-row>

      <b-btn v-b-modal.modal1>添加员工</b-btn>

    </b-container>


    <b-modal id="modal1" title="添加员工" @ok="addStaff()">
      <b-row class="my-1">
        <b-col sm="3">
          <label>员工姓名</label>
        </b-col>
        <b-col sm="9">
          <b-form-input type="text" v-model="newStaff.name"></b-form-input>
        </b-col>
      </b-row>
      <b-row class="my-1">
        <b-col sm="3">
          <label>员工职位</label>
        </b-col>
        <b-col sm="9">
          <b-form-input type="text" v-model="newStaff.job"></b-form-input>
        </b-col>
      </b-row>
    </b-modal>


    <b-modal id="modal3" title="更新餐桌" @ok="updateStaff()">
      <b-row class="my-1">
        <b-col sm="3">
          <label>员工姓名</label>
        </b-col>
        <b-col sm="9">
          <b-form-input type="text" v-model="updateItem.name"></b-form-input>
        </b-col>
      </b-row>
      <b-row class="my-1">
        <b-col sm="3">
          <label>员工职位</label>
        </b-col>
        <b-col sm="9">
          <b-form-input type="text" v-model="updateItem.job"></b-form-input>
        </b-col>
      </b-row>
    </b-modal>
  </div>
</template>

<style scoped>
  .outter-container {
    height: 100vh;
    display: flex;
    flex-direction: column;
  }

</style>


<script>
  export default {
    data() {
      return {
        items: [{
            name: '张三',
            job: '前台'

          },
          {
            name: '李四',
            job: '后厨'
          }
        ],
        fields: [{
            key: 'name',
            label: '姓名',
            sortable: true,
          },
          {
            key: 'job',
            label: '职务',
            sortable: true
          },
          {
            key: 'actions',
            label: '操作'
          }
        ],
        newStaff: {
          name: null,
          job: null
        },
        currentPage: 1,
        perPage: 8,
        totalRows: 2,
        updateItem : {
            name: null,
            job: null,
            index: null
        }
      }
    },
    methods: {
      deleteStaff(index) {
        this.items.splice(index, 1)
      },
      createStaff() {
        this.newStaff = {
          name: null,
          job: null
        }
      },
      addStaff() {
        this.items.push(this.newStaff);
        this.totalRows = this.items.length;
      },
      setUpdate(item, ind) {
        this.updateItem = JSON.parse(JSON.stringify(item));
        this.updateItem.index = ind;
        this.$root.$emit('bv::show::modal','modal3')
      },
      updateStaff() {
          this.items[this.updateItem.index].name = this.updateItem.name;
          this.items[this.updateItem.index].job = this.updateItem.job;
      }
    }
  }

</script>
