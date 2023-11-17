import { prisma } from "@/lib/prisma";
import handlePrismaError from "@/lib/prismaErrorHandler";
import { PaymentProvider } from "@prisma/client";

export async function GET(req: Request, { params }: { params: { provider: string } }) {
  const provider = params.provider.toUpperCase() as PaymentProvider;

  try {
    return Response.json({
      message: "Success",
      data: await prisma.paymentMethod.findFirstOrThrow({ where: { provider }})
    })
  }
  catch (err: any) {
    return handlePrismaError(err);
  }
}

export async function PATCH(req: Request, { params }: { params: { provider: string } }) {
  const { fee, secret } = await req.json();
  const provider = params.provider.toUpperCase() as PaymentProvider;

  try {
    return Response.json({
      message: "Success",
      data: await prisma.paymentMethod.update({
        where: { provider },
        data: { fee, secret }
      })
    })
  } catch (err: any) {
    return handlePrismaError(err);
  }
}

export async function DELETE(req: Request, { params }: { params: { provider: string } }) {
  const provider = params.provider.toUpperCase() as PaymentProvider;

  try {
    return Response.json({
      message: "Success",
      data: await prisma.paymentMethod.delete({ where: { provider } })
    })
  } catch (err: any) {
    return handlePrismaError(err);
  }
}
