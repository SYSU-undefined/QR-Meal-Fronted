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
          <b-button size="sm" @click.stop="getOrder(row.item.id)">
            查看详情
          </b-button>

        </template>
      </b-table>
      <b-row  align-h="end">
      <b-col cols="4">
        <b-pagination :total-rows="totalRows" :per-page="perPage" v-model="currentPage" class="my-0" />
      </b-col>
    </b-row>



    </b-container>


    <b-modal id="modal1" title="订单详情">

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
  const items = [{
      total: 100,
      table: 4,
      date: new Date().toString()
    },
    {
      total: 500,
      table: 4,
      date: new Date().toString()
    },
    {
      total: 101,
      table: 4,
      date: new Date().toString()
    },
    {
      total: 102,
      table: 4,
      date: new Date().toString()
    },
  ]

  export default {
    data() {
      return {
        items: items,
        fields: [{
            key: 'total',
            label: '总价',
            sortable: true,
          },
          {
            key: 'table',
            label: '餐桌号',
            sortable: true
          },
          {
            key: 'date',
            label: '用餐日期'
          },
          {
            key: 'actions',
            label: '操作'
          }
        ],
        currentPage: 1,
        perPage: 8,
        totalRows: items.length,
        detailItem : null
      }
    },
    methods: {
      
    }
  }

</script>
