import { Router } from "express";
import { validShemaOrder } from "../middlewares/schemaValidorOrder.js";
import { createOrder } from "../controllers/order.controller.js"

const router = Router();

router.post("/", validShemaOrder, createOrder);

export default router;
