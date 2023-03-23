import express from "express";
import { createCake } from "../controllers/cakes.controller.js";
import { validShema } from "../middlewares/schemaValidor.js";

const router = express.Router();

router.post("/", validShema, createCake, () => {});

export default router;

