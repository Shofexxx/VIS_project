import axios from "axios";
import { BASE_URL } from "../config/apiConfig";

class CustomerService {
  getCustomers() {
    return axios.get(`${BASE_URL}/api/customers`);
  }

  addCustomer(customer) {
    return axios.post(`${BASE_URL}/api/customers`, customer);
  }


}

export default new CustomerService();