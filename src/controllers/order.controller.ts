import { NextFunction, Request, Response } from 'express';
import OrderModel from '../models/orders.model';

const orderModel = new OrderModel();
// eslint-disable-next-line prettier/prettier
export const create = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const order = await orderModel.createOrder(req.body);
    res.json({
      status: 'success',
      data: { ...order },
      message: 'The order created',
    });
  } catch (err) {
    next(err);
  }
};

export const getAllOrders = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const orders = await orderModel.getOrders();
    res.json({
      status: 'success',
      data: { ...orders },
      message: 'orders retrived ',
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
    const order = await orderModel.getOneOrder(
      req.params.id as unknown as string
    );
    res.json({
      status: 'success',
      data: order,
      message: 'order retrived successfully',
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
    const order = await orderModel.updateOrder(req.body);
    res.json({
      status: 'success',
      data: order,
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
    const order = await orderModel.deleteOrder(
      req.params.id as unknown as string
    );
    res.json({
      status: 'success',
      data: order,
      message: 'order deleted',
    });
  } catch (err) {
    next(err);
  }
};
