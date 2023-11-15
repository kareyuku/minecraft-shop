// import { buffer } from "micro"
// import { prisma } from "@/lib/prisma";
// import Stripe from "stripe";

// const endpointSecret =
//   "";

// export async function POST(req: Request) {
//   const body = await req.json();

//   if (body?.object === "event") {
//     let event;
//     const sig = req.headers.get("stripe-signature") as string;
//     try {
//       const paymentMethod = await prisma.paymentMethod.findFirst({
//         where: { provider: "STRIPE" },
//       });
//       const StripeProvider = new Stripe(paymentMethod?.secret as string);
//       //   const text = await req.text();
//       console.log("its fine");
//       event = StripeProvider.webhooks.constructEvent(
//         JSON.stringify(body),
//         sig,
//         endpointSecret
//       );

//       switch (event.type) {
//         case "payment_intent.succeeded":
//           const paymentIntentSucceeded = event.data.object;
//           console.log(paymentIntentSucceeded);
//           break;
//         // ... handle other event types
//         default:
//           console.log(`Unhandled event type ${event.type}`);
//       }
//     } catch (err) {
//       console.log(err);
//       return Response.json({ message: err }, { status: 503 });
//     }
//   }

//   return Response.json({ message: "Success" }, { status: 200 });
// }
