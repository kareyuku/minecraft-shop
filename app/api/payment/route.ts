import { prisma } from "@/lib/prisma";
import { PaymentProvider } from "@prisma/client";
import Stripe from "stripe";

export async function POST(req: Request) {
  const { id, quanity, provider } = await req.json();
  try {
    const product = await prisma.product.findUniqueOrThrow({ where: { id } });
    const paymentMethod = await prisma.paymentMethod.findUnique({
      where: { id: provider },
    });
    if (!paymentMethod)
      return Response.json(
        { message: "Cant find specific payment method" },
        { status: 404 }
      );
    if (product.minimumBuy && product.minimumBuy > quanity)
      return Response.json(
        { message: "Quanity should be higher or equals minimum buy" },
        { status: 400 }
      );

    if (product.maximumBuy && product.maximumBuy < quanity)
      return Response.json(
        { message: "Quanity should be lower or equals maximum buy" },
        { status: 400 }
      );

    const min = product.minimumBuy || 1;
    const calculatedPrice =
      Math.floor(
        (product.price / min +
          (product.price / min) * (paymentMethod.fee / 100) +
          Number.EPSILON) *
          100
      ) / 100;

    if (paymentMethod.provider === PaymentProvider.STRIPE) {
      const StripeProvider = new Stripe(paymentMethod.secret || "");
      let product_data: Stripe.Checkout.SessionCreateParams.LineItem.PriceData.ProductData =
        {
          name: product.name,
        };
      if (product.imageUri) product_data.images = [product.imageUri];
      if (product.description) product_data.description = product.description;

      const session = await StripeProvider.checkout.sessions.create({
        line_items: [
          {
            price_data: {
              currency: "pln",
              product_data,
              unit_amount: calculatedPrice * 100,
            },
            quantity: quanity,
          },
        ],
        mode: "payment",
        success_url: "http://localhost:3000/success",
        cancel_url: "http://localhost:3000/cancel",
      });
      return Response.json({ url: session.url || "" }, { status: 303 });
    }
  } catch (err: any) {
    return Response.json({ message: err.message }, { status: 400 });
  }
}
