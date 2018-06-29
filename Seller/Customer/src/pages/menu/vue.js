
import dish from '@/components/dish';
import { Dish } from '../../models/dish';

export default {
  data() {
    return {
      restaurant_id: 0,
      desk_id: 0,
      tags: [],
      showChart: false,
      dishes: [new Dish(1, '1234', 1234, 1234)],
      dish: new Dish(1, '1234', 1234, 1234),
    };
  },

  components: {
    dish,
  },

  methods: {
  },

  created() {
    for (let i = 0; i < 40; i += 1) {
      this.dishes.push(new Dish(i, `Dish ${i}`, '', i, `tag ${i / 10}`));
    }
    this.tags = ['0', '1', '2', '3'];
  },
};
