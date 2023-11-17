import { prisma } from "@/lib/prisma";
import handlePrismaError from "@/lib/prismaErrorHandler";

export async function POST(req: Request) {
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

  if (!serverId)
    return Response.json({ message: "Argument `serverId` is missing."}, { status: 400 })

  try {
    await prisma.server.findFirstOrThrow({ where: { id: serverId } });

    const product = await prisma.product.create({
      data: {
        serverId,
        price,
        name,
        description: btoa(description),
        imageUri,
        requireOnline,
        minimumBuy,
        maximumBuy,
      },
    });
    await prisma.server.update({ where: { id: serverId }, data: { products: { connect: { id: product.id } } } });

    return Response.json({
      message: "Success",
      data: product
    });
  } catch (err: any) {
    return handlePrismaError(err);
  }
}

export async function GET(req: Request) {
  try {
    return Response.json({
      message: "Success",
      data: await prisma.product.findMany({ orderBy: { serverId: "asc" } }),
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
