import { NextFunction, Request, Response } from 'express';
import OrderProductModel from '../models/order-products.model';

const orderProductModel = new OrderProductModel();
// eslint-disable-next-line prettier/prettier
export const create = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const orderProduct = await orderProductModel.create(req.body);
    res.json({
      status: 'success',
      data: { ...orderProduct },
      message: 'The order Product created',
    });
  } catch (err) {
    next(err);
  }
};
export const getoneOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const orderProduct = await orderProductModel.index(
      req.params.id as unknown as number
    );
    res.json({
      status: 'success',
      data: { orderProduct },
      message: 'order Product retrived successfully',
    });
  } catch (err) {
    next(err);
  }
};

export const updateOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const orderProduct = await orderProductModel.edit(req.body);
    res.json({
      status: 'success',
      data: { orderProduct },
      message: 'order updated',
    });
  } catch (err) {
    next(err);
  }
};

export const deleteOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const orderProduct = await orderProductModel.delete(
      req.body.orderId,
      req.body.productId
    );
    res.json({
      status: 'success',
      data: orderProduct,
      message: 'order deleted',
    });
  } catch (err) {
    next(err);
  }
};

export const show = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const orderProduct = await orderProductModel.show(
      req.body.orderId,
      req.body.productId
    );
    res.json({
      status: 'success',
      data: { orderProduct },
      message: 'Product at target Order retrieved successfully',
    });
  } catch (err) {
    next(err);
  }
};
