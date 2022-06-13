import Order from '../types/orders.types';
import db from '../database/database';

class OrderModel {
  // create
  async createOrder(o: Order): Promise<Order> {
    try {
      //opn cnx
      const cnx = await db.connect();
      const sql = `INSERT INTO orders (status, user_id) `;
      //run query
      const result = await cnx.query(sql, [o.status, o.user_id]);
      //close cnx
      cnx.release();
      //return created user
      return result.rows[0];
    } catch (error) {
      throw new Error(
        `unable to create new order ${o.status}): ${(error as Error).message}`
      );
    }
  }
  //get all orders
  async getOrders(): Promise<Order[]> {
    try {
      //opn cnx
      const cnx = await db.connect();
      const sql = `SELECT id ,status,price,user_id from orders`;
      //run query

      const result = await cnx.query(sql);
      cnx.release();
      return result.rows;
    } catch (error) {
      throw new Error(
        `unable to get the requested orders list ${(error as Error).message}`
      );
    }
  }
  //get specifc order
  async getOneOrder(id: number): Promise<Order> {
    try {
      //opn cnx
      const cnx = await db.connect();
      const sql = `SELECT id ,status, user_id from orders WHERE id=($1)`;
      //run query

      const result = await cnx.query(sql, [id]);
      cnx.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(
        `unable to get the requested order ${id}  ${(error as Error).message}`
      );
    }
  }
  //update order
  async updateOrder(o: Order): Promise<Order> {
    try {
      const cnx = await db.connect();
      const sql = `UPDATE orders SET name=$1, price=$2, category=$3  WHERE id=($4) RETURNING id, email, user_name, first_name, last_name`;
      //run query
      const result = await cnx.query(sql, [o.status, o.user_id]);
      cnx.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(
        `unable to update the requested order : ${(error as Error).message}`
      );
    }
  }

  //delete order

  async deleteOrder(id: number): Promise<Order> {
    try {
      //opn cnx
      const cnx = await db.connect();
      const sql = `DELETE FROM orders WHERE id= ($1) RETURNING id, status, user_id`;
      //run query

      const result = await cnx.query(sql, [id]);
      cnx.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(
        `unable to delete the requested order ${id}  ${
          (error as Error).message
        }`
      );
    }
  }
}

export default OrderModel;
