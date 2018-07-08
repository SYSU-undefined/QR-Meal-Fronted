/**
 * @type {MpVueOption}
 */
const option = {
  data() {
    return {
      userInfo: {},
    };
  },

  methods: {
    async getUserInfo() {
      const { code } = await wx.loginAsync();
      // TODO: login here
      console.log(code);
      ({ userInfo: this.userInfo } = await wx.getUserInfoAsync());
      let temp = await wx.getUserInfoAsync();
      console.log(temp)
    },
    async scanCode() {
      // const { path } = await wx.scanCodeAsync();
      // if (path) {
      //   wx.navigateTo({ url: path });
      // }
      wx.navigateTo({ url: '/pages/menu/main' });
    },
    toOrders() {
      wx.navigateTo({ url: '/pages/orders/main' });
    },
    toOrderStatus() {
      wx.navigateTo({ url: '/pages/orders/detail/main' });
    },
  },

  created() {
    // 调用应用实例的方法获取全局数据
    this.getUserInfo();
  },
};

export default option;
