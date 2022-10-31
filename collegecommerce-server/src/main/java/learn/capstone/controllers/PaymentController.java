package learn.capstone.controllers;

import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;
import com.stripe.param.PaymentIntentCreateParams;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/payments")
public class PaymentController {
    @Value("${stripe.apikey}")
    String stripeKey;

    @GetMapping("/create-payment-intent")
    public String createPaymentIntent() throws StripeException {
        Stripe.apiKey = stripeKey;
        PaymentIntentCreateParams params =
                PaymentIntentCreateParams.builder()
                        .setAmount(1099L)
                        .setCurrency("usd")
                        .addPaymentMethodType("card")
                        .setStatementDescriptor("Custom descriptor")
                        .build();

        PaymentIntent paymentIntent = PaymentIntent.create(params);
        return paymentIntent.getClientSecret();
    }
}
