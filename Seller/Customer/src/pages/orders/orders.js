/**
 * @type {MpVueOption}
 */
const option = {
  data() {
    return {
      orders: [
        {
          order_id: 0,
          restaurant_id: 0,
          price: 0,
        },
      ],
    };
  },
  methods: {
    toDetail(orderId) {
      wx.navigateTo({ url: `/pages/orders/detail/main?order_id=${orderId}` });
    },
  },
};

export default option;
