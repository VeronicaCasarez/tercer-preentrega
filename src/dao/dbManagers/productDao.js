import productsModel from '../models/product.model.js';
import notifier from 'node-notifier';


export default class ProductDao {
  constructor() {
    console.log(`Working users with Database persistence in mongodb`)
}
  save = async (product) => {
    const newProduct = await productsModel.create(product);
    return newProduct;
  };
  getAll = async () => {
    let products = await productsModel.find({}).lean();
    return products;
  };
  getById = async (pid) => {
    let productId = await productsModel.findById(pid);
    return productId;
  };
  update = async (pid, product) => {
    const updatedProduct = await productsModel.findByIdAndUpdate(pid, product, { new: true });
    console.log(updatedProduct);
    return updatedProduct;
  };
  delete = async (pid) => {
    const deletedProduct = await productsModel.findByIdAndDelete(pid);
    return deletedProduct;
  };

  getByCategory = async (filter) => {
    const products = await productsModel.find();
    const productsByCategory = products.filter(
      (p) => String(p.category) == filter
    );

    return productsByCategory;
  };

  getByAvailability = async (filter) => {
    try {
      const products = await productsModel.find();
      const productsByAvailability = products.filter(
        (p) => String(p.availability) == filter
      );
      if (productsByAvailability.length > 0) {
        return productsByAvailability;
      } else {
        notifier.notify({
          title: 'Info',
          message: 'No existe un producto con esa disponibilidad.'
        });
      }
    } catch (error) {
      console.error("Error al obtener productos por disponibilidad", error);
      throw error;
    }
  };

 
}
