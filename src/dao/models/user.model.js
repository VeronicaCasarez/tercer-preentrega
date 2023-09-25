import mongoose from "mongoose";

const userCollection = "users";

const userSchema = new mongoose.Schema({
  first_name: String,
  last_name: String,
  email: { type: String, unique: true },
  age: Number,
  password: String, 
  cart: { type: mongoose.Schema.Types.ObjectId, ref: 'Carts' },
  role: { type: String, default: 'user' },
});
  
// userSchema.pre("findById", function () {
//   this.populate("carts.product");
// });

// userSchema.pre("findOne", function () {
//   this.populate("carts.product");
// });

// userSchema.pre("find", function () {
//   this.populate("carts.product");
// });

const User = mongoose.model(userCollection, userSchema);

export default User;