import db from '../database/database';
import OrderProduct from '../types/order-product.type';

class OrderProductModel {
  async create(
    quantity: number,
    orderId: string,
    productId: string
  ): Promise<OrderProduct> {
    try {
      const conn = await db.connect();
      const sql =
        'INSERT INTO order_products (quantity, order_id, product_id) VALUES($1, $2, $3) RETURNING *';
      const result = await conn.query(sql, [quantity, orderId, productId]);
      conn.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(
        `Could not create product: ${productId} to order: ${orderId} ${
          (error as Error).message
        }`
      );
    }
  }

  async index(orderId: number): Promise<OrderProduct[]> {
    try {
      const connection = await db.connect();
      const sql =
        "SELECT o.id AS id, op.order_id, op.product_id, JSON_AGG(JSONB_BUILD_OBJECT('productId', p.id, 'name', p.name, 'description', p.description,'category', p.category, 'price', p.price, 'quantity', op.quantity)) AS products FROM orders AS o LEFT JOIN order_products AS op ON o.id = op.order_id LEFT JOIN products AS p ON op.product_id = p.id WHERE o.id=$1 GROUP BY o.id, op.order_id, op.product_id";
      const result = await connection.query(sql, [orderId]);
      connection.release();
      return result.rows;
    } catch (error) {
      throw new Error(
        `Error at retrieving products in order: ${(error as Error).message}`
      );
    }
  }

  async show(orderId: string, productId: string): Promise<OrderProduct> {
    try {
      const connection = await db.connect();
      const sql =
        'SELECT op.order_id::INTEGER AS id, op.order_id::INTEGER AS "orderId", op.product_id::INTEGER AS "productId", op.quantity, p.name, p.description, p.category, p.price::INTEGER FROM order_products AS op JOIN products AS p ON p.id=op.product_id WHERE order_id=$1 AND product_id=$2';
      const result = await connection.query(sql, [orderId, productId]);
      connection.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(
        `Error at retrieving product:${productId} in order: ${
          (error as Error).message
        }`
      );
    }
  }

  async edit(oP: OrderProduct): Promise<OrderProduct> {
    try {
      const connection = await db.connect();
      const sql =
        'UPDATE order_products SET quantity=$1, order_id=$2,  product_id=$3 WHERE id=$4 RETURNING *';
      const result = await connection.query(sql, [
        oP.quantity,
        oP.orderId,
        oP.productId,
        oP.id,
      ]);
      connection.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(
        `Could not update product: ${oP.productId} in order ${
          (error as Error).message
        }`
      );
    }
  }

  async delete(orderId: number, productId: number): Promise<OrderProduct> {
    try {
      const connection = await db.connect();
      const sql =
        'DELETE FROM order_products WHERE order_id=($1) and product_id=($2) RETURNING *';

      const result = await connection.query(sql, [orderId, productId]);

      connection.release();

      return result.rows[0];
    } catch (error) {
      throw new Error(
        `Could not delete product: ${productId} in order ${orderId}. Error: ${error}`
      );
    }
  }
}

export default OrderProductModel;
