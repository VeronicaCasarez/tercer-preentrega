import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const productsCollection = "products";

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  availability: { type: Number, required: true },
  productImage: String,
  // owner: { type: String, default: 'admin', validate: {
  //   validator: function(email) {

  //     return user && user.role === 'premium' && email === user.email;
  //   },
  //   message: 'Este campo solo puede ser establecido por usuarios premium con su propio correo electrónico.'
  // }},
  owner: { type: String, default: 'admin'}
});
productSchema.plugin(mongoosePaginate);

const productsModel = mongoose.model(productsCollection, productSchema);

export default productsModel;
