import express from "express";
import { createClient } from "../controllers/clients.controller.js";
import { validShemaClients } from "../middlewares/schemaValidorClients.js";

const router = express.Router();

router.post("/", validShemaClients, createClient);

export default router;
