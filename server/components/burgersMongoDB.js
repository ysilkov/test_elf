import mongoose from "mongoose";
const Burgers = new mongoose.Schema({
  id: { type: String },
  img: { type: String },
  name: { type: String },
  dsc: { type: String },
  price: { type: Number },
  rate: { type: Number },
  country: { type: String },
});

export default mongoose.model("burger", Burgers);
