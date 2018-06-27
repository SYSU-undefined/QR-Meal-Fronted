export class Dish {
  constructor(dishId, name, image, price, count = 0) {
    this.dish_id = dishId;
    this.name = name;
    this.image = image;
    this.price = price;
    this.count = count;
  }
}

export default Dish;