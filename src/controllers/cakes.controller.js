import { db } from "../database/db.js";

export const createCake = async (req, res) => {
  const { name, price, image, description } = req.body;

  try {    
    const existingCake = await db.query(
      "SELECT * FROM cakes WHERE name = $1",
      [name]
    );
    if (existingCake.rows.length > 0) {
      return res.status(409).send();
    }

    await db.query(
      "INSERT INTO cakes (name, price, image, description) VALUES ($1, $2, $3, $4)",
      [name, price, image, description]
    );

    res.status(201).send();
  } catch (error) {
    if (error.details) {
      return res.status(400).send(error.details[0].message);
    }
    res.status(500).send(error);
  }
};

