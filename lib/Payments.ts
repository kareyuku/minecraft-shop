enum Currency {
    PLN = "PLN",
    USD = "USD",
    EUR = "EUR"
}

enum PaymentProvider {
    STRIPE = "Stripe",
    PRZELEWY24 = "Przelewy24",
    PAYPAL = "Paypal",
    BLIK = "Blik",
    HOTPAY_TRANFER = "Hotpay Transfer",
    HOTPAY_PAYSAFECARD = "Hotpay Paysafecard",
    HOTPAY_SMS = "Hotpay Paysafecard",
    PAYBYLINK_TRANFER = "PayByLink Transfer",
    PAYBYLINK_PAYSAFECARD = "PayByLink Paysafecard",
    PAYBYLINK_SMS = "PayByLink Paysafecard",
}

type PaymentMethod = {
    provider: PaymentProvider,
    price: number,
    currency?: Currency
}