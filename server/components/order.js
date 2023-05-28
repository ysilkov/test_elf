import OrderSchema from "./orderMongoDB.js";

class Order {
  static async createOrder(data) {
    try {
      const createOrder = await OrderSchema.create(data);
      return createOrder;
    } catch (e) {
      throw new Error(e);
    }
  }
}

export default Order;
