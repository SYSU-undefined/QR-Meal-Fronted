/**
 * @type {MpVueOption}
 */
const option = {
  data() {
    return {
      orders: [
      ],
    };
  },
  methods: {
    toDetail(orderId) {
      wx.navigateTo({ url: `/pages/orders/detail/main?order_id=${orderId}` });
    },
    async getOrders() {
      this.orders = await wx.$reqeust.get(`${BASE_URL}/restaurant/${this.restaurant_id}/order`);
      console.log(this.orders);
    }
  },
  mounted() {
    this.getOrders();
    console.log("in mounted")
  }
};

export default option;
