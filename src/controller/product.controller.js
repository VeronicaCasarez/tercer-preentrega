import CustomError from "../services/CustomError.js";
import EErrors from "../services/enum.js";
import { generateProductErrorInfo } from "../services/info.js";
import { productService } from "../repositories/services.js";

////GUARDAR PRODUCTO////*** */
const saveProduct = async (req, res) => {
    try {
      const product = req.body;
      if (!product || !product.name || !product.description || !product.price || !product.category || !product.availability) {
        throw new CustomError(EErrors.InvalidData, "Los datos del producto son inválidos.");
      }
  
      await productService.createProduct(product);
      res.send(product);
    } catch (error) {
      if (error instanceof CustomError) {
        const errorInfo = generateProductErrorInfo(error);
        res.status(errorInfo.statusCode).json(errorInfo);
      } else {
        console.error("Error no controlado:", error);
        res.status(500).json({ message: "Error interno del servidor." });
      }
    }
  };
  
  ////OBTENER TODOS LOS PRODUCTOS////*** */
  const getAllProducts = async (req, res) => {
    const products = await productService.getAllProducts();
    const user = req.user;
    const cartId = req.user.user.user.cart;
    const userRole = user.user.user.role;
    const showEditButton = userRole === 'admin';
    res.render('product', { products: products, user: user, cartId: cartId, showEditButton });
  };
  
////OBTENER UN PRODUCTO////*** */
  const getProductById = async (req, res) => {
    const pid = req.params.pid;
    const productById = await productService.getProductById(pid);
    productById._id = productById._id.toString();
    res.render('productdetail', productById);
  };

////OBTENER TODOS LOS PRODUCTOS, LOS MUESTRA AL ADMIN////*** */
  const getAllProductsForAdmin = async (req, res) => {
    const products = await productService.getAllProducts();
    res.render('updateproducts', { products: products });
  };
  
////OBTENER UN PRODUCTO, LOS MUESTRA AL ADMIN////*** */
  const getProductByIdForAdmin = async (req, res) => {
    const pid = req.params.pid;
    const productById = await productService.getProductById(pid);
    productById._id = productById._id.toString();
  
    res.render('updateoneproduct', { productById });
  };
  
  ////ACTUALIZA UN PRODUCTO////
  const updateProduct = async (req, res) => {
    const { pid } = req.params;
    const productToUpdated = req.body;
    const productUpdated = await productService.updateProduct(pid, productToUpdated);
    console.log(productToUpdated);
    res.send(productUpdated);
  };
  
  ////ELIMINA UN PRODUCTO////**** */
  const deleteProduct = async (req, res) => {
    const { pid } = req.params;
    const productId = await productService.deleteProduct(pid);
    res.send(productId);
  };
  
 
export {saveProduct,getAllProducts,getProductById, deleteProduct,updateProduct,getAllProductsForAdmin,getProductByIdForAdmin}