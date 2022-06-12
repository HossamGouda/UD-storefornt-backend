import Product from '../types/products.types';
import db from '../database/database';

class ProductModel {
  // create
  async createProduct(p: Product): Promise<Product> {
    try {
      //opn cnx
      const cnx = await db.connect();
      const sql = `INSERT INTO products (name, price,category `;
      //run query
      const result = await cnx.query(sql, [p.name, p.price, p.category]);
      //close cnx
      cnx.release();
      //return created user
      return result.rows[0];
    } catch (error) {
      throw new Error(
        `unable to create new product ${p.name}): ${(error as Error).message}`
      );
    }
  }
  //get all products
  async getProducts(): Promise<Product[]> {
    try {
      //opn cnx
      const cnx = await db.connect();
      const sql = `SELECT id ,name,price,category from products`;
      //run query

      const result = await cnx.query(sql);
      cnx.release();
      return result.rows;
    } catch (error) {
      throw new Error(
        `unable to get the requested products list ${(error as Error).message}`
      );
    }
  }
  //get specifc product
  async getOneProduct(id: string): Promise<Product> {
    try {
      //opn cnx
      const cnx = await db.connect();
      const sql = `SELECT id ,name, price,category from products WHERE id=($1)`;
      //run query

      const result = await cnx.query(sql, [id]);
      cnx.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(
        `unable to get the requested product ${id}  ${(error as Error).message}`
      );
    }
  }
  //update product
  async updateProduct(p: Product): Promise<Product> {
    try {
      const cnx = await db.connect();
      const sql = `UPDATE products SET name=$1, price=$2, category=$3  WHERE id=($4) RETURNING id, email, user_name, first_name, last_name`;
      //run query
      const result = await cnx.query(sql, [p.name, p.price, p.category, p.id]);
      cnx.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(
        `unable to update the requested product : ${(error as Error).message}`
      );
    }
  }

  //delete product

  async deleteProduct(id: string): Promise<Product> {
    try {
      //opn cnx
      const cnx = await db.connect();
      const sql = `DELETE FROM products WHERE id= ($1) RETURNING id, name, price,category`;
      //run query

      const result = await cnx.query(sql, [id]);
      cnx.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(
        `unable to delete the requested product ${id}  ${
          (error as Error).message
        }`
      );
    }
  }
}

export default ProductModel;
