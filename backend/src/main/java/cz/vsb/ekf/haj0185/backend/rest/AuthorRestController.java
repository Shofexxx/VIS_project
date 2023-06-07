package cz.vsb.ekf.haj0185.backend.rest;

import cz.vsb.ekf.haj0185.backend.entity.Author;
import cz.vsb.ekf.haj0185.backend.service.AuthorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@RestController
@RequestMapping("/api")
public class AuthorRestController {

    private AuthorService authorService;
    @Autowired
    public AuthorRestController(AuthorService authorService) {
        this.authorService = authorService;
    }

    @GetMapping("/authors")
    public List<Author> findAll(){
        return authorService.findAll();
    }

    @PostMapping("/authors")
    public Author addAuthor(@RequestBody Author theAuthor){

        theAuthor.setIdAuthor(0);

        Author author = authorService.save(theAuthor);

        return author;
    }
}

