package learn.capstone.controllers;

import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.Customer;
import learn.capstone.models.Customer2;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/customers")
public class CustomerController {
    @Value("${stripe.apikey}")
    String stripeKey;

    @PostMapping("/create")
    public Customer2 create(@RequestBody Customer2 cust) throws StripeException {
        Stripe.apiKey = stripeKey;

        Map<String, Object> params = new HashMap<>();
        params.put(
                "name", cust.getName()
        );
        params.put(
                "email", cust.getEmail()
        );
        Customer customer = Customer.create(params);
        cust.setCustomerId(customer.getId());
        return cust;
    }
}
