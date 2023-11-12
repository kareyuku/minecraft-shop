import { prisma } from "@/lib/prisma";
import handlePrismaError from "@/lib/prismaErrorHandler";

export async function GET(req: Request, { params }: { params: { id: string } }) {
  const id = parseInt(params.id);

  if (!id)
    return Response.json({ message: "Id must be a valid Integer." }, { status: 400 });

  try {
    return Response.json(
      await prisma.server.findFirstOrThrow({
        where: { id: parseInt(params.id) },
      })
    );
  } catch (err: any) {
    return handlePrismaError(err);
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  const id = parseInt(params.id);

  if (!id)
    return Response.json({ message: "Id must be a valid Integer." }, { status: 400 });

  try {
    return Response.json(
      await prisma.server.delete({
        where: { id: parseInt(params.id) },
      })
    );
  } catch (err: any) {
    return handlePrismaError(err);
  }
}

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  const { name, ip, imageUri } = await req.json(),
    id = parseInt(params.id);

  if (!id)
    return Response.json({ message: "Id must be a valid Integer." },{ status: 400 });

  try {
    return Response.json(
      await prisma.server.update({
        where: { id: parseInt(params.id) },
        data: { name, ip, imageUri },
      })
    );
  } catch (err: any) {
    return handlePrismaError(err);
  }
}
