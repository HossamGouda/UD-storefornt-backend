import { NextFunction, Request, Response } from 'express'
import UserModel from '../models/user.model'

const userModel = new UserModel()
export const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await userModel.create(req.body)
    res.json({
      status: 'User Created',
      data: { ...user },
      message: 'Hello world from new user'
    })
  } catch (error) {
    next(error)
  }
}
