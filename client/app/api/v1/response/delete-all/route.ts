import prisma from "@/config/prisma"
import { NextResponse } from "next/server"

export const DELETE = async (req: Request) => {
    const { searchParams } = new URL(req.url)
    const webhookId = searchParams.get("webhookId")
    if (!webhookId) return NextResponse.json({ success: false, msg: "Webhook Id is required" }, { status: 400 })

    try {
        await prisma.response.deleteMany({
            where: {
                // @ts-ignore
                webhookId: webhookId
            }
        })
        return NextResponse.json({ success: true, msg: "Response Deleted successfully" })
    } catch (error) {
        return NextResponse.json({ success: false, msg: "Something went wrong" }, { status: 500 })
    }
}