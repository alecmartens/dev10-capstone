package learn.capstone.controllers;

import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.Customer;
import com.stripe.model.CustomerCollection;
import learn.capstone.domain.ItemResult;
import learn.capstone.domain.ResultType;
import learn.capstone.models.Customer2;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/customers")
public class CustomerController {
    @Value("${stripe.apikey}")
    String stripeKey;
    //TODO update customer
    @GetMapping("/")
    public List<Customer2> findAll() throws StripeException{
        Stripe.apiKey = stripeKey;
        Map<String, Object> params = new HashMap<>();
        CustomerCollection customers =
                Customer.list(params);
        List<Customer> res = customers.getData();
        List<Customer2> res2 = new ArrayList<>();
        for(Customer c: res){
            Customer2 temp = new Customer2();
            temp.setCustomerId(c.getId());
            temp.setName(c.getName());
            temp.setEmail(c.getEmail());
            res2.add(temp);
        }
        return res2;
    }
    @DeleteMapping("/")
    public Customer delete(@RequestBody String customerId) throws StripeException{
        Stripe.apiKey = stripeKey;
        Customer customer =
                Customer.retrieve(customerId);
        Customer deletedCustomer = customer.delete();
        return deletedCustomer;
    }

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
