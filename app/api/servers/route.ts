import { prisma } from "@/lib/prisma";
import handlePrismaError from "@/lib/prismaErrorHandler";

export async function POST(req: Request) {
  const { name, ip, imageUri } = await req.json();

  try {
    return Response.json({
      data: await prisma.server.create({
          data: {
            name,
            ip,
            imageUri,
          },
        }),
      message: "Success" },
      { status: 201 });
  } catch (err: any) {
    return handlePrismaError(err);
  }
}

export async function GET() {
  try {
    return Response.json({
      message: "Success",
      data: await prisma.server.findMany(),
    });
  } catch (err: any) {
    return handlePrismaError(err);
  }
}
