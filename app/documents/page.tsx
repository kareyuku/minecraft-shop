import Navbar from "@/components/ui/Navbar";

export default function DocumentsPage() {
  return (
    <main className="container mx-auto flex flex-col gap-6 mt-10 px-3 max-sm:px-5">
      <Navbar />
      <h1 className="text-4xl">Terms Of Service</h1>
      <h1>Welcome to [Your Shop Name]!</h1>
      <p>
        We're thrilled to have you explore our Minecraft wonderland. Before you
        embark on this adventure, please take a moment to read through our Terms
        of Service.
      </p>

      <h2>1. Acceptance of Terms</h2>
      <p>
        By accessing or using [Your Shop Name], you agree to comply with and be
        bound by these Terms of Service. If you do not agree with any part of
        the terms, please refrain from using our services.
      </p>

      <h2>2. Products and Payments</h2>
      <ol>
        <li>
          All products available for purchase are virtual items within the
          Minecraft game.
        </li>
        <li>
          Payments are processed securely through [Your Payment Gateway]. We do
          not store any payment information.
        </li>
      </ol>

      <h2>3. Delivery of Virtual Items</h2>
      <ol>
        <li>
          Virtual items purchased will be delivered to the Minecraft account
          associated with the provided information.
        </li>
        <li>
          Delivery may take up to [X] hours, but we strive for instant delivery
          whenever possible.
        </li>
      </ol>

      <p>
        Thank you for choosing [Your Shop Name] for your Minecraft needs. We
        hope you have a fantastic time exploring the virtual realms we have to
        offer! If you have any questions or concerns, feel free to reach out to
        our support team at [Your Support Email]. Happy mining!
      </p>
    </main>
  );
}
