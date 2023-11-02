import { prisma } from "@/lib/prisma";

interface ISlug {
  params: {
    slug: string;
  };
}

export async function POST(req: Request, { params }: ISlug) {
  // TO DO ADD VOUCHERS
  const {
    price,
    name,
    description,
    imageUri,
    requireOnline,
    minimumBuy,
    maximumBuy,
  } = await req.json();
  const id = Number.parseInt(params.slug);

  try {
    const server = await prisma.server.findUniqueOrThrow({
      where: { id },
      include: { products: true },
    });
    const product = await prisma.product.create({
      data: {
        price,
        name,
        description,
        imageUri,
        requireOnline,
        minimumBuy,
        maximumBuy,
        serverId: id,
      },
    });

    await prisma.server.update({
      where: { id },
      data: { products: { connect: { id: product.id } } },
    });
    return Response.json(product);
  } catch (err: any) {
    return Response.json({ message: err.message }, { status: 400 });
  }
}

export async function GET(req: Request, { params }: ISlug) {
  try {
    return Response.json(
      await prisma.product.findMany({
        where: { serverId: Number.parseInt(params.slug) },
      })
    );
  } catch (err: any) {
    return Response.json({ message: err.message }, { status: 400 });
  }
}
