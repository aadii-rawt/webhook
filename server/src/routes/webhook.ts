import {Router} from "express"
import { createWebhook, deleteWebhook, getData } from "../controllers/webhookController"

const webhookRoutes = Router()

webhookRoutes.post("/get/:id", getData)
webhookRoutes.post("/create", createWebhook)
webhookRoutes.delete("/",deleteWebhook)

export default webhookRoutes