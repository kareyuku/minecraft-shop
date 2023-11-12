import { prisma } from "@/lib/prisma";
import handlePrismaError from "@/lib/prismaErrorHandler";

export async function POST(req: Request) {
  const { name, ip, imageUri } = await req.json();

  try {
    return Response.json(
      await prisma.server.create({
        data: {
          name,
          ip,
          imageUri,
        },
      })
    );
  } catch (err: any) {
    return handlePrismaError(err);
  }
}

export async function GET() {
  try {
    return Response.json(await prisma.server.findMany());
  } catch (err: any) {
    return handlePrismaError(err);
  }
}
