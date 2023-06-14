package cz.vsb.ekf.haj0185.backend.rest;

import cz.vsb.ekf.haj0185.backend.entity.Book;
import cz.vsb.ekf.haj0185.backend.entity.Customer;
import cz.vsb.ekf.haj0185.backend.service.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@RestController
@RequestMapping("/api")
public class CustomerRestController {
    private CustomerService customerService;
    @Autowired
    public CustomerRestController(CustomerService customerService) {
        this.customerService = customerService;
    }

    @GetMapping("/customers")
    public List<Customer> findAll(){
        return customerService.findAll();
    }

    @GetMapping("/customers/{customerId}")
    public Customer getCustomer(@PathVariable int customerId){
        Customer customer = customerService.findById(customerId);
        if (customer == null) {
            throw new RuntimeException("Id zakaznika nenalezeno - " + customer);
        }

        return customer;
    }

    @PostMapping("/customers")
    public Customer addCustomer(@RequestBody Customer customer){
        customer.setIdCustomer(0);

        Customer theCustomer = customerService.save(customer);

        return theCustomer;
    }
}
