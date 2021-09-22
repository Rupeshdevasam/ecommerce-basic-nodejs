import { ExceptionHandler } from '../helpers/ExceptionHandler';
import { NextFunction, Request, Response } from 'express';
import order from '../model/order';
import { extendDate, getFormattedDate } from '../helpers/DateHelper';
import { ResponseHandler } from '../helpers/ResponseHanlder';

export default class OrderController {
    public async create(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { orderId, itemName, cost, orderDate, deliveryDate } = req.body;

            const verifiedOrderDate = getFormattedDate(orderDate),
                verifiedDeliveryDate = deliveryDate ? getFormattedDate(deliveryDate) : extendDate(new Date());

            if (!orderId || !itemName || (!cost && cost != 0)) {
                throw ExceptionHandler.handleException('Invalid Params', 422);
            }


            const existingOrder = await order.findOne({ order_id: orderId });

            if (existingOrder) {
                throw ExceptionHandler.handleException('Order id should be unique', 422);
            }

            const newOrder = new order({
                order_id: orderId,
                item_name: itemName,
                cost: cost,
                order_date: verifiedOrderDate,
                delivery_date: verifiedDeliveryDate,
            });
            const created = await newOrder.save();

            const resp = { ...created['_doc'], order_date: created['_doc']['order_date'].toString(), delivery_date: created['_doc']['delivery_date'].toString() }


            await ResponseHandler.handleResponse(res, 'Creation success', resp, 201);

        } catch (error) {
            next(error);
        }
    }

    public async update(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {

            const { orderId, deliveryDate } = req.body;

            if (!orderId || !deliveryDate) {
                throw ExceptionHandler.handleException('Invalid Params', 422);
            }


            const existingOrder = await order.findOne({ order_id: orderId });

            if (!existingOrder) {
                throw ExceptionHandler.handleException(`Order id doesn't exist`, 422);
            }

            await existingOrder.updateOne({ delivery_date: getFormattedDate(deliveryDate) })

            await ResponseHandler.handleResponse(res, 'Updation success', [], 200);


        } catch (error) {
            next(error);
        }
    }

    public async getOrderByDate(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {

            const { date } = req.query;

            if (!date) {
                throw ExceptionHandler.handleException('Invalid Params', 422);
            }


            const existingOrders = await order.find({
                order_date:
                {
                    $gte: new Date(date),
                    $lt: extendDate(new Date(date), 1)
                }
            });

            if (!existingOrders) {
                throw ExceptionHandler.handleException(`Order id doesn't exist`, 422);
            }

            const resp = existingOrders.map(item => {
                return { ...item['_doc'], order_date: item['_doc']['order_date'].toString(), delivery_date: item['_doc']['delivery_date'].toString() }
            })

            await ResponseHandler.handleResponse(res, `Orders on date: ${date}`, resp, 200);


        } catch (error) {
            next(error);
        }
    }

    public async searchById(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {

            const { orderId } = req.query;

            if (!orderId) {
                throw ExceptionHandler.handleException('Invalid Params', 422);
            }


            const existingOrder = await order.findOne({ order_id: orderId });

            if (!existingOrder) {
                throw ExceptionHandler.handleException(`Order id doesn't exist`, 422);
            }

            const resp = { ...existingOrder['_doc'], order_date: existingOrder['_doc']['order_date'].toString(), delivery_date: existingOrder['_doc']['delivery_date'].toString() }

            await ResponseHandler.handleResponse(res, 'Retriving success', resp, 200);


        } catch (error) {
            next(error);
        }
    }

    public async removeById(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {

            const { orderId } = req.body;

            if (!orderId) {
                throw ExceptionHandler.handleException('Invalid Params', 422);
            }


            await order.findOneAndRemove({ order_id: orderId });

            await ResponseHandler.handleResponse(res, 'Order removed', [], 200);


        } catch (error) {
            next(error);
        }
    }
}