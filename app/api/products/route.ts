import { prisma } from "@/lib/prisma";
import handlePrismaError from "@/lib/prismaErrorHandler";

export async function POST(req: Request) {
  // TO DO ADD VOUCHERS
  const {
    serverId,
    price,
    name,
    description,
    imageUri,
    requireOnline,
    minimumBuy,
    maximumBuy,
  } = await req.json();

  try {
    await prisma.server.findUniqueOrThrow({
      where: { id: serverId },
    });
    const product = await prisma.product.create({
      data: {
        price,
        name,
        description,
        imageUri,
        requireOnline,
        minimumBuy,
        maximumBuy,
        serverId,
      },
    });

    await prisma.server.update({
      where: { id: serverId },
      data: { products: { connect: { id: product.id } } },
    });
    return Response.json(product);
  } catch (err: any) {
    return handlePrismaError(err);
  }
}

export async function GET(req: Request) {
  try {
    return Response.json({
      products: await prisma.product.findMany({
      }),
      paymentsMethods: await prisma.paymentMethod.findMany({
        distinct: ["currency", "fee", "id", "provider"],
      }),
    });
  } catch (err: any) {
    return handlePrismaError(err);
  }
}
