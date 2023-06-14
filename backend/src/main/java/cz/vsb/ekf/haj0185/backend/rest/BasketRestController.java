package cz.vsb.ekf.haj0185.backend.rest;

import cz.vsb.ekf.haj0185.backend.entity.Book;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
@RestController
@RequestMapping("/api/basket")
public class BasketRestController {
    private List<Book> basketItems = new ArrayList<>();

    @GetMapping
    public List<Book> getBasketItems() {
        return basketItems;
    }

    @PostMapping("/add")
    public void addToBasket(@RequestBody Book book) {
        basketItems.add(book);
    }

    @DeleteMapping("/remove/{id}")
    public void removeFromBasket(@PathVariable int id) {
        basketItems.removeIf(book -> book.getIdBook() == id);
    }

    @PostMapping("/clear")
    public void clearBasket() {
        basketItems.clear();
    }
}
