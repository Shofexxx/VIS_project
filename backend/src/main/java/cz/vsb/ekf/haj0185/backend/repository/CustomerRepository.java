package cz.vsb.ekf.haj0185.backend.repository;

import cz.vsb.ekf.haj0185.backend.entity.Customer;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CustomerRepository extends JpaRepository<Customer, Integer> {

}
