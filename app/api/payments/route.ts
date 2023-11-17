import { prisma } from "@/lib/prisma";
import handlePrismaError from "@/lib/prismaErrorHandler";

export async function POST(req: Request) {
  const { fee, provider, secret } = await req.json();

  try {
    return Response.json({
      message: "Success",
      data: await prisma.paymentMethod.create({
        data: {
          provider,
          fee,
          secret,
        },
      })
    }, { status: 201 });
  } catch (err: any) {
    return handlePrismaError(err);
  }
}

export async function GET() {
  // hide secret on session to be done
  try {
    return Response.json({
      message: "Success",
      data: await prisma.paymentMethod.findMany()
    });
  } catch (err: any) {
    return handlePrismaError(err);
  }
}
