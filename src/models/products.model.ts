import Product from '../types/products.types';
import db from '../database/database';

class ProductModel {
  // create
  async createProduct(p: Product): Promise<Product> {
    try {
      //opn cnx
      const cnx = await db.connect();
      const sql = `INSERT INTO products (name,description,price,category) values ($1, $2, $3 ,$4) RETURNING *`;
      //run query
      const result = await cnx.query(sql, [
        p.name,
        p.description,
        p.price,
        p.category,
      ]);
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
      const sql = `SELECT * from products`;
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
  async getOneProduct(id: number): Promise<Product> {
    try {
      //opn cnx
      const cnx = await db.connect();
      const sql = `SELECT * from products WHERE id=($1)`;
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
      const sql = `UPDATE products SET name=$2 ,description=$3 ,price=$4, category=$5 WHERE id=($1) RETURNING *`;
      //run query
      const result = await cnx.query(sql, [
        p.id,
        p.name,
        p.description,
        p.price,
        p.category,
      ]);
      cnx.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(
        `unable to update the requested product : ${(error as Error).message}`
      );
    }
  }

  //delete product

  async deleteProduct(id: number): Promise<Product> {
    try {
      //opn cnx
      const cnx = await db.connect();
      const sql = `DELETE FROM products WHERE id= ($1) RETURNING *`;
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
