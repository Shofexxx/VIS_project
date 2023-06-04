import axios from "axios";

const BASE_URL = "http://localhost:8080/api/books";
class BookService{
    getAllBooks(){
        return axios.get(BASE_URL)
    }
}
export default new BookService();