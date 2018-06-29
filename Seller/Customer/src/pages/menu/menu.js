
import _ from 'lodash';

import { BASE_URL } from '../../config';
/**
 * @type {MpVueOption}
 */
const option = {
  data() {
    return {
      restaurant_id: 0,
      table_id: 0,
      tags: [],
      showChart: false,
      dishes: [],
      taged_dishes: [],
      selectedTagIndex: null,
    };
  },

  methods: {
    async submit() {
      /**
       * @type {{ dishes: Dish[] }}
       */
      const { dishes } = this;
      const makeOrder = `${BASE_URL}/restaurant/${this.restaurant_id}/order`;
      const selected = dishes.filter(one => one.count > 0)
        .map(one => _.pick(one, ['dish_id', 'count']));
      const res = await wx.$reqeust.request(makeOrder, wx.$method.POST, selected);
      if (res.statusCode === 200) {
        wx.redirectTo({ url: '/pages/order/main' });
      }
    },

    async getDishes() {
      const { data: dishes, statusCode } = await wx.$reqeust.get(`${BASE_URL}/restaurant/${this.restaurant_id}/menu`);
      if (statusCode !== 200) return;
      this.dishes = dishes;
    },
    addDish(tagIndex, index) {
      this.taged_dishes[tagIndex][index].count += 1;
    },
    removeDish(tagIndex, index) {
      this.taged_dishes[tagIndex][index].count += 1;
    },
    menuScroll(event) {
      const { target } = event;
      const { scrollTop } = target;
      const topTag = this.offsetToTag(scrollTop);
      if (this.selectedTagIndex !== topTag) {
        this.selectedTagIndex = topTag;
      }
    },
    offsetToTag(offset) {
      let rest = offset;
      for (const [tagIndex, dishes] of Object.entries(this.taged_dishes)) {
        const length = this.tagHeight + (this.dishHeight * dishes.length);
        if (rest <= length) {
          return tagIndex;
        }
        rest -= length;
      }
      return this.tags.length - 1;
    },
    tagClick(index) {
      this.selectedTagIndex = index;
    },
  },
  computed: {
    totalPrice() {
      return this.dishes
        .filter(one => one.count > 0)
        .map(one => one.count * one.price)
        .reduce((lhs, rhs) => lhs + rhs, 0);
    },
    selectedTag() {
      return this.tags[this.selectedTagIndex];
    },
    selectedTagIndexWrap() {
      return `tag-${this.selectedTagIndex}`;
    },
  },
  watch: {
    dishes(dishes) {
      this.taged_dishes = this.tags.map(tag => dishes.filter(one => one.tag === tag));
    },
    tags() {
      this.selectedTagIndex = 0;
    },
  },
  created() {
    this.dishHeight = parseFloat((175 * wx.$rpxRatio).toFixed(2));
    this.tagHeight = parseFloat((50 * wx.$rpxRatio).toFixed(2));
  },
  onLoad() {
    Object.assign(this, _.pick(this.$root.$mp.query, ['restaurant_id', 'table_id']));
    this.tags = ['0', '1', '2', '3'];
    for (let i = 0; i < 40; i += 1) {
      const dishId = i;
      const name = `Dish ${i}`;
      const tag = `${this.tags[Math.floor(i / 10)]}`;
      const image = '';
      const price = i * 10;
      this.dishes.push({
        dish_id: dishId, price, name, tag, image, count: 0,
      });
    }
  },
};

export default option;
