import { Dish } from '@/models/dish';

export default {
  props: {
    dish: Dish,
  },
  methods: {
    add_dish() {
      this.dish.count++;
      this.$emit('add');
    },
    remove_dish() {
      this.dish.count--;
      this.$emit('remove');
    },
  },
};
