import { ordersSchema } from "../schemas/ordersShemas.js"
import { db } from "../database/db.js"

export function validShemaOrder(req, res, next) {

    const { error } = ordersSchema.validate(req.body, { abortEarly: false })
    if (error) {
        return res.status(422).send(error.details.map(detail => detail.message))
    }
    next();
}

export async function insertOrders(clientId, cakeId, quantity, totalPrice, createdAt) {
    return await db.query(`INSERT INTO orders("clientId", "cakeId", quantity, "totalPrice", "createdAt") VALUES($1, $2, $3, $4, $5)`, [clientId, cakeId, quantity, totalPrice, createdAt]);
}
export async function ClientById(clientId) {
    return db.query('SELECT * FROM clients WHERE id = $1', [clientId]);
}

export async function CakeById(cakeId) {
    return await db.query('SELECT * FROM cakes WHERE id = $1', [cakeId]);
}


