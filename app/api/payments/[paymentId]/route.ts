import { prisma } from "@/lib/prisma";

interface ISlug {
  params: {
    paymentId: string;
  };
}

export async function PATCH(req: Request, { params }: ISlug) {
  const { fee, currency, secret } = await req.json();
  const paymentId = parseInt(params.paymentId);
  const method_exist = await prisma.paymentMethod.findFirst({
    where: { id: Number.parseInt(params.paymentId) },
  });
  if (!method_exist)
    return Response.json(
      { message: "Can't find PaymentMethod with ID: " + paymentId },
      { status: 400 }
    );
  try {
    await prisma.paymentMethod.update({
      where: { id: paymentId },
      data: {
        fee,
        currency,
        secret,
      },
    });
  } catch (err: any) {
    return Response.json({ message: err.message }, { status: 400 });
  }
}

export async function DELETE(req: Request, { params }: ISlug) {
  try {
    return Response.json(
      await prisma.paymentMethod.delete({
        where: { id: Number.parseInt(params.paymentId) },
      }),
      { status: 200 }
    );
  } catch (err: any) {
    return Response.json({ message: err.message }, { status: 400 });
  }
}
