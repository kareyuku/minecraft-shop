import { prisma } from "@/lib/prisma";
import handlePrismaError from "@/lib/prismaErrorHandler";

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    return Response.json({
      message: "Success",
      data: {
        ...await prisma.server.findFirstOrThrow({ where: { id: params.id }, include: { products: true }, }),
        paymentMethods: await prisma.paymentMethod.findMany({
          select: {
            fee: true,
            provider: true
          }
      })}
    });
  } catch (err: any) {
    return handlePrismaError(err);
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    return Response.json({
      message: "Success",
      data: await prisma.server.delete({ where: { id: params.id }, include: { products: true } })
    });
  } catch (err: any) {
    return handlePrismaError(err);
  }
}

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  const { name, ip, imageUri } = await req.json();
  try {
    return Response.json({
      message: "Success",
      data: await prisma.server.update({ where: { id: params.id }, data: { name, ip, imageUri }, })
    });
  } catch (err: any) {
    return handlePrismaError(err);
  }
}
