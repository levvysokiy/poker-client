import { NextFunction, Request, RequestHandler, Response } from 'express';
import { BaseError } from '../errors/base.error';

export function handle(requestHandler: RequestHandler): RequestHandler {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data: any = await requestHandler(req, res, next);
      res.status(200).send(data);
    } catch (error) {
      if (error instanceof BaseError) {
        res.status(error.status).send(error.message);
      } else {
        res.status(500).send('Server error!');
      }
      console.log(error);
    }
  };
}
