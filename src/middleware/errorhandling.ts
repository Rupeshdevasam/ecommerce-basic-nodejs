import { Request, Response, NextFunction } from 'express';

export const notFoundMiddleware = (req: Request, res: Response): void => {
    res.status(404).send({ message: `Not found URL ${req.path}` });
};

export const errorMiddleware = (error: BaseException, req: Request, res: Response, next: NextFunction): void => {
    res.status(error.code || 422).send({ status: 'failed', error: { message: error.message } });
};