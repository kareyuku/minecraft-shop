import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  const { fee, provider, currency, secret } = await req.json();

  const already_exist = await prisma.paymentMethod.findFirst({
    where: { provider },
  });
  if (already_exist)
    return Response.json(
      { message: "You already have this provider." },
      { status: 409 }
    );

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
    return Response.json(await prisma.paymentMethod.findMany());
  } catch (err: any) {
    return Response.json({ message: err.message }, { status: 400 });
  }
}
