package cz.vsb.ekf.haj0185.backend.repository;

import cz.vsb.ekf.haj0185.backend.entity.Book;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
public interface BookRepository extends JpaRepository<Book, Integer> {
    @Query("Select b from Book b where b.name LIKE %?1%")
    List<Book> findByName(String keyword);
    List<Book> findTop3ByOrderBySalesDesc();

}
