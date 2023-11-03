import { prisma } from "@/lib/prisma";

interface ISlug {
  params: {
    serverId: string;
  };
}

export async function GET(req: Request, { params }: ISlug) {
  /*const id = Number.parseInt(params.serverId);

  if (!id)
    return Response.json(
      { message: "Server serverId must be an Integer" },
      { status: 400 }
    );*/

  try {
    return Response.json(
      await prisma.server.findFirstOrThrow({
        where: { id: Number.parseInt(params.serverId) },
      })
    );
  } catch (err: any) {
    /*
    if (err.code === "P2025")
      return Response.json(
        { message: "There is no server with this ip." },
        { status: 404 }
      );
*/
    return Response.json({ message: err.message }, { status: 400 });
  }
}

export async function DELETE(req: Request, { params }: ISlug) {
  /*
  const id = Number.parseInt(params.serverId);

  if (!id)
    return Response.json(
      { message: "Server serverId must be an Integer" },
      { status: 400 }
    );
*/
  try {
    return Response.json(
      await prisma.server.delete({
        where: { id: Number.parseInt(params.serverId) },
      })
    );
  } catch (err: any) {
    /*
    if (err.code === "P2025")
      return Response.json(
        { message: "There is no server with this ip." },
        { status: 404 }
      );
      */

    return Response.json({ message: err.message }, { status: 400 });
  }
}

export async function PATCH(req: Request, { params }: ISlug) {
  const { name, ip, imageUri } = await req.json();
  /*
  const id = Number.parseInt(params.serverId);

  if (!id)
    return Response.json(
      { message: "Server serverId must be an Integer" },
      { status: 400 }
    );
*/

  try {
    return Response.json(
      await prisma.server.update({
        where: { id: Number.parseInt(params.serverId) },
        data: { name, ip, imageUri },
      })
    );
  } catch (err: any) {
    /*
    if (err.code === "P2002")
      return Response.json(
        { message: "There is already a server with this ip." },
        { status: 409 }
      );
    if (err.code === "P2025")
      return Response.json(
        { message: "There is no server with this ip." },
        { status: 404 }
      );
      */

    return Response.json({ message: err.message }, { status: 400 });
  }
}
