import { prisma, prismaExclude } from "@/lib/prisma";

export async function POST(req: Request) {
  const { fee, provider, currency, secret } = await req.json();

  try {
    const paymentMethod = await prisma.paymentMethod.create({
      data: {
        provider,
        fee,
        currency,
        secret,
      },
    });
    return Response.json(paymentMethod);
  } catch (err: any) {
    return Response.json({ message: err.message }, { status: 400 });
  }
}

export async function GET(req: Request) {
  try {
    return Response.json(
      await prisma.paymentMethod.findMany({
        select: prismaExclude("PaymentMethod", ["secret"]),
      })
    );
  } catch (err: any) {
    return Response.json({ message: err.message }, { status: 400 });
  }
}
