<template>
  <div class="list">
    <div class="list-item" v-for="order in orders" :key="order.order_id">
      <div>订单日期：{{order.created_at}}</div>
      <div>订单总价：{{order.total_price}}</div>
      <div>菜品数：{{order.item_count}}</div>
    </div>
  </div>
</template>

<script src="./orders.js">
</script>
