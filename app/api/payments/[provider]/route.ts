import { prisma } from "@/lib/prisma";
import { PaymentProvider } from "@prisma/client";

interface ISlug {
  params: {
    provider: string;
  };
}

export async function PATCH(req: Request, { params }: ISlug) {
  const { fee, currency, secret } = await req.json();
  const provider = params.provider as PaymentProvider;
  const method_exist = await prisma.paymentMethod.findFirst({
    where: { provider },
  });
  if (!method_exist)
    return Response.json(
      { message: "Can't find PaymentMethod with Provider: " + provider },
      { status: 400 }
    );
  try {
    return Response.json(
      await prisma.paymentMethod.update({
        where: { provider },
        data: {
          fee,
          secret,
        },
      }),
      { status: 200 }
    );
  } catch (err: any) {
    return Response.json({ message: err.message }, { status: 400 });
  }
}

export async function DELETE(req: Request, { params }: ISlug) {
  try {
    return Response.json(
      await prisma.paymentMethod.delete({
        where: { provider: params.provider as PaymentProvider },
      }),
      { status: 200 }
    );
  } catch (err: any) {
    return Response.json({ message: err.message }, { status: 400 });
  }
}
