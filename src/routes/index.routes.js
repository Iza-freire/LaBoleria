import { Router } from "express";
import cakesRouter from "./cakes.routes";
import clientsRouter from "./clients.routes";
import ordersRouter from "./orders.routes";

const router = Router();

router.use(cakesRouter);
router.use(clientsRouter);
router.use(ordersRouter);

export default router;