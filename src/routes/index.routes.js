import { Router } from "express";
import cakesRouter from "./cakes.routes.js";
import clientsRouter from "./clients.routes.js";
import ordersRouter from "./orders.routes";

const router = Router();

router.use(cakesRouter);
router.use(clientsRouter);
router.use(ordersRouter);

export default router;