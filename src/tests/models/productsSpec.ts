import ProductModel from '../../models/products.model';
import db from '../../database/database';
import Product from '../../types/products.types';

const productModel = new ProductModel();

describe('Product Model', () => {
  describe('Test methods in the Product model', () => {
    it('should return all products', () => {
      expect(productModel.getProducts).toBeDefined();
    });

    it('should return one product', () => {
      expect(productModel.getOneProduct).toBeDefined();
    });

    it('Should have creat method', () => {
      expect(productModel.createProduct).toBeDefined();
    });

    it('Should have creat update product method', () => {
      expect(productModel.updateProduct).toBeDefined();
    });

    it('should have a Delete User method', () => {
      expect(productModel.deleteProduct).toBeDefined();
    });
  });

  describe('test product Model Logic', () => {
    const product = {
      name: 'orange',
      description: 'lims',
      price: 3,
      category: 'fruit',
    } as Product;

    beforeAll(async () => {
      const createdProduct = await productModel.createProduct(product);
      product.id = createdProduct.id;
    });

    afterAll(async () => {
      const connection = await db.connect();
      const sql = 'DELETE FROM products;';
      await connection.query(sql);
      connection.release();
    });

    it('Create method should return a product', async () => {
      const newProduct = await productModel.createProduct({
        name: 'mango',
        description: 'sweety yellow',
        price: 5,
        category: 'fruit',
      } as Product);
      expect(newProduct).toEqual({
        id: newProduct.id,
        name: 'mango',
        description: 'sweety yellow',
        price: 5,
        category: 'fruit',
      } as Product);
    });

    it('Get All method should return all products available in DB', async () => {
      const products = await productModel.getProducts();
      expect(products.length).toBe(2);
    });

    it('Get product method should return orange product when called with ID', async () => {
      const retrieved = await productModel.getOneProduct(product.id as number);
      expect(retrieved.id).toBe(product.id);
      expect(retrieved.name).toBe(product.name);
      expect(retrieved.description).toBe(product.description);
      expect(retrieved.price).toBe(product.price);
      expect(retrieved.category).toBe(product.category);
    });

    it('Update product method should return a product with the new data', async () => {
      const updatedProdcut = await productModel.updateProduct({
        ...product,
        name: 'mangoo',
        description: 'onlyFruit',
        price: 10,
      });
      expect(updatedProdcut.id).toBe(product.id);
      expect(updatedProdcut.name).toBe('mangoo');
      expect(updatedProdcut.description).toBe('onlyFruit');
      expect(updatedProdcut.price).toBe(10);
    });

    it('Delete product method should delete product from DB', async () => {
      const deletedProduct = await productModel.deleteProduct(
        product.id as number
      );
      expect(deletedProduct.id).toBe(product.id);
    });
  });
});
