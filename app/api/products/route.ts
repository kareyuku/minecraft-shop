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

  const id = parseInt(serverId);

  if (!id)
    return Response.json({ message: "serverId must be a valid Integer." }, { status: 400 });

  try {
    await prisma.server.findUniqueOrThrow({
      where: { id },
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
      products: await prisma.product.findMany({
      }),
      paymentsMethods: await prisma.paymentMethod.findMany({
        select: {
          id: true,
          fee: true,
          provider: true,
          currency: true
        }
      }),
    });
  } catch (err: any) {
    return handlePrismaError(err);
  }
}
