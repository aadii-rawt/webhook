import express, { Request, Response } from "express";
import cors from "cors";
import webhookRoutes from "./routes/webhook";
import dotenv from "dotenv";

const app = express()
app.use(cors())
dotenv.config()

app.use("/api/v1/webhook", webhookRoutes)

const port = process.env.PORT
app.listen(port,() => {
    console.log("server is runniung on port ", port);
})