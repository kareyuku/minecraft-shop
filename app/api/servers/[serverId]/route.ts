import { prisma } from "@/lib/prisma";
import handlePrismaError from "@/lib/prismaErrorHandler";

interface ISlug {
  params: {
    serverId: string;
  };
}

export async function GET(req: Request, { params }: ISlug) {

  try {
    return Response.json(
      await prisma.server.findFirstOrThrow({
        where: { id: Number.parseInt(params.serverId) },
      })
    );
  } catch (err: any) {
    console.log(err);
    return handlePrismaError(err);
  }
}

export async function DELETE(req: Request, { params }: ISlug) {
  try {
    return Response.json(
      await prisma.server.delete({
        where: { id: Number.parseInt(params.serverId) },
      })
    );
  } catch (err: any) {
    return handlePrismaError(err);
  }
}

export async function PATCH(req: Request, { params }: ISlug) {
  const { name, ip, imageUri } = await req.json();

  try {
    return Response.json(
      await prisma.server.update({
        where: { id: Number.parseInt(params.serverId) },
        data: { name, ip, imageUri },
      })
    );
  } catch (err: any) {
    return handlePrismaError(err);
  }
}
