class Item {
  constructor(name, price, grocery = undefined) {
    this.name = name;
    this.price = price;
    this.grocery = grocery || false;
  }

  getname() {
    return this.name;
  }

  getPrice() {
    return this.price;
  }
}

module.exports = { Item };
