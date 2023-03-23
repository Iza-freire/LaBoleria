import { cakeSchema } from "../schemas/cakeSchema.js"

export function validShema(req, res, next) {

        const {error} = cakeSchema.validate(req.body, {abortEarly: false})
        if(error){
            console.log("4")
            return res.status(422).send(error.details.map(detail => detail.message))
        }
        next();
}