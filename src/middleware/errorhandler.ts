import { Request, Response, NextFunction } from 'express';
import Error from '../interface/erro.interface';

const errorHandler = (
  error: Error,
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  const status = error.status || 500;
  const message = error.message || ' Error happened';

  res.status(status).json({ status, message });
};
export default errorHandler;
