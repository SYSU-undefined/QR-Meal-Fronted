import _ from 'lodash';
/**
 * @type {MpVueOption}
 */
const option = {
  data() {
    return {
      order_id: 0,
      dishes: [],
      status: null,
    };
  },
  computed: {
    formattedStatus() {
      return '制作中';
    },
  },
  methods: {
  },
  onLoad() {
    Object.assign(this, _.pick(this.$root.$mp.query, ['order_id']));
    this.status = 'making';
    for (let i = 0; i < 10; i += 1) {
      const dishId = i;
      const name = `Dish ${i}`;
      const count = i;
      const image = '';
      const price = i * 10;
      this.dishes.push({
        dish_id: dishId, price, name, image, count, status: '制作中',
      });
    }
  },
  async onPullDownRefresh() {
    await new Promise(res => setTimeout(res, 2000));
    wx.stopPullDownRefresh();
  },
  config: {
    enablePullDownRefresh: true,
  },
};

export default option;
