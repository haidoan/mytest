let assert = require('assert');
const { Customer, Item } = require('../app/q3');

const book = new Item('Book', 3, true);
const pen = new Item('Pen', 2, true);
const bike = new Item('Bike', 90);
const car = new Item('Car', 200);

const { load, store } = require('../app/q1');
const text = 'key1=value1;key2=value2\nkey1=value1;key2=value2';
const obj = { '0': { key1: 'value1', key2: 'value2' }, '1': { key1: 'value1', key2: 'value2' } };

describe('Question1', function() {
  describe('#load', function() {
    it('should load correctly object', function() {
      const data = load(text);
      assert.equal(JSON.stringify(data), JSON.stringify(obj));
    });
  });

  describe('#store ', function() {
    it('should store correctly object', function() {
      const data = store(obj);
      assert.equal(data, text);
    });
  });
});

describe('Question2', function() {
  describe('#Customer is Employee but affiliated,loyalty and bougth < 100$', function() {
    it('Customer should has 30% discount because he is employee ', function() {
      const MrA = new Customer('MrA', new Date('2018-12-17T03:00:00'), true);
      MrA.buy(book, 5);
      MrA.buy(pen, 4);
      assert.equal(MrA.pay(), 23);
    });
  });

  describe('#Customer is Affilicate but employee,loyalty, and bougth > 100$ ', function() {
    it('Customer should get 10% discount because of he join affilicated', function() {
      const MrA = new Customer('MrA', new Date('2018-12-17T03:00:00'), false, true);
      MrA.buy(book, 5);
      MrA.buy(car, 1);
      assert.equal(MrA.pay(), 195);
    });
  });

  describe('#Customer is loyalty but employee,loyalty,affilicate, and bougth < 100$ ', function() {
    it('Customer should get 5% discount because his member ship', function() {
      const MrA = new Customer('MrA', new Date('2018-12-17T03:00:00'), false, true);
      MrA.buy(book, 5);
      MrA.buy(bike, 1);
      assert.equal(MrA.pay(), 96);
    });
  });

  describe('#Customer is employee,loyalty,affilicate, and bougth > 100$ ', function() {
    it('Customer should get 30% discount because he can use only one of discount type once and sale 30% highest discount ', function() {
      const MrA = new Customer('MrA', new Date('2015-12-17T03:00:00'), true, true);
      MrA.buy(book, 5);
      MrA.buy(bike, 2);
      MrA.buy(car, 1);
      assert.equal(MrA.pay(), 281);
    });
  });

  describe('#Customer is not employee,loyalty,affilicate, and bougth < 100$ ', function() {
    it('Customer should not get any discount because his doesnt reach any other discount condition ', function() {
      const MrA = new Customer('MrA', new Date());
      MrA.buy(book, 5);
      MrA.buy(book, 1);
      assert.equal(MrA.pay(), 18);
    });
  });
});
