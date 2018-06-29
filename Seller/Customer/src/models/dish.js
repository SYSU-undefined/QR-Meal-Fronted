export class Dish {
  constructor(dishId, name, image, price, tag, count = 0) {
    this.dish_id = dishId;
    this.name = name;
    this.image = image;
    this.price = price;
    this.count = count;
    this.tag = tag;
  }

  totalPrice() {
    return this.price * this.count;
  }
}

export default Dish;
