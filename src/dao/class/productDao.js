import productsModel from '../models/product.model.js';
import notifier from 'node-notifier';

//comunicacion con la base de datos
export default class ProductDao {
  async getAll() {
    let products= await productsModel.find({}).lean();
    return products;
  }

  async getById(id) {
      let productId= await productsModel.findById(id);
      return productId
  };
 
  async getByCategory(filter) {
    const products = await productsModel.find()
    const productsByCategory = products.filter(
      (p) => String(p.category) == filter
   );
 
   return productsByCategory;
}


async getByAvailability(filter) {
  try {
    const products = await productsModel.find();
    const productsByAvailability = products.filter(
      (p) => String(p.availability) == filter
    );
    if (productsByAvailability.length>0){ 
         return productsByAvailability;
    }else{
      notifier.notify({
        title: 'Info',
        message: 'No existe un producto con esa disponibilidad.'
      });
    }
  } catch (error) {
    console.error("Error al obtener productos por disponibilidad", error);
    throw error;
  }
}


  async save(data) {
    const newProduct = await productsModel.create(data);
    return newProduct;
  };

  async update(id, data) {
    const updatedProduct = await productsModel.findByIdAndUpdate(id, data, { new: true });
    console.log(updatedProduct)
    return updatedProduct;
  };

  async delete(id) {
    const deletedProduct = await productsModel.findByIdAndDelete(id);
    return deletedProduct;
  };
}
