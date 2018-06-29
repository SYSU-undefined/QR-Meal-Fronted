
import card from '@/components/card';
import dish from '@/components/dish';
import { Dish } from '@/models/dish';

export default {
  data() {
    return {
      motto: 'Hello World',
      userInfo: {},
      dish: new Dish(1, '#', '#', 123),
    };
  },

  components: {
    card,
    dish,
  },

  methods: {
    bindViewTap() {
      const url = '../logs/main';
      wx.navigateTo({ url });
    },
    getUserInfo() {
      // 调用登录接口
      wx.login({
        success: () => {
          wx.getUserInfo({
            success: (res) => {
              this.userInfo = res.userInfo;
              // this.dish.image = this.userInfo.avatarUrl;
            },
          });
        },
      });
    },
    clickHandle(msg, ev) {
      console.log('clickHandle:', msg, ev);
    },
  },

  created() {
    // 调用应用实例的方法获取全局数据
    this.getUserInfo();
  },
};
