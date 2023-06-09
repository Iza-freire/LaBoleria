import { clientsSchema } from "../schemas/clientsShemas.js"

export function validShemaClients(req, res, next) {

    const { error } = clientsSchema.validate(req.body, { abortEarly: false })
    if (error) {
        return res.status(422).send(error.details.map(detail => detail.message))
    }
    next();
}