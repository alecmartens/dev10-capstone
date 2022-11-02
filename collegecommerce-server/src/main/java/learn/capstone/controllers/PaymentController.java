package learn.capstone.controllers;

import com.google.gson.Gson;
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

    @Value("${stripe.publicApiKey}")
    String stripePublicKey;

    @GetMapping("/stripe-public-key")
    public String getStripePublicKey(){
        return stripePublicKey; 
    }
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
        String json = new Gson().toJson(paymentIntent);
        return json;
    }
}
