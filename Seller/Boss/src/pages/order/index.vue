<template>
  <div class="outter-container">
    <navb></navb>
    <b-container>
      <b-table striped hover :items="items" :fields="fields" :current-page="currentPage" :per-page="perPage">
        <template slot="actions" slot-scope="row">
          <!-- We use @click.stop here to prevent a 'row-clicked' event from also happening -->
          <b-button size="sm" @click.stop="getDetail(row.item.order_id)">
            查看详情
          </b-button>

        </template>
      </b-table>
      <b-row align-h="end">
        <b-col cols="4">
          <b-pagination :total-rows="totalRows" :per-page="perPage" v-model="currentPage" class="my-0" />
        </b-col>
      </b-row>



    </b-container>


    <b-modal id="modal1" title="订单详情">
      <b-list-group>
        <b-list-group-item v-for="it in detailItem.order_items" :key="it.item_id">
          <h5>it.name</h5>
        </b-list-group-item>
      </b-list-group>
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
  Date.prototype.Format = function (format) {
    var o = {
      "M+": this.getMonth() + 1, //month 
      "d+": this.getDate(), //day 
      "h+": this.getHours(), //hour 
      "m+": this.getMinutes(), //minute 
      "s+": this.getSeconds(), //second 
      "q+": Math.floor((this.getMonth() + 3) / 3), //quarter 
      "S": this.getMilliseconds() //millisecond 
    }
    if (/(y+)/.test(format)) {
      format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    for (var k in o) {
      if (new RegExp("(" + k + ")").test(format)) {
        format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
      }
    }
    return format;
  }
  const items = [{
      total: 100,
      table: 4,
      date: new Date().Format("yyyy-MM-dd hh:mm:ss")
    },
    {
      total: 500,
      table: 4,
      date: new Date().Format("yyyy-MM-dd hh:mm:ss")
    },
    {
      total: 101,
      table: 4,
      date: new Date().Format("yyyy-MM-dd hh:mm:ss")
    },
    {
      total: 102,
      table: 4,
      date: new Date().Format("yyyy-MM-dd hh:mm:ss")
    },
  ]
const orderDetail = {
  totalPrice: 32,
  created_at: new Date().Format("yyyy-MM-dd hh:mm:ss"),
  desk: 6
}
  export default {
    data() {
      return {
        items: [],
        fields: [{
            key: 'total_price',
            label: '总价',
            sortable: true,
          },
          {
            key: 'desk_id',
            label: '餐桌号',
            sortable: true
          },
          {
            key: 'created_at',
            label: '用餐日期'
          },
          {
            key: 'actions',
            label: '操作'
          }
        ],
        currentPage: 1,
        perPage: 8,
        totalRows: null,
        detailItem: []
      }
    },
    created() {
      let rid = this.$cookies.get('rid');
      this.axios.get(`api/restaurant/${rid}/order`).then(res=>{
        this.items = res.data.data;

        this.totalRows = this.items.length;
        for (let i of this.items) {
          i.created_at = new Date(i.created_at).Format("yyyy-MM-dd hh:mm:ss")
        }
        console.log(res);
      })
    },
    components: {
      navb,
    },
    methods: {
      getDetail(oid) {
        let rid = this.$cookies.get('rid');
        this.axios.get(`api/restaurant/${rid}/order/${oid}/meal`).then(res=>{
          console.log(res);
          this.$root.$emit('bv::show::modal','modal1')
        });
        }
    }
  }

</script>
