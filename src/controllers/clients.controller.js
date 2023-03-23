import { db } from "../database/db.js";

export const createClient = async (req, res) => {
  const { name, address, phone } = req.body;

  try {
    await db.query(
      "INSERT INTO clients (name, address, phone) VALUES ($1, $2, $3)",
      [name, address, phone]
    );

    res.status(201).send();
  } catch (error) {
    if (error.details) {
      return res.status(400).send(error.details[0].message);
    }
    res.status(500).send(error);
  }
};
