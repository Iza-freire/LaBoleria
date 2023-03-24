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


export async function getOrderById(req, res) {
    const orderId = req.params.id;

    try {
        const orderQuery = `SELECT orders.id AS "orderId", orders."createdAt", orders.quantity, orders."totalPrice",
                            cakes.id AS "cakeId", cakes.name AS "cakeName", cakes.price, cakes.description, cakes.image,
                            clients.id AS "clientId", clients.name AS "clientName", clients.address, clients.phone 
                            FROM orders
                            JOIN clients ON "clientId" = clients.id
                            JOIN cakes ON "cakeId" = cakes.id
                            WHERE orders.id = $1`;

        const result = await db.query(orderQuery, [orderId]);

        if (result.rowCount === 0) {
            return res.status(404).json({ message: "Order not found." });
        }

        const row = result.rows[0];
        const order = {
            orderId: row.orderId,
            createdAt: row.createdAt,
            quantity: row.quantity,
            totalPrice: row.totalPrice,
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
                image: row.image,
            },
        };
        return res.status(200).json(order);
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
}


export async function getClientOrders(req, res) {
    try {
        const { id } = req.params;

        const clientQuery = `SELECT id, name, address, phone FROM clients WHERE id = $1`;
        const clientResult = await db.query(clientQuery, [id]);
        if (clientResult.rowCount === 0) {
            return res.status(404).json({ error: "Client not found" });
        }
        const client = clientResult.rows[0];

        const ordersQuery = `SELECT orders.id AS "orderId", orders.quantity, orders."createdAt", orders."totalPrice", cakes.name AS "cakeName"
                            FROM orders
                            JOIN clients ON orders."clientId" = clients.id
                            JOIN cakes ON orders."cakeId" = cakes.id
                            WHERE clients.id = $1`;

        const ordersResult = await db.query(ordersQuery, [id]);
        
        const orders = ordersResult.rows.map((row) => ({
            orderId: row.orderId,
            quantity: row.quantity,
            createdAt: row.createdAt,
            totalPrice: row.totalPrice,
            cakeName: row.cakeName,
        }));

        return res.status(200).json({
            client: {
                id: client.id,
                name: client.name,
                address: client.address,
                phone: client.phone,
            },
            orders,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json(error);
    }
}
