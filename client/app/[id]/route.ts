import prisma from "@/config/prisma";
import { NextResponse } from "next/server";

export const POST = async (req: Request,
    { params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params;

      const headers = Object.fromEntries(req.headers.entries());
    const body = await req.json()


    if (!id) {
        return NextResponse.json(
            { msg: "Webhook id is required" },
            { status: 400 }
        );
    }
    try {

        const data = await prisma.response.create({
            data: {
                type: req.method,
                webhookId: id,
                headers: JSON.stringify(headers),
                body: body,
            },
        });

        return NextResponse.json(
            { msg: "success", data },
            { status: 200 }
        );

    } catch (error) {
        console.error(error);

        return NextResponse.json(
            { msg: "Something went wrong" },
            { status: 500 }
        );
    }
};