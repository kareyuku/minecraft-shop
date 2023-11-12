import { prisma } from "@/lib/prisma";
import handlePrismaError from "@/lib/prismaErrorHandler";

export async function GET(req: Request, { params }: { params: { id: string } }) {
  const id = parseInt(params.id);

  if (!id)
    return Response.json({ message: "id must be a valid Integer." }, { status: 400 });

  try {
    return Response.json(
      await prisma.product.findFirstOrThrow({
        where: { id },
      })
    );
  } catch (err: any) {
    return handlePrismaError(err);
  }
}

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  const {
    price,
    name,
    description,
    imageUri,
    requireOnline,
    minimumBuy,
    maximumBuy,
  } = await req.json();

  const id = parseInt(params.id);

  if (!id)
    return Response.json({ message: "id must be a valid Integer." }, { status: 400 });

  try {
    return Response.json(
      await prisma.product.update({
        where: { id },
        data: {
          price,
          name,
          description,
          imageUri,
          requireOnline,
          minimumBuy,
          maximumBuy,
        },
      })
    );
  } catch (err: any) {
    return handlePrismaError(err);
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  const id = parseInt(params.id);

  if (!id)
    return Response.json({ message: "id must be a valid Integer." }, { status: 400 });

  try {
    return Response.json(
      await prisma.product.delete({
        where: { id },
      })
    );
  } catch (err: any) {
    return handlePrismaError(err);
  }
}
