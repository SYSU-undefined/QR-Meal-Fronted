<template>
  <div class="outter-container">
    <navb></navb>
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

      <b-btn v-b-modal.modal1 @click="createStaff()">添加员工</b-btn>
      <b-btn variant="warning" @click="uploadChange()">确认修改</b-btn>
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
          <b-form-select v-model="newStaff.job" :options="jobOptions" class="mb-3" />
        </b-col>
      </b-row>
    </b-modal>


    <b-modal id="modal3" title="更新员工" @ok="updateStaff()">
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
          <b-form-select v-model="updateItem.job" :options="jobOptions" class="mb-3" />
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
  import navb from '../../components/navbar.vue';
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
        jobOptions: [
          '前台','后厨'
        ],
        newStaff: {
          name: null,
          job: null
        },
        delStaffs: [],
        updateStaffs: [],
        newStaffs: [],
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
    components: {
      navb,
    },
    methods: {
      uploadChange() {
        console.log(this.delStaffs,this.newStaffs,this.updateStaffs)
      },
      deleteStaff(index) {
        for (var i of this.newStaffs) {
          if (i == this.items[index]) {
            this.items.splice(index, 1);
            return;
          }
        }
        this.delStaffs.push(this.items[index]);
        this.items.splice(index, 1);
      },
      createStaff() {
        this.newStaff = {
          name: null,
          job: null
        }
      },
      addStaff() {
        this.items.push(this.newStaff);
        this.newStaffs.push(this.newStaff);
        this.totalRows = this.items.length;
      },
      setUpdate(item, ind) {
        this.updateItem = JSON.parse(JSON.stringify(item));
        this.updateItem.index = ind;
        this.$root.$emit('bv::show::modal','modal3')
      },
      updateStaff() {
        if (this.items[this.updateItem.index].name != this.updateItem.name || this.items[this.updateItem.index].job != this.updateItem.job) {
          let flag = true;
          for (var i of this.newStaffs) {
            if (i == this.items[this.updateItem.index]) flag = false;
          }
          if (flag) this.updateStaffs.push(this.items[this.updateItem.index]);
        }
        this.items[this.updateItem.index].name = this.updateItem.name;
        this.items[this.updateItem.index].job = this.updateItem.job;
      }
    }
  }

</script>
