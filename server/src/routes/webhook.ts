import {Router} from "express"
import { createWebhook } from "../controllers/webhookController"

const webhookRoutes = Router()

webhookRoutes.post("/create", createWebhook)

export default webhookRoutes