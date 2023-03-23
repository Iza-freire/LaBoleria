import { Router } from "express";
import { validShemaOrder } from "../middlewares/schemaValidorOrder.js";
import { createOrder } from "../controllers/order.controller.js"
import { getOrders } from "../controllers/orderId.controller.js";

const router = Router();

router.post("/", validShemaOrder, createOrder);
router.get("/", getOrders);

export default router;
