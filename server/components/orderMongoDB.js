import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
  data: [
    {
      id: { type: String },
      img: { type: String },
      name: { type: String },
      dsc: { type: String },
      price: { type: Number },
      rate: { type: Number },
      country: { type: String },
      count: { type: Number },
      user: { type: String },
      email: { type: String },
      phone: { type: String },
      address: { type: String },
    },
  ],
});

export default mongoose.model("Order", OrderSchema);
