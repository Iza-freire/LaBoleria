import { Router } from "express";
import { validShemaOrder } from "../middlewares/schemaValidorOrder.js";
import { createOrder } from "../controllers/order.controller.js"
import { getOrders, getOrderById, getClientOrders } from "../controllers/orderId.controller.js";

const router = Router();

router.post("/orders", validShemaOrder, createOrder);
router.get('/orders', getOrders);
router.get('/orders/:id', getOrderById);
router.get('/clients/:id/orders', getClientOrders);

export default router;
