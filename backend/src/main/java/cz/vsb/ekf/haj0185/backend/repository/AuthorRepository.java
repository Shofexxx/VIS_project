package cz.vsb.ekf.haj0185.backend.repository;

import cz.vsb.ekf.haj0185.backend.entity.Author;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AuthorRepository extends JpaRepository<Author, Integer> {
}
