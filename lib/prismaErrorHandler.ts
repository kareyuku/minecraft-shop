import { PrismaClientValidationError } from "@prisma/client/runtime/library";

export default function handlePrismaError(err: any) {
  console.log(err);

  if (err instanceof PrismaClientValidationError)
    return Response.json({ message: "Argument" + err.message.split("Argument")[1] }, { status: 400 });

  switch (err.code) {
    case "P2025": // Prisma results aren't consistent sadly
      return Response.json({ message: `${err.meta?.cause || err.message}` }, { status: 404 });

    default:
      // handling all other errors
      return Response.json({ message: "Internal server error." }, { status: 500 });
  }
}
