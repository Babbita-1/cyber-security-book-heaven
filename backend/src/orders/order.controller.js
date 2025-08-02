const Order = require("./order.model");
const Book = require("../books/book.model");

const createAOrder = async (req, res) => {
  try {
    const newOrder = await Order(req.body);
    const savedOrder = await newOrder.save();
    
    // Update purchase count for each book in the order
    if (savedOrder.productIds && savedOrder.productIds.length > 0) {
      for (const bookId of savedOrder.productIds) {
        await Book.findByIdAndUpdate(bookId, { $inc: { purchaseCount: 1 } });
      }
    }
    
    res.status(200).json(savedOrder);
  } catch (error) {
    console.error("Error creating order", error);
    res.status(500).json({ message: "Failed to create order" });
  }
};

const getOrderByEmail = async (req, res) => {
  try {
    const {email} = req.params;
    const orders = await Order.find({email}).sort({createdAt: -1});
    if(!orders) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.status(200).json(orders);
  } catch (error) {
    console.error("Error fetching orders", error);
    res.status(500).json({ message: "Failed to fetch order" });
  }
}

// Get all orders (admin only)
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.status(200).json(orders);
  } catch (error) {
    console.error("Error fetching all orders", error);
    res.status(500).json({ message: "Failed to fetch orders" });
  }
};

// Update order status (admin only)
const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    
    if (!status) {
      return res.status(400).json({ message: "Status is required" });
    }
    
    // Validate status value
    const validStatuses = ['pending', 'processing', 'shipped', 'delivered', 'cancelled'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }
    
    const updatedOrder = await Order.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );
    
    if (!updatedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }
    
    res.status(200).json(updatedOrder);
  } catch (error) {
    console.error("Error updating order status", error);
    res.status(500).json({ message: "Failed to update order status" });
  }
};

module.exports = {
  createAOrder,
  getOrderByEmail,
  getAllOrders,
  updateOrderStatus
};
