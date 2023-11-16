import { prisma } from "@/lib/prisma";
import handlePrismaError from "@/lib/prismaErrorHandler";

export async function POST(req: Request) {
  const { fee, provider, secret } = await req.json();

  try {
    return Response.json(
      await prisma.paymentMethod.create({
        data: {
          provider,
          fee,
          secret,
        },
      })
    );
  } catch (err: any) {
    return handlePrismaError(err);
  }
}

export async function GET() {
  try {
    return Response.json(await prisma.paymentMethod.findMany());
  } catch (err: any) {
    return handlePrismaError(err);
  }
}
