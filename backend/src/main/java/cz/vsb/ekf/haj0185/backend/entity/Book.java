package cz.vsb.ekf.haj0185.backend.entity;

import jakarta.persistence.*;

@Entity
@Table(name="books")
public class Book {

   @Id
   @GeneratedValue(strategy = GenerationType.IDENTITY)
   @Column(name="IDBooks")
   private int idBook;

   @Column(name="Name")
   private String name;

   @Column(name="ISBN")
   private String isbn;

   @Column(name="Price")
   private double price;
   @Column(name="Quantity")
   private int quantity;

   @Column(name="Sales")
   private int sales;
    @ManyToOne
    @JoinColumn(name="AuthorID", nullable=false)
    private Author author;
    public Book() {
    }

    public Book(int idBook, String name, String isbn, int price, int quantity, int sales, Author author) {
        this.idBook = idBook;
        this.name = name;
        this.isbn = isbn;
        this.price = price;
        this.quantity = quantity;
        this.sales = sales;
        this.author = author;
    }

    public int getIdBook() {
        return idBook;
    }

    public void setIdBook(int idBook) {
        this.idBook = idBook;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getIsbn() {
        return isbn;
    }

    public void setIsbn(String isbn) {
        this.isbn = isbn;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public Author getAuthor() {
        return author;
    }

    public void setAuthor(Author author) {
        this.author = author;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public int getSales() {
        return sales;
    }

    public void setSales(int sales) {
        this.sales = sales;
    }
}
