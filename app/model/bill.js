function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

class Bill {
  constructor(customerName) {
    this.id = `${getRandomInt(999)}`;
    this.customerName = customerName;
    this.products = [];
  }

  getTotalPrice() {
    const products = this.products;
    let price = 0,
      groceryPrice = 0;
    for (let i = 0; i < products.length; i++) {
      const p = products[i];
      if (p.grocery) {
        groceryPrice += p.price * p.amount;
      } else {
        price += p.price * p.amount;
      }
    }
    return { price, groceryPrice };
  }
}

module.exports = { Bill };
