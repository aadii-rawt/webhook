import prisma from "@/config/prisma";
import { NextResponse } from "next/server";

export const GET = async (req: Request) => {
    const { searchParams } = new URL(req.url);
    const webhookId = searchParams.get("webhookId");

    if (!webhookId) return NextResponse.json({ success: false, msg: "Webhook Id is required" }, { status: 400 })
    try {
        const data = await prisma.response.findMany({
            where: {
                // @ts-ignore
                webhookId: webhookId,
            }
        })

        return NextResponse.json({ success: true, data }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ success: false, msg: "Something went wrong" }, { status: 500 })
    }
}

export const DELETE = async (req: Request) => {
    const { searchParams } = new URL(req.url)
    const responseId = searchParams.get("responseId")
    if (!responseId) return NextResponse.json({ success: false, msg: "Reponse Id is required" }, { status: 400 })
    try {
        await prisma.response.delete({
            where: {
                // @ts-ignore
                id: responseId
            }
        })

        return NextResponse.json({ success: true, msg: "Response Deleted successfully" })
    } catch (error) {
        return NextResponse.json({ success: false, msg: "Something went wrong" }, { status: 500 })
    }
}