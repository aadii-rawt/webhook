import { NextResponse } from "next/server";
import { nanoid } from "nanoid";
import prisma from "@/config/prisma";

export const POST = async () => {
    try {
        const webhookId = nanoid(8)

        const data = await prisma.webhook.create({
            data: {
                id: webhookId,
                url: process.env.WEBHOOK_URL + `/${webhookId}`
            }
        })

        return NextResponse.json({ success: true, msg: "Webhook created Successfully", data })
    } catch (error) {
        // res.status(500).json({ success: false, msg: "Can't create Webhook" })
    }
}

export const DELETE = async (req: Request) => {
    const { webhookId } = await req.json()
    console.log(" delete : ", webhookId);

    if (!webhookId) return NextResponse.json({ success: false, msg: "Webhook id is required" }, { status: 400 })
    try {
        const data = await prisma.webhook.delete({
            where: {
                // @ts-ignore
                id: webhookId
            }
        })
        return NextResponse.json({ success: true, msg: "webhook deleted successfully", id: webhookId })
    } catch (error) {
        console.log(error);
        
        return NextResponse.json({ success: false, msg: "Something went wrong" }, { status: 500 })
    }
}