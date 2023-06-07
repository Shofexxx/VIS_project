package cz.vsb.ekf.haj0185.backend.service;

import cz.vsb.ekf.haj0185.backend.entity.Author;
import cz.vsb.ekf.haj0185.backend.repository.AuthorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
@Service
public class AuthorServiceImpl implements AuthorService{

    private AuthorRepository authorRepository;

    @Autowired
    public AuthorServiceImpl(AuthorRepository authorRepository) {
        this.authorRepository = authorRepository;
    }

    @Override
    public List<Author> findAll() {
        return authorRepository.findAll();
    }

    @Override
    public Author findById(int theId) {
        Optional<Author> result = authorRepository.findById(theId);
        Author author = null;
        if(result.isPresent()){
            author = result.get();
        }else{
            throw new RuntimeException("Autor" + theId +"nenalezen.");
        }

        return author;
    }

    @Override
    public Author save(Author theAuthor) {
        return authorRepository.save(theAuthor);
    }

    @Override
    public void deleteById(int theId) {
        authorRepository.deleteById(theId);
    }
}
