import dayjs from "dayjs";
import { ClientById, CakeById, insertOrders } from "../middlewares/schemaValidorOrder.js";

export async function createOrder(req, res){

    const {clientId, cakeId, quantity} = req.body;

    try {
        const clientExist = await ClientById(clientId);
        const cakeExist = await CakeById(cakeId);
        if (!clientExist.rows[0] || !cakeExist.rows[0]) {
            return res.sendStatus(404);
        }

        if(quantity < 1 || quantity > 4){
            return res.sendStatus(400);
        }

        const totalPrice = cakeExist.rows[0].price * quantity;
        const createdAt = dayjs().format('YYYY-MM-DD');

        await insertOrders(clientId, cakeId, quantity, totalPrice, createdAt);
        return res.sendStatus(201);
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
}


