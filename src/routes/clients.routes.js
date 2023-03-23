import { Router } from "express";
import { validShema } from "../middlewares/schemaValidor.js"
import clientsShemas from "../schemas/clientsShemas.js"

const router = Router();

router.post("/clients", validShema(clientsShemas))
