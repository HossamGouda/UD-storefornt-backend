import db from '../../database/database';
import User from '../../types/user.types';
import Product from '../../types/products.types';
import Order from '../../types/orders.types';
import OrderModel from '../../models/orders.model';
import UserModel from '../../models/user.model';
import ProductModel from '../../models/products.model';

const userModel = new UserModel();
const productModel = new ProductModel();
const orderModel = new OrderModel();

describe('Order Model', () => {
  describe('Test methods exist', () => {
    it('should have an index method', () => {
      expect(orderModel.getOrders).toBeDefined();
    });

    it('should have a show method', () => {
      expect(orderModel.getOneOrder).toBeDefined();
    });

    it('should have a create method', () => {
      expect(orderModel.createOrder).toBeDefined();
    });

    it('should have a delete method', () => {
      expect(orderModel.deleteOrder).toBeDefined();
    });
  });

  describe('Test Model logic', () => {
    const user = {
      email: 'gouda@h.com',
      user_name: 'hos',
      first_name: 'Hossam',
      last_name: 'Gouda',
      password: '321',
    } as User;

    const product = {
      name: 'orange',
      description: 'lims',
      price: 3,
      category: 'fruit',
    } as Product;

    const order = {
      user_id: 1,
      status: 'active',
    } as Order;

    beforeAll(async () => {
      console.log(user.id);
      // create user/product to test with order model
      if (user.id) order.user_id = user.id;
      await userModel.create(user);
      await productModel.createProduct(product);
    });

    // afterAll(async () => {
    //   const connection = await db.connect();
    //   const sql =
    //     'DELETE FROM orders;\nALTER SEQUENCE orders_id_seq RESTART WITH 1;\nDELETE FROM products;\n ALTER SEQUENCE products_id_seq RESTART WITH 1;\nDELETE FROM users;\n ALTER SEQUENCE users_id_seq RESTART WITH 1;';
    //   await connection.query(sql);
    //   connection.release();
    // });

    it('Create method should create an order', async () => {
      const createdOrder = await orderModel.createOrder(order);
      expect(createdOrder.id).toEqual(1);
    });

    // it('Index method should return a list of orders', async () => {
    //   const orders = await orderModel.getOrders();
    //   expect(orders[0].id).toBe(1);
    // });

    // it('Show method should return the correct order', async () => {
    //   const returnedOrder = await orderModel.getOneOrder(1);
    //   expect(returnedOrder.id).toEqual(1);
    // });

    // it('Edit method should return an order with edited attributes', async () => {
    //   const returnedOrder = await orderModel.updateOrder({
    //     id: 1,
    //     user_id: 1,
    //     status: 'completed',
    //   });
    //   expect(returnedOrder.status).toBe('completed');
    // });

    // it('Delete method should remove the order', async () => {
    //   const deletedOrder = await orderModel.deleteOrder(1);
    //   expect(deletedOrder.id).toBe(1);
    // });
  });
});
