package cz.vsb.ekf.haj0185.backend.service;

import cz.vsb.ekf.haj0185.backend.entity.Customer;

import java.util.List;

public interface CustomerService {
    List<Customer> findAll();

    Customer findById(int theId);

    Customer save(Customer customer);

    void deleteById(int theId);

}
