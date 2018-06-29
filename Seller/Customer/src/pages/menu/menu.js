import _ from 'lodash';

import dish from '@/components/dish';
import { Dish } from '@/models/dish';
import { BASE_URL } from '@/config';

/**
 * @type {MpVueOption}
 */

const option = {
  data() {
    return {
      restaurant_id: 0,
      desk_id: 0,
      dishes: [],
      tags: [],
      showChart: false,
      dish: new Dish(1, '1234', 1234, 1234),
    };
  },
  components: {
    dish,
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
      await wx.$reqeust.request(makeOrder, wx.$method.POST, selected);
    },
  },
  created() {
    const getDishes = `${BASE_URL}/restaurant/menu`;
    wx.$reqeust.get(getDishes).then((res) => {
      /** @type {{data: Dish[]}} */
      const { data } = res;
      this.dishes = data.map(one => new Dish(..._.at(one, ['dish_id', 'name', 'image', 'price'])));
    });
    for (let i = 0; i < 40; i += 1) {
      this.dishes.push(new Dish(i, `Dish ${i}`, '', i, `tag ${i / 10}`));
    }
    this.tags = ['0', '1', '2', '3'];
  },
};

export default option;
