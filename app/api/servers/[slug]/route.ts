import { prisma } from "@/lib/prisma";

interface ISlug {
    params: {
        slug: string
    }
}

export async function GET(req: Request, {params}: ISlug) {
    const id = Number.parseInt(params.slug);

    if (!id)
        return Response.json({ message: "Server slug must be an Integer" }, {status: 400});

    try {
        return Response.json(await prisma.server.findFirstOrThrow({where: {id}}));
    }
    catch (err: any) {
        if (err.code === 'P2025')
            return Response.json({ message: "There is no server with this ip." }, {status: 404});

        return Response.json({ message: err.message }, {status: 500});
    }
}

export async function DELETE(req: Request, {params}: ISlug) {
    const id = Number.parseInt(params.slug);

    if (!id)
        return Response.json({ message: "Server slug must be an Integer" }, {status: 400});

    try {
        return Response.json(await prisma.server.delete({where: {id}}));
    }
    catch (err: any) {
        if (err.code === 'P2025')
            return Response.json({ message: "There is no server with this ip." }, {status: 404});

        return Response.json({ message: err.message }, {status: 500});
    }
  
  }
  
  export async function PATCH(req : Request, {params}: ISlug) {
    const { name, ip, imageUri } = await req.json();
    const id = Number.parseInt(params.slug);

    if (!id)
        return Response.json({ message: "Server slug must be an Integer" }, {status: 400});
  
    try {
        return Response.json(await prisma.server.update({where: {id},data: {name, ip, imageUri}}));
    }
    catch (err: any) {
        if (err.code === 'P2025')
            return Response.json({ message: "There is no server with this ip." }, {status: 404});
        if (err.code === 'P2002')
            return Response.json({ message: "There is already a server with this ip." }, {status: 409});
  
        return Response.json({ message: err.message }, {status: 500});
    }
  
  }