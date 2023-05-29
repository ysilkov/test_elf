import Burgers from "./components/burgersMongoDB.js";
import Order from "./components/order.js";
import OrderSchema from "./components/orderMongoDB.js";

class PostController {
  async getBurgers(req, res) {
    try {
      const { country } = req.body;
      const burgers = await Burgers.find({ country });
      return res.json(burgers);
    } catch (error) {
      console.error(error);
      return res.status(400).json({ message: "Failed to retrieve burgers" });
    }
  }

  async postOrder(req, res) {
    try {
      const orderProducts = await Order.createOrder(req.body);
      return res.json({
        message: `You have placed an order for items. Your order number is ${orderProducts._id}.`,
      });
    } catch (error) {
      console.error(error);
      return res.status(400).json({ message: "Failed to place an order" });
    }
  }

  async archiveOrder(req, res) {
    const { email, phone } = req.body;
    try {
      const archive = await OrderSchema.find({ "data.email": email, "data.phone": phone });
      return res.json(archive);
    } catch (error) {
      console.error(error);
      return res.status(400).json({ message: "Failed to retrieve archived orders" });
    }
  }
}

export default new PostController();