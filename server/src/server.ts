import express, { Request, Response } from "express";
import cors from "cors";
import webhookRoutes from "./routes/webhook";
import dotenv from "dotenv";
import inspectRoutes from "./routes/inspect";

const app = express()
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors())
dotenv.config()

app.use("/api/v1/webhook", webhookRoutes)
app.use("/inspect",inspectRoutes)

const port = process.env.PORT || 4000

app.listen(port,() => {
    console.log("server is runniung on port ", port);
})