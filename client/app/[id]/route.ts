import prisma from "@/config/prisma";
import { log } from "console";
import { NextResponse } from "next/server";

export const POST = async (req: Request,
    { params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params;
    const body = await req.json()

    const headers = Object.fromEntries(req.headers.entries());
    const allowedHeaders = [
        "accept-encoding",
        "content-length",
        "content-type",
        "host",
        "user-agent",
        "x-forwarded-for",
        "x-forwarded-host",
        "x-forwarded-port",
        "x-forwarded-proto",
    ];

    const filteredHeaders = Object.fromEntries(
        Object.entries(headers).filter(([key]) => allowedHeaders.includes(key))
    );




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
                headers: JSON.stringify(filteredHeaders),
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