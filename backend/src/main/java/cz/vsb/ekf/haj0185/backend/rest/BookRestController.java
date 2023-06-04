package cz.vsb.ekf.haj0185.backend.rest;

import cz.vsb.ekf.haj0185.backend.entity.Book;
import cz.vsb.ekf.haj0185.backend.service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api")
public class BookRestController {
    private BookService bookService;
    @Autowired
    public BookRestController(BookService bookService) {
        this.bookService = bookService;
    }

    @GetMapping("/books")
    public List<Book> findAll(){
        return bookService.findAll();
    }
    @GetMapping("/books/{bookId}")
    public Book getBook(@PathVariable int bookId){
        Book book = bookService.findById(bookId);
        if (book == null) {
            throw new RuntimeException("Id knihy nenalezeno - " + book);
        }

        return book;
    }

    @PostMapping("/books")
    public Book addBook(@RequestBody Book theBook){

        theBook.setIdBook(0);

        Book book = bookService.save(theBook);

        return book;
    }

    @PutMapping("/books")
    public Book updateBook(@RequestBody Book theBook){

        Book book = bookService.save(theBook);

        return book;
    }

    @DeleteMapping("/books/{bookId}")
    public String deleteBook(@PathVariable int bookId){

        Book book = bookService.findById(bookId);

        if(book == null){
            throw new RuntimeException("Id knihy nenalezeno - " + bookId);
        }

        bookService.deleteById(bookId);

        return "Smazána knížka id - " +bookId;
    }
}
