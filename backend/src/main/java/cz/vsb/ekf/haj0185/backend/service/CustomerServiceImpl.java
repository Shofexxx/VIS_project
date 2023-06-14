package cz.vsb.ekf.haj0185.backend.service;

import cz.vsb.ekf.haj0185.backend.entity.Book;
import cz.vsb.ekf.haj0185.backend.entity.Customer;
import cz.vsb.ekf.haj0185.backend.repository.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CustomerServiceImpl implements CustomerService{

    private CustomerRepository customerRepository;
    @Autowired
    public CustomerServiceImpl(CustomerRepository customerRepository) {
        this.customerRepository = customerRepository;
    }

    @Override
    public List<Customer> findAll() {
        return customerRepository.findAll();
    }

    @Override
    public Customer findById(int theId) {
        Optional<Customer> result = customerRepository.findById(theId);
        Customer customer = null;
        if (result.isPresent()) {
            customer = result.get();
        }
        else {
            throw new RuntimeException("Zákazník" + theId +"nenalezen.");
        }

        return customer;
    }

    @Override
    public Customer save(Customer customer) {
        return customerRepository.save(customer);
    }

    @Override
    public void deleteById(int theId) {
        customerRepository.deleteById(theId);
    }

}
