import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  const { name, ip, imageUri } = await req.json();
  
  if (!name)
    return Response.json({message: "Field name can't be empty"}, {status: 400});
  if (!ip)
    return Response.json({message: "Field ip can't be empty"}, {status: 400});
  if (await prisma.server.findFirst({where: {ip}}))
    return Response.json({message: "There is already a server with this ip"}, {status: 400});

  try {
    return Response.json(
      await prisma.server.create({
        data: {
          name,
          ip,
          imageUri,
        },
      })
    );
  } catch (err: any) {
    return Response.json({ message: err.message }, {status: 500});
  }
}

export async function DELETE(req: Request) {
  const { id } = await req.json();

  if (!id)
    return Response.json({message: "Field id can't be empty"}, {status: 400});

  try {
    return Response.json(await prisma.server.delete({where: {id}}));
  }
  catch (err: any) {
    return Response.json({ message: err.message }, {status: 500});
  }

}

export async function GET() {
  return Response.json(await prisma.server.findMany());
}
