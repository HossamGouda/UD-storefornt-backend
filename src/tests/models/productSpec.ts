import ProductModel from '../../models/products.model';
import Product from '../../types/products.types';
import db from '../../database/database';

const productModel = new ProductModel();

describe('Product Model', () => {
  describe('Test methods exist', () => {
    it('should have an index method', () => {
      expect(productModel.getProducts).toBeDefined();
    });

    it('should have a show method', () => {
      expect(productModel.getOneProduct).toBeDefined();
    });

    it('should have a create method', () => {
      expect(productModel.createProduct).toBeDefined();
    });

    it('should have a delete method', () => {
      expect(productModel.deleteProduct).toBeDefined();
    });
  });

  describe('Test Model logic', () => {
    const product = {
      name: 'product name',
      description: 'product description',
      price: 9,
      category: 'Electronics.',
    } as Product;

    afterAll(async () => {
      const connection = await db.connect();
      const sql =
        'DELETE FROM products;\n ALTER SEQUENCE products_id_seq RESTART WITH 1;\n';
      await connection.query(sql);
      connection.release();
    });

    it('Create method should add a product', async () => {
      const createdProduct = await productModel.createProduct(product);
      expect(createdProduct).toEqual({
        ...product,
        id: createdProduct.id,
        price: createdProduct.price,
      });
    });

    it('Index method should return a list of products', async () => {
      const products = await productModel.getProducts();
      expect(products.length).toBe(1);
      expect(products[0].name).toBe('product name');
    });

    it('Show method should return the correct product', async () => {
      const returnedProduct = await productModel.getOneProduct(1);
      expect(returnedProduct).toEqual({
        ...product,
        id: 1,
        price: returnedProduct.price,
      });
    });

    it('Edit method should return a product with edited attributes', async () => {
      const returnedProduct = await productModel.updateProduct({
        id: 1,
        name: 'product name edited',
        description: 'product description edited',
        price: 10,
        category: 'Electronics.',
      });
      expect(returnedProduct.name).toBe('product name edited');
      expect(returnedProduct.description).toBe('product description edited');
    });

    it('Delete method should remove the product', async () => {
      const deletedProduct = await productModel.deleteProduct(1);
      expect(deletedProduct.id).toBe(1);
    });
  });
});
