package cz.vsb.ekf.haj0185.backend.service;

import cz.vsb.ekf.haj0185.backend.entity.Book;
import java.util.List;
public interface BookService {
    List<Book> findAll();

    Book findById(int theId);

    Book save(Book theBook);

    void deleteById(int theId);
}
