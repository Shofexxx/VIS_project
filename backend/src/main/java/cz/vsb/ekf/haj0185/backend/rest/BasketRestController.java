package cz.vsb.ekf.haj0185.backend.rest;

import cz.vsb.ekf.haj0185.backend.entity.Book;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/basket")
public class BasketRestController {
    private Map<String, List<Book>> baskets = new HashMap<>();

    @GetMapping
    public List<Book> getBasketItems(@RequestParam String userId) {
        List<Book> basketItems = baskets.getOrDefault(userId, new ArrayList<>());
        return basketItems;
    }

    @PostMapping("/add")
    public void addToBasket(@RequestBody BasketRequest basketRequest) {
        String userId = basketRequest.getUserId();
        Book book = basketRequest.getBook();

        List<Book> basketItems = baskets.getOrDefault(userId, new ArrayList<>());
        basketItems.add(book);
        baskets.put(userId, basketItems);
    }

    @DeleteMapping("/remove/{userId}/{id}")
    public void removeFromBasket(@PathVariable String userId, @PathVariable int id) {
        List<Book> basketItems = baskets.getOrDefault(userId, new ArrayList<>());
        basketItems.removeIf(book -> book.getIdBook() == id);
    }

    @PostMapping("/clear")
    public void clearBasket(@RequestParam String userId) {
        baskets.remove(userId);
    }

    public static class BasketRequest {
        private String userId;
        private Book book;

        public String getUserId() {
            return userId;
        }

        public void setUserId(String userId) {
            this.userId = userId;
        }

        public Book getBook() {
            return book;
        }

        public void setBook(Book book) {
            this.book = book;
        }
    }
}