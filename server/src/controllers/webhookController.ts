import { Request, Response } from "express";
import prisma from "../config/prisma";
import { nanoid } from "nanoid";

export const getData = async (req: Request, res: Response) => {
    const { id } = req.params;

    if (!id) return res.status(400).json({ msg: "Something went wrong" })
    console.log(id);


    const data = await prisma.response.create({
        // @ts-ignore
        data: {
            type: req.method,
            // @ts-ignore
            webhookId: id,
            headers: req.headers,
            body: req.body,
        }
    })

    console.log("data :", data);
    res.json({ msg: "success" })
}

export const createWebhook = async (req: Request, res: Response) => {
    try {
        const webhookId = nanoid(8)
        const data = await prisma.webhook.create({
            data: {
                id: webhookId,
                url: process.env.WEBHOOK_URL + `/${webhookId}`
            }
        })

        res.status(200).json({ success: true, msg: "Webhook createad successfully", data })

    } catch (error) {
        res.status(500).json({ success: false, msg: "Can't create Webhook" })
    }
}

export const deleteWebhook = async (req: Request, res: Response) => {
    const { webhookId } = req.query;

    if (!webhookId) return res.status(400).json({ success: false, msg: "Webhook id is required" })
    try {
        console.log(webhookId);
        const data = await prisma.webhook.delete({
            where: {
                // @ts-ignore
                id: webhookId
            }
        })
        res.status(200).json({ success: true, msg: "webhook deleted successfully", id: webhookId })
    } catch (error) {
        res.status(500).json({ success: false, msg: "Something went wrong" })
    }
}