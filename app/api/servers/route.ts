import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const { name, ip, imageUri } = req.body as any;

    try {
        return NextResponse.json(await prisma.server.create({data: {
            name, ip, imageUri
        }}));
    }
    catch (err: any) {
        return NextResponse.json({message: err.message});
    }

}

export async function GET() {
    return NextResponse.json(await prisma.server.findMany());
}