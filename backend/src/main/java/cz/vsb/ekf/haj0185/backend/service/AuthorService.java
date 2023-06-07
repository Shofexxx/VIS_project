package cz.vsb.ekf.haj0185.backend.service;

import cz.vsb.ekf.haj0185.backend.entity.Author;

import java.util.List;
public interface AuthorService {
    List<Author> findAll();

    Author findById(int theId);

    Author save(Author theAuthor);

    void deleteById(int theId);
}
