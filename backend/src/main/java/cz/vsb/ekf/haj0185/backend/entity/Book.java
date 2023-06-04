package cz.vsb.ekf.haj0185.backend.entity;

import jakarta.persistence.*;

@Entity
@Table(name="Books")
public class Book {

   @Id
   @GeneratedValue(strategy = GenerationType.IDENTITY)
   @Column(name="IDBooks")
   private int idBook;

   @Column(name="Name")
   private String name;

   @Column(name="ISBN")

   private String isbn;
   @Column(name="Quantity")
   private int quantity;

   @Column(name = "AuthorID")
   private int authorId;

    public Book() {
    }

    public Book(int idBook, String name, String isbn, int quantity, int authorId) {
        this.idBook = idBook;
        this.name = name;
        this.isbn = isbn;
        this.quantity = quantity;
        this.authorId = authorId;
    }

    public int getAuthorId() {
        return authorId;
    }

    public void setAuthorId(int authorId) {
        this.authorId = authorId;
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

    @Override
    public String toString() {
        return "Book{" +
                "idBook=" + idBook +
                ", name='" + name + '\'' +
                ", isbn='" + isbn + '\'' +
                ", quantity=" + quantity +
                ", authorId=" + authorId +
                '}';
    }
}
