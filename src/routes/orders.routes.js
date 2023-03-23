import { Router } from "express";
import { validShema } from "../middlewares/schemaValidor.js"
import ordersShemas from "../schemas/ordersShemas"

const router = Router();

router.post("/order", validShema(ordersShemas), () => {}),
router.get("/orders", validShema(ordersShemas), () => {}),
router.get("/orders/:id", validShema(ordersShemas), () => {}),
router.get("/clients/:id/orders", validShema(ordersShemas), () => {})
