import { Router } from 'express';
import OrderController from '../controllers/OrderController';


class MainRoutes {
    public routers: Router;
    private orderController = new OrderController();

    constructor() {
        this.routers = Router();
        this.config();
    }

    private config(): void {

        this.routers.post('/create', this.orderController.create);

        this.routers.post('/update', this.orderController.update);

        this.routers.get('/list', this.orderController.getOrderByDate);

        this.routers.get('/search', this.orderController.searchById);

        this.routers.post('/delete', this.orderController.removeById);

    }
}

export default new MainRoutes().routers;
