package cz.vsb.ekf.haj0185.backend.rest;

import cz.vsb.ekf.haj0185.backend.entity.Book;
import cz.vsb.ekf.haj0185.backend.entity.Customer;
import cz.vsb.ekf.haj0185.backend.service.BookService;
import cz.vsb.ekf.haj0185.backend.service.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Set;
@RestController
@RequestMapping("/api")
public class CustomerRestController {
    private CustomerService customerService;
    @Autowired
    public CustomerRestController(CustomerService customerService) {
        this.customerService = customerService;
    }
    @Autowired
    private BookService bookService;

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
    @GetMapping("/customers/{customerId}/books")
    public Set<Book> getCustomerBooks(@PathVariable int customerId) {
        Customer customer = customerService.findById(customerId);
        if (customer == null) {
            throw new RuntimeException("Customer not found with ID: " + customerId);
        }

        return customer.getAssignedBooks();
    }
    @PostMapping("/customers")
    public Customer addCustomer(@RequestBody Customer customer){
        customer.setIdCustomer(0);

        Customer theCustomer = customerService.save(customer);

        return theCustomer;
    }

    @PostMapping("/customers/{customerId}/book/{bookId}")
    public Customer assingBookToCustomer(
    @PathVariable int customerId,
    @PathVariable int bookId
    ){
        Customer customer = customerService.assingBookToCustomer(customerId, bookId);

        Book book = bookService.findById(bookId);
        book.setQuantity(book.getQuantity() - 1);
        book.setSales(book.getSales() + 1);
        bookService.save(book);

        return customer;
    }

    @DeleteMapping("/customers/{customerId}")
    public String deleteCustomer(@PathVariable int customerId){
        Customer customer = customerService.findById(customerId);

        if(customer == null){
            throw new RuntimeException("Id zákazníka nenalezeno" +customerId);
        }

        customerService.deleteById(customerId);

        return "Zákazník smazán: " +customerId;
    }
}
