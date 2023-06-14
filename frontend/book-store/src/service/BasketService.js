import axios from "axios";
import { BASE_URL } from "../config/apiConfig";

class BasketService {
  getBasket() {
    return axios.get(`${BASE_URL}/api/basket`);
  }

  addToBasket(book) {
    return axios.post(`${BASE_URL}/api/basket/add`, book);
  }

  removeFromBasket(bookId) {
    return axios.delete(`${BASE_URL}/api/basket/remove/${bookId}`);
  }

  clearBasket() {
    return axios.post(`${BASE_URL}/api/basket/clear`);
  }
}

export default new BasketService();