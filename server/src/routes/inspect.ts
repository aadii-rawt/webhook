import { Router } from "express";
import { deleteAllResponse, deleteResponse, getResponse, inspectWebhook } from "../controllers/InspectController";

const inspectRoutes = Router();

inspectRoutes.post("/:id", inspectWebhook)
inspectRoutes.get("",getResponse )
inspectRoutes.delete("", deleteResponse )
inspectRoutes.delete("/deleteAll",deleteAllResponse)

export default inspectRoutes