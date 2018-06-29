import { Dish } from '@/models/dish';

/**
 * @type {MpVueOption}
 */
const option = {
  props: {
    dish: Dish,
    showTotal: Boolean,
    hideButton: Boolean,
  },
  methods: {
    add_dish() {
      this.dish.count += 1;
      this.$emit('add');
      wx.dish = this.dish;
    },
    remove_dish() {
      if (this.dish.count <= 0) return;
      this.dish.count -= 1;
      this.$emit('remove');
    },
  },
  computed: {
    totalPrice() {
      return this.dish.count * this.dish.price;
    },
  },
};

export default option;
