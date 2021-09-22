import { Response } from 'express';
export class ResponseHandler {
    public static async handleResponse(res: Response, message: string, data?: any, code: number = 200) {
        res.status(code).send({ status: message, data })
    }
}