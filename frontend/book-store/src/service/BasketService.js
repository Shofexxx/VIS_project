import axios from "axios";
import { BASE_URL } from "../config/apiConfig";

class BasketService {
  getBasketItems(userId) {
    return axios.get(`${BASE_URL}/api/basket?userId=${userId}`);
  }
  
  addToBasket(purchaseData) {
    return axios.post(`${BASE_URL}/api/basket/add`, purchaseData);
  }

  removeFromBasket(userId, bookId) {
    return axios.delete(`${BASE_URL}/api/basket/remove/${userId}/${bookId}`);
  }  

  clearBasket(userId) {
    return axios.post(`${BASE_URL}/api/basket/clear?userId=${userId}`);
  }
}

export default new BasketService();
