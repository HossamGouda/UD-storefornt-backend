import { Request, Response, NextFunction } from 'express';
import Error from '../interface/erro.interface';
import config from '../config';
import jwt from 'jsonwebtoken';

const handle = (next: NextFunction) => {
  const error: Error = new Error(`logain faild : try again later`);
  error.status = 401;
  next(error);
};
const validateMiddleware = (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.get('Authorization');
    if (authHeader) {
      const bearer = authHeader.split(' ')[0].toLowerCase();
      const token = authHeader.split(' ')[1];
      if (token && bearer === 'bearer') {
        const decode = jwt.verify(
          token,
          config.tokenSecret as unknown as string
        );
        if (decode) {
          next();
        } else {
          // Failed to authenticate user.
          handle(next);
        }
      } else {
        // token type not bearer
        handle(next);
      }
    } else {
      // No Token Provided.
      handle(next);
    }
  } catch (err) {
    handle(next);
  }
};

export default validateMiddleware;
