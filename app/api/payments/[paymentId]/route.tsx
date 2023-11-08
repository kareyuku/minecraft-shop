import { prisma } from "@/lib/prisma";

interface ISlug {
  params: {
    paymentId: string;
  };
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
