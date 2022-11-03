package learn.capstone.controllers;

import com.google.gson.Gson;
import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;
import com.stripe.param.PaymentIntentCreateParams;
import learn.capstone.models.Payment;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/payments")
public class PaymentController {
    @Value("${stripe.apikey}")
    String stripeKey;

    @Value("${stripe.publicApiKey}")
    String stripePublicKey;

    @GetMapping("/stripe-public-key")
    public String getStripePublicKey(){
        return stripePublicKey;
    }
    @PostMapping("/create-payment-intent")
    public String createPaymentIntent(@RequestBody Payment p) throws StripeException {
        Stripe.apiKey = stripeKey;
        PaymentIntentCreateParams params =
                PaymentIntentCreateParams.builder()
                        .setAmount(p.getPrice())
                        .setCustomer(p.getCustomerId())
                        .setCurrency("usd")
                        .addPaymentMethodType("card")
                        .setStatementDescriptor("Custom descriptor")
                        .build();

        PaymentIntent paymentIntent = PaymentIntent.create(params);
        String json = new Gson().toJson(paymentIntent);
        return json;
    }
}
