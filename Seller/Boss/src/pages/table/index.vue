<template>
  <div class="outter-container">
    <navb></navb>
    <b-container>
      <b-table striped hover :items="items" :fields="fields" :current-page="currentPage" :per-page="perPage">
        <template slot="actions" slot-scope="row">
          <!-- We use @click.stop here to prevent a 'row-clicked' event from also happening -->
          <b-button size="sm" @click.stop="setUpdate(row.item)">
            修改
          </b-button>
          <b-button size="sm" class="mr-1" variant="danger" @click.stop="deleteTable(row.item.tid)">
            删除
          </b-button>
        </template>
      </b-table>
      <b-row  align-h="end">
      <b-col cols="4">
        <b-pagination :total-rows="totalRows" :per-page="perPage" v-model="currentPage" class="my-0" />
      </b-col>
    </b-row>

      <b-btn v-b-modal.modal1>添加餐桌</b-btn>
      <b-btn v-b-modal.modal2>批量添加餐桌</b-btn>

    </b-container>


    <b-modal id="modal1" title="添加餐桌" @ok="addTable()">
      <b-row class="my-1">
        <b-col sm="3">
          <label>餐桌编号</label>
        </b-col>
        <b-col sm="9">
          <b-form-input type="number" v-model="newTable.tid"></b-form-input>
        </b-col>
      </b-row>
      <b-row class="my-1">
        <b-col sm="3">
          <label>餐桌人数</label>
        </b-col>
        <b-col sm="9">
          <b-form-input type="number" v-model="newTable.capacity"></b-form-input>
        </b-col>
      </b-row>
      <b-row class="my-1">
        <b-col sm="3">
          <label>餐桌类型</label>
        </b-col>
        <b-col sm="9">
          <b-form-input type="text" v-model="newTable.type"></b-form-input>
        </b-col>
      </b-row>
    </b-modal>

    <b-modal id="modal2" title="批量添加餐桌" @ok="addTables()">
      <b-row class="my-1">
        <b-col sm="3">
          <label>餐桌数量</label>
        </b-col>
        <b-col sm="9">
          <b-form-input type="number" v-model="newTables.total" ></b-form-input>
        </b-col>
      </b-row>
      <b-row class="my-1">
        <b-col sm="3">
          <label>餐桌编号范围起点</label>
        </b-col>
        <b-col sm="9">
          <b-form-input type="number" v-model="newTables.start"></b-form-input>
        </b-col>
      </b-row>
      <b-row class="my-1">
        <b-col sm="3">
          <label>餐桌人数</label>
        </b-col>
        <b-col sm="9">
          <b-form-input type="number" v-model="newTables.capacity"></b-form-input>
        </b-col>
      </b-row>
      <b-row class="my-1">
        <b-col sm="3">
          <label>餐桌类型</label>
        </b-col>
        <b-col sm="9">
          <b-form-input type="text" v-model="newTables.type"></b-form-input>
        </b-col>
      </b-row>

    </b-modal>

    <b-modal id="modal3" title="更新餐桌" @ok="updateTable()">
      <b-row class="my-1">
        <b-col sm="3">
          <label>餐桌编号</label>
        </b-col>
        <b-col sm="9">
          <b-form-input type="number" v-model="updateItem.tid"></b-form-input>
        </b-col>
      </b-row>
      <b-row class="my-1">
        <b-col sm="3">
          <label>餐桌人数</label>
        </b-col>
        <b-col sm="9">
          <b-form-input type="number" v-model="updateItem.capacity"></b-form-input>
        </b-col>
      </b-row>
      <b-row class="my-1">
        <b-col sm="3">
          <label>餐桌类型</label>
        </b-col>
        <b-col sm="9">
          <b-form-input type="text" v-model="updateItem.type"></b-form-input>
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
  const items = [{
      tid: 1,
      capacity: 4,
      type: '普通桌子'
    },
    {
      tid: 2,
      capacity: 4,
      type: '普通桌子'
    },
    {
      tid: 3,
      capacity: 4,
      type: '包厢'
    },
    {
      tid: 4,
      capacity: 4,
      type: '包厢'
    }
  ]

  export default {
    data() {
      return {
        items: [{
            tid: 1,
            capacity: 4,
            type: '普通桌子'
          },
          {
            tid: 2,
            capacity: 4,
            type: '普通桌子'
          },
          {
            tid: 3,
            capacity: 4,
            type: '包厢'
          },
          {
            tid: 4,
            capacity: 4,
            type: '包厢'
          }
        ],
        fields: [{
            key: 'tid',
            label: '餐桌编号',
            sortable: true,
            sortDirection: 'desc'
          },
          {
            key: 'capacity',
            label: '容纳人数',
            sortable: true
          },
          {
            key: 'type',
            label: '餐桌类型'
          },
          {
            key: 'actions',
            label: '操作'
          }
        ],
        newTable: {
          tid: null,
          capacity: null,
          type: null
        },
        newTables: {
          total: null,
          start: null,
          capacity: null,
          type: null
        },
        currentPage: 1,
        perPage: 8,
        totalRows: items.length,
        updateItem : {
          tid: null,
          capacity: null,
          type: null
        }
      }
    },
    components: {
      navb,
    },
    methods: {
      deleteTable(tid) {
        for (var i = 0; i < this.items.length; i++) {
          if (this.items[i].tid == tid) {
            this.items.splice(i, 1)
            return;
          }
        }
      },
      
      createTable() {
        this.newTable = {
          tid: null,
          capacity: null,
          type: null
        }
      },
      createTables() {
        this.newTables = {
          total: null,
          start: null,
          capacity: null,
          type: null
        }
      },
      addTable() {
        this.items.push(this.newTable);
        this.totalRows = this.items.length;
      },
      addTables() {
        for (var i = 0; i < this.newTables.total; i++) {
          this.items.push({
            tid: this.newTables.start++,
            type: this.newTables.type,
            capacity: this.newTables.capacity
          })
        }
        this.totalRows = this.items.length;
      },
      setUpdate(item) {
        this.updateItem = JSON.parse(JSON.stringify(item));
        this.$root.$emit('bv::show::modal','modal3')
      },
      updateTable() {
        for (var i of this.items) {
          if (i.tid == this.updateItem.tid) {
            i.type = this.updateItem.type;
            i.capacity = this.updateItem.capacity;
            return;
          }
        }
      }
    }
  }

</script>
