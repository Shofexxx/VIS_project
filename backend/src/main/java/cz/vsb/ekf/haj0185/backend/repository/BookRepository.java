package cz.vsb.ekf.haj0185.backend.repository;

import cz.vsb.ekf.haj0185.backend.entity.Book;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BookRepository extends JpaRepository<Book, Integer> {

}
