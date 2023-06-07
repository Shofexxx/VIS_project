package cz.vsb.ekf.haj0185.backend.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.util.List;
@Entity
@Table(name = "author")
public class Author {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "IDAuthor")
    private int idAuthor;

    @Column(name = "Name")
    private String name;

    @Column(name = "Surname")
    private String surname;

    public Author() {
    }

    public Author(int idAuthor, String name, String surname) {
        this.idAuthor = idAuthor;
        this.name = name;
        this.surname = surname;
    }

    public int getIdAuthor() {
        return idAuthor;
    }

    public void setIdAuthor(int idAuthor) {
        this.idAuthor = idAuthor;
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

    @Override
    public String toString() {
        return "Author{" +
                "idAuthor=" + idAuthor +
                ", name='" + name + '\'' +
                ", surname='" + surname + '\'' +
                '}';
    }
}
