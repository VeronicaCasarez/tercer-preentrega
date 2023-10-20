import Users from "../dao/dbManagers/userDao.js";
import UserRepository from "./user.repository.js";
import Products from "../dao/dbManagers/productDao.js";
import ProductRepository from "./product.repository.js";


const usersDao = new Users();
const productsDao = new Products();

export const userService = new UserRepository(usersDao);
export const productService = new ProductRepository(productsDao);
