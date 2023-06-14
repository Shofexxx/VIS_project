package cz.vsb.ekf.haj0185.backend.entity;

import jakarta.persistence.*;

@Entity
@Table(name="customer")
public class Customer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="IDCustomer")
    private int idCustomer;

    @Column(name="Name")
    private String name;

    @Column(name="Surname")
    private String surname;

    @Column(name="Email")
    private String email;

    public Customer() {
    }

    public Customer(int idCustomer, String name, String surname, String email) {
        this.idCustomer = idCustomer;
        this.name = name;
        this.surname = surname;
        this.email = email;
    }

    public int getIdCustomer() {
        return idCustomer;
    }

    public void setIdCustomer(int idCustomer) {
        this.idCustomer = idCustomer;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSurname() {
        return surname;
    }

    public void setSurname(String surname) {
        this.surname = surname;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}
