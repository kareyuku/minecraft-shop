import { prisma } from "@/lib/prisma";
import handlePrismaError from "@/lib/prismaErrorHandler";

export async function POST(req: Request) {
  // TO DO ADD VOUCHERS
  const {
    id,
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
      where: { id },
    });

    const product = await prisma.product.create({
      data: {
        serverId: id,
        price,
        name,
        description,
        imageUri,
        requireOnline,
        minimumBuy,
        maximumBuy,
      },
    });

    await prisma.server.update({
      where: { id },
      data: { products: { connect: { id: product.id } } },
    });

    return Response.json(product);
  } catch (err: any) {
    return handlePrismaError(err);
  }
}

export async function GET() {
  try {
    return Response.json({
      products: await prisma.product.findMany({}),
      paymentsMethods: await prisma.paymentMethod.findMany({
        select: {
          fee: true,
          provider: true,
        },
      }),
    });
  } catch (err: any) {
    return handlePrismaError(err);
  }
}
