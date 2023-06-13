import axios from "axios";
import { BASE_URL } from "../config/apiConfig";

class BookService{
    getAllBooks(){
        return axios.get(`${BASE_URL}/api/books`)
    }
}
export default new BookService();