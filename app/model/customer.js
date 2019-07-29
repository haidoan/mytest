const { TWO_YEAR, PROMO } = require('../constant');
const { Bill } = require('./bill');
class Customer {
  constructor(name, date, employee = undefined, aff = undefined) {
    this.name = name;
    this.joinDate = date;
    this.affiliate = aff || false;
    this.employee = employee || false;
    this.myBill = new Bill(name);
  }

  getJoinDate() {
    return this.joinDate;
  }
  isEmployee() {
    return this.employee;
  }
  isAffiliated() {
    return this.affiliate;
  }

  isLoyalCustomer() {
    const offset = new Date() - this.joinDate;
    // console.log('ofset', offset);
    return offset >= TWO_YEAR;
  }

  buy(item, amount) {
    const index = this.myBill.products.findIndex(e => {
      return e.name == item.name;
    });
    if (index === -1) {
      this.myBill.products.push({ name: item.name, price: item.price, amount, grocery: item.grocery });
    } else {
      this.myBill.products[index].amount += amount;
    }
    // console.log(`${this.name} buy ${amount} ${item.name} with price = ${item.price}`);
    // console.log('this.myBill', this.myBill);
  }
  /**
   * Select best discount price for user based from his profile and bill
   * because he just can use only one discount a time
   * so select the highest one
   */
  selectPromotion(totalPrice) {
    const isEmployee = this.isEmployee();
    if (isEmployee) return { type: 'Customer is employee', value: PROMO.EMPLOYEE };
    const isAffiliated = this.isAffiliated();
    if (isAffiliated) return { type: 'Customer is Affiliated', value: PROMO.AFFILIATE };
    const isLoyalty = this.isLoyalCustomer();
    if (isLoyalty) return { type: 'Customer is lowyalty', value: PROMO.LOYALT };
    const isOver100 = totalPrice > 100 ? true : false;
    if (isOver100) return { type: 'Total price of bill is greater than 100$', value: PROMO.HUNDRED };
  }
  pay() {
    let finalPrice = 0;
    // console.log('this.products', this.products);
    // console.log(`Bill : ${this.myBill.id} \tDate :${new Date()}`);
    // console.log(`Customer Name : ${this.name}`);
    const { price, groceryPrice } = this.myBill.getTotalPrice();
    const discount = this.selectPromotion(price + groceryPrice);
    let discountAmount = 0;
    // const priceBeforeDiscount = price;
    if (discount) {
      discountAmount = price * (discount.value / 100);
      // console.log(`Discount type : ${discount.type} , discount ${discount.value}%`);
    } else {
      // console.log(`Discount : None`);
    }
    finalPrice = groceryPrice + price - discountAmount;

    // // console.log(`Total Price before discount : ${price + groceryPrice} $`);
    // console.log(`Price of non-grocery items : ${price}$`);
    // console.log(`Price of grocery items : ${groceryPrice}$`);
    // console.log(`Price After discount ${discount.value}% of ${price} = ${price - discountAmount}$`);
    // console.log(`finalPrice grocery + after discount =  ${finalPrice} $`);
    // reset after pay
    this.myBill = new Bill(this.name);
    return finalPrice;
  }
}

module.exports = { Customer };
