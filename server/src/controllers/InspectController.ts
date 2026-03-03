import { Request, Response } from "express";
import prisma from "../config/prisma";

export const inspectWebhook = async (req: Request, res: Response) => {
    const { id } = req.params;
    if (!id) return res.status(400).json({ msg: "Something went wrong" })

    try {
        console.log(id);
        const data = await prisma.response.create({
            // @ts-ignore
            data: {
                type: req.method,
                // @ts-ignore
                webhookId: id,
                headers: req.headers || {},
                body: req.body || {},
            }
        })
        res.json({ msg: "success", data })
    } catch (error) {
        res.status(400).json({ success: false, msg: "Something went wrong" })
    }
}


export const getResponse = async (req: Request, res: Response) => {
    const { webhookId } = req.query;
    if (!webhookId) return res.status(400).json({ success: false, msg: "Webhook Id is required" })
    try {
        const data = await prisma.response.findMany({
            where: {
                // @ts-ignore
                webhookId: webhookId,
            }
        })

        res.json({ success: true, data })
    } catch (error) {
        res.status(500).json({ success: false, msg: "Something went wrong" })
    }
}

export const deleteResponse = async (req: Request, res: Response) => {
    const { responseId } = req.query;
    if (!responseId) return res.status(400).json({ success: false, msg: "Reponse Id is required" })

    try {
        await prisma.response.delete({
            where: {
                // @ts-ignore
                id: responseId
            }
        })

        res.json({ success: true, msg: "Response Deleted successfully" })
    } catch (error) {
        res.status(500).json({ success: false, msg: "Something went wrong" })
    }
}

export const deleteAllResponse = async (req: Request, res: Response) => {
    const { webhookId } = req.query;
    if (!webhookId) return res.status(400).json({ success: false, msg: "Webhook Id is required" })

    try {
        await prisma.response.deleteMany({
            where: {
                // @ts-ignore
                webhookId: webhookId
            }
        })
        res.json({ success: true, msg: "Response Deleted successfully" })
    } catch (error) {
        res.status(500).json({ success: false, msg: "Something went wrong" })
    }
}