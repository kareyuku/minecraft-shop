import { prisma } from "@/lib/prisma";
import handlePrismaError from "@/lib/prismaErrorHandler";

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    return Response.json({
      message: "Success",
      data: await prisma.product.findFirstOrThrow({
        where: { id: params.id },
      }),
      paymentMethods: await prisma.paymentMethod.findMany({
        select: {
          fee: true,
          provider: true
        }
      })
    });
  } catch (err: any) {
    return handlePrismaError(err);
  }
}

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  const {
    price,
    name,
    description,
    imageUri,
    requireOnline,
    minimumBuy,
    maximumBuy,
  } = await req.json();

  try {
    return Response.json({
      message: "Success",
      data: await prisma.product.update({
        where: { id: params.id },
        data: {
          price,
          name,
          description: btoa(description),
          imageUri,
          requireOnline,
          minimumBuy,
          maximumBuy,
        },
      })
    });
  } catch (err: any) {
    return handlePrismaError(err);
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    return Response.json({
      message: "Success",
      data: await prisma.product.delete({
        where: { id: params.id },
      })
    });
  } catch (err: any) {
    return handlePrismaError(err);
  }
}
