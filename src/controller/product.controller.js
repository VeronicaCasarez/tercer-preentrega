import CustomError from "../services/CustomError.js";
import EErrors from "../services/enum.js";
import { generateProductErrorInfo } from "../services/info.js";
import { productService } from "../repositories/services.js";
import notifier from "node-notifier";


//CREAR PRODUCTO
const saveProduct = async (req, res) => {
  try {
    const productData = req.body;
    const user = req.user; 

    if (!productData || !productData.name || !productData.description || !productData.price || !productData.category || !productData.availability) {
      throw new CustomError(EErrors.InvalidData, "Los datos del producto son inválidos.");
    }
     // Establece el campo 'owner' del producto
    productData.owner = user.user.user.email;

    await productService.createProduct(productData);
    res.send(productData);
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
    const showEditButton = userRole === 'admin' || userRole === 'premium' ? true : false;

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
    const user=req.user; 
    const products = await productService.getAllProducts();
    res.render('updateproducts', { products: products,user:user });
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
    const { user } = req;
  
    try {
      const product = await productService.getProductById(pid);
  
      if (user.user.user.role === 'admin' || (user.user.user.role === 'premium' && product.owner === user.user.user.email)) {
        const productDeleted = await productService.deleteProduct(pid);
        res.send(productDeleted);
      } else {
         notifier.notify({
          title: 'Permiso denegado',
          message:'No tienes permiso para eliminar este producto.'
        });
      }
    } catch (error) {
      console.error(error);
      res.status(500).send('Error interno del servidor.');
    }
  };
  
  
 
export {saveProduct,getAllProducts,getProductById, deleteProduct,updateProduct,getAllProductsForAdmin,getProductByIdForAdmin}