import { prisma, prismaExclude } from "@/lib/prisma";

interface ISlug {
  params: {
    serverId: string;
    productId: string;
  };
}

export async function POST(req: Request, { params }: ISlug) {
  const { fee, provider, currency, secret } = await req.json();
  const serverId = Number.parseInt(params.serverId),
    productId = Number.parseInt(params.productId);

  try {
    await prisma.product.findUniqueOrThrow({
      where: { id: productId, serverId },
    });
    const paymentMethod = await prisma.paymentMethod.create({
      data: {
        fee,
        provider,
        currency,
        secret,
        productId,
      },
    });

    await prisma.product.update({
      where: { id: productId },
      data: { paymentMethods: { connect: { id: paymentMethod.id } } },
    });
    return Response.json(paymentMethod);
  } catch (err: any) {
    return Response.json({ message: err.message }, { status: 400 });
  }
}

export async function GET(req: Request, { params }: ISlug) {
  try {
    return Response.json(
      await prisma.paymentMethod.findMany({
        where: {
          productId: Number.parseInt(params.productId),
        },
        select: prismaExclude("PaymentMethod", ["secret"]),
      })
    );
  } catch (err: any) {
    return Response.json({ message: err.message }, { status: 400 });
  }
}
