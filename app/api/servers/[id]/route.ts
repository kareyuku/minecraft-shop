import { prisma } from "@/lib/prisma";
import handlePrismaError from "@/lib/prismaErrorHandler";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  try {
    const server = await prisma.server.findFirst({
      where: { id },
      include: { products: true },
    });
    if (!server)
      return Response.json(
        { message: "Can't find a server with ID: ", id },
        { status: 404 }
      );

    return Response.json({
      message: "Success",
      data: {
        server,
      },
    });
  } catch (err: any) {
    return handlePrismaError(err);
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  try {
    await prisma.product.deleteMany({ where: { serverId: id } });

    return Response.json(
      await prisma.server.delete({
        where: { id },
      })
    );
  } catch (err: any) {
    return handlePrismaError(err);
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { name, ip, imageUri } = await req.json();

  try {
    return Response.json(
      await prisma.server.update({
        where: { id: params.id },
        data: { name, ip, imageUri },
      })
    );
  } catch (err: any) {
    return handlePrismaError(err);
  }
}
