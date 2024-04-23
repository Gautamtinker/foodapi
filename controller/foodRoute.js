// src/controllers/pricingController.js

const { calculateTotalPrice } = require("../services/calculateTotalPrice");

exports.calculatePrice = async (req, res, next) => {
  try {
    const { zone, organization_id, total_distance, item_type } = req.body;
    const totalPrice = await calculateTotalPrice(
      zone,
      organization_id,
      total_distance,
      item_type
    );
    res.json({ total_price: totalPrice });
  } catch (error) {
    return res.json({ message: error });
  }
};
