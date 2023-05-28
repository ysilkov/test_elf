import Burgers from "./components/burgersMongoDB.js";
import Order from "./components/order.js";
import OrderSchema from "./components/orderMongoDB.js";

class PostController {
  async getBurgers(req, res) {
    try {
      const { country } = req.body;
      const burgers = await Burgers.find({ country: country });
      return res.json(burgers);
    } catch (e) {
      return res.status(400).json({ message: `There are no burgers` });
    }
  }
  async postOrder(req, res) {
    try {
      const orderProducts = await Order.createOrder(req.body);
      return res.json({
        message: `You have placed an order for items. You order number ${orderProducts._id}.`,
      });
    } catch (e) {
      return res.status(400).json(e.message);
    }
  }
  async archiveOrder(req, res) {
    const { email, phone } = req.body;
    try {
      const archive = await OrderSchema.find({
        "data.email": email,
        "data.phone": phone,
      });
      return res.json(archive);
    } catch (e) {
      return res.status(400).json({ message: `There are no products` });
    }
  }
}

export default new PostController();
