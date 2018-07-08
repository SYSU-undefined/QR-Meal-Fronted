
import _ from 'lodash';

import { BASE_URL } from '../../config';
/**
 * @type {MpVueOption}
 */
const option = {
  data() {
    return {
      restaurant_id: 1,
      table_id: 0,
      tags: [],
      showChart: false,
      dishes: {},
      selectedTagIndex: null,
      totalPrice: 0,
    };
  },

  methods: {
    async submit() {
      /**
       * @type {{ dishes: Dish[] }}
       */
      const { dishes } = this;
      const makeOrder = `${BASE_URL}/restaurant/${this.restaurant_id}/order`;
      const flatDishes = Object.values(dishes).reduce((prev, cur) => prev.concat(cur), []);
      const selected = flatDishes.filter(one => one.count > 0).map(one => _.pick(one, ['dish_id', 'count']));
      console.log(selected);
      const res = await wx.$reqeust.request(makeOrder, wx.$method.POST, selected);
      if (res.statusCode === 200) {
        wx.redirectTo({ url: '/pages/order/main' });
      }
    },

    async getDishes() {
      const { data: dishes, statusCode } = await wx.$reqeust.get(`${BASE_URL}/restaurant/${this.restaurant_id}/dish`);
      if (statusCode !== 200) return;
      this.dishes = dishes.data;
      for (let k in this.dishes) {
        for (let d of this.dishes[k]) {
          d.image = `https://filer.resetbypear.com/dish_img/${d.dish_id}.jpg`
        }
      }

      console.log(dishes)
      this.tags = Object.keys(dishes.data);
    },
    addDish(tag, index) {
      const dish = this.dishes[tag][index];
      if (dish.count === undefined) dish.count = 0;
      dish.count += 1;
      this.totalPrice += dish.price;
    },
    removeDish(tag, index) {
      const dish = this.dishes[tag][index];
      dish.count -= 1;
      this.totalPrice -= dish.price;
    },
    menuScroll(event) {
      const { target } = event;
      const { scrollTop } = target;
      const topTag = this.offsetToTag(scrollTop);
      if (this.selectedTagIndex !== topTag && !this.tagClickMark) {
        this.selectedTagIndex = topTag;
      }
      this.tagClickMark = false;
    },
    offsetToTag(offset) {
      let rest = offset;
      let matchedTag = null;
      for (const [tag, dishes] of Object.entries(this.dishes)) {
        const length = this.tagHeight + (this.dishHeight * dishes.length);
        matchedTag = tag;
        if (rest <= length) {
          break;
        }
        rest -= length;
      }
      return this.tags.indexOf(matchedTag);
    },
    tagClick(index) {
      this.tagClickMark = true;
      this.selectedTagIndex = index;
    },
  },
  computed: {
    selectedTag() {
      return this.tags[this.selectedTagIndex];
    },
    selectedTagIndexWrap() {
      return `tag-${this.selectedTagIndex}`;
    },
  },
  watch: {
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
    this.getDishes();
    // this.dishes = {
    //   粥类: [
    //     {
    //       dish_id: 1,
    //       name: '茅根马蹄粥',
    //       description: '偏甜口味，清热解暑',
    //       price: 8,
    //       category_name: '粥类',
    //       category_description: '粥粥粥粥',
    //     },
    //     {
    //       dish_id: 2,
    //       name: '皮蛋瘦肉粥',
    //       description: '经典粥类',
    //       price: 9,
    //       category_name: '粥类',
    //       category_description: '粥粥粥粥',
    //     },
    //     {
    //       dish_id: 1,
    //       name: '茅根马蹄粥',
    //       description: '偏甜口味，清热解暑',
    //       price: 8,
    //       category_name: '粥类',
    //       category_description: '粥粥粥粥',
    //     },
    //     {
    //       dish_id: 2,
    //       name: '皮蛋瘦肉粥',
    //       description: '经典粥类',
    //       price: 9,
    //       category_name: '粥类',
    //       category_description: '粥粥粥粥',
    //     },
    //     {
    //       dish_id: 1,
    //       name: '茅根马蹄粥',
    //       description: '偏甜口味，清热解暑',
    //       price: 8,
    //       category_name: '粥类',
    //       category_description: '粥粥粥粥',
    //     },
    //     {
    //       dish_id: 2,
    //       name: '皮蛋瘦肉粥',
    //       description: '经典粥类',
    //       price: 9,
    //       category_name: '粥类',
    //       category_description: '粥粥粥粥',
    //     },
    //     {
    //       dish_id: 1,
    //       name: '茅根马蹄粥',
    //       description: '偏甜口味，清热解暑',
    //       price: 8,
    //       category_name: '粥类',
    //       category_description: '粥粥粥粥',
    //     },
    //     {
    //       dish_id: 2,
    //       name: '皮蛋瘦肉粥',
    //       description: '经典粥类',
    //       price: 9,
    //       category_name: '粥类',
    //       category_description: '粥粥粥粥',
    //     },
    //   ],
    //   粉类: [
    //     {
    //       dish_id: 3,
    //       name: '三丝炒粉',
    //       description: '青椒、红萝卜、火腿',
    //       price: 10,
    //       category_name: '粉类',
    //       category_description: '粉粉粉粉',
    //     },
    //     {
    //       dish_id: 3,
    //       name: '三丝炒粉',
    //       description: '青椒、红萝卜、火腿',
    //       price: 10,
    //       category_name: '粉类',
    //       category_description: '粉粉粉粉',
    //     },
    //     {
    //       dish_id: 3,
    //       name: '三丝炒粉',
    //       description: '青椒、红萝卜、火腿',
    //       price: 10,
    //       category_name: '粉类',
    //       category_description: '粉粉粉粉',
    //     },
    //     {
    //       dish_id: 3,
    //       name: '三丝炒粉',
    //       description: '青椒、红萝卜、火腿',
    //       price: 10,
    //       category_name: '粉类',
    //       category_description: '粉粉粉粉',
    //     },
    //     {
    //       dish_id: 3,
    //       name: '三丝炒粉',
    //       description: '青椒、红萝卜、火腿',
    //       price: 10,
    //       category_name: '粉类',
    //       category_description: '粉粉粉粉',
    //     },
    //     {
    //       dish_id: 3,
    //       name: '三丝炒粉',
    //       description: '青椒、红萝卜、火腿',
    //       price: 10,
    //       category_name: '粉类',
    //       category_description: '粉粉粉粉',
    //     },
    //     {
    //       dish_id: 3,
    //       name: '三丝炒粉',
    //       description: '青椒、红萝卜、火腿',
    //       price: 10,
    //       category_name: '粉类',
    //       category_description: '粉粉粉粉',
    //     },
    //   ],
    // };
    this.tags = Object.keys(this.dishes);
  },
};

export default option;
