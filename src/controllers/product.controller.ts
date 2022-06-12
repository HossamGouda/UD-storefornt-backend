import { NextFunction, Request, Response } from 'express';
import ProductModel from '../models/products.model';

const productModel = new ProductModel();
// eslint-disable-next-line prettier/prettier
export const createProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const product = await productModel.createProduct(req.body);
    res.json({
      status: 'success',
      data: { ...product },
      message: 'The product created',
    });
  } catch (err) {
    next(err);
  }
};

export const getAllProducts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const products = await productModel.getProducts();
    res.json({
      status: 'success',
      data: { ...products },
      message: 'products retrived ',
    });
  } catch (err) {
    next(err);
  }
};

export const getoneProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const product = await productModel.getOneProduct(
      req.params.id as unknown as string
    );
    res.json({
      status: 'success',
      data: product,
      message: 'product retrived successfully',
    });
  } catch (err) {
    next(err);
  }
};

export const updateProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const product = await productModel.updateProduct(req.body);
    res.json({
      status: 'success',
      data: product,
      message: 'Product updated',
    });
  } catch (err) {
    next(err);
  }
};

export const deleteProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const product = await productModel.deleteProduct(
      req.params.id as unknown as string
    );
    res.json({
      status: 'success',
      data: product,
      message: 'product deleted',
    });
  } catch (err) {
    next(err);
  }
};
