import { prisma } from "@/lib/prisma";

interface ISlug {
  params: {
    serverId: string;
    productId: string;
  };
}

export async function GET(req: Request, { params }: ISlug) {
  try {
    return Response.json(
      await prisma.product.findFirstOrThrow({
        where: {
          id: Number.parseInt(params.productId),
          serverId: Number.parseInt(params.serverId),
        },
      })
    );
  } catch (err: any) {
    return Response.json({ message: err.message }, { status: 400 });
  }
}

export async function PATCH(req: Request, { params }: ISlug) {
  const {
    price,
    name,
    description,
    imageUri,
    requireOnline,
    minimumBuy,
    maximumBuy,
  } = await req.json();

  try {
    return Response.json(
      await prisma.product.update({
        where: {
          id: Number.parseInt(params.productId),
          serverId: Number.parseInt(params.serverId),
        },
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
    return Response.json({ message: err.message }, { status: 400 });
  }
}

export async function DELETE(req: Request, { params }: ISlug) {
  try {
    return Response.json(
      await prisma.product.delete({
        where: {
          id: Number.parseInt(params.productId),
          serverId: Number.parseInt(params.serverId),
        },
      })
    );
  } catch (err: any) {
    return Response.json({ message: err.message }, { status: 400 });
  }
}
