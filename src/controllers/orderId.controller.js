import { db } from "../database/db.js";

export async function getOrders(req, res) {
    try {
        const { date } = req.query;
        let ordersQuery = `SELECT orders.id AS "orderId", orders."createdAt", orders.quantity, orders."totalPrice",
      cakes.id AS "cakeId", cakes.name AS "cakeName", cakes.price, cakes.description, cakes.image,
      clients.id AS "clientId", clients.name AS "clientName", clients.address, clients.phone 
      FROM orders
      JOIN clients ON "clientId" = clients.id
      JOIN cakes ON "cakeId" = cakes.id`;
        let values = [];
        if (date) {
            ordersQuery += ` WHERE orders."createdAt"::date = $1::date`;
            values.push(date);
        }
        const result = await db.query(ordersQuery, values);
        if (result.rowCount === 0) {
            return res.status(404).json([]);
        }
        const orders = result.rows.map((row) => ({
            client: {
                id: row.clientId,
                name: row.clientName,
                address: row.address,
                phone: row.phone,
            },
            cake: {
                id: row.cakeId,
                name: row.cakeName,
                price: row.price,
                description: row.description,
                image: row.image
            },
            orderId: row.orderId,
            createdAt: row.createdAt,
            quantity: row.quantity,
            totalPrice: row.totalPrice,
        }));
        return res.status(200).json(orders);

    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
}
