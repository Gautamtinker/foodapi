// src/services/pricingService.js

const { error } = require("console");
const db = require("../config/database");
const logger = require("../config/log");

exports.calculateTotalPrice = async (
  zone,
  organization_id,
  total_distance,
  item_type
) => {
  // Fetch pricing details from the database based on inputs
  try {
    const query = `
    SELECT base_distance_in_km, km_price, fix_price
    FROM pricing
    WHERE organization_id = $1 AND zone = $2`;
    const { rows } = await db.query(query, [organization_id, zone]);

    if (rows.length === 0) {
      throw new Error(
        "Pricing not found for the specified organization and zone"
      );
    }

    const { base_distance_in_km, km_price, fix_price } = rows[0];
    console.log(base_distance_in_km, km_price, fix_price);

    // Calculate total price based on distance and item type
    let totalPrice =
      Number(fix_price) +
      Number((total_distance - base_distance_in_km) * km_price);

    if (item_type === "perishable") {
      totalPrice *= 1.5; // Perishable items have 1.5 times the price per km
    }

    logger.info("Total price calculated successfully", {
      zone,
      organization_id,
      total_distance,
      item_type,
      totalPrice,
    });

    return totalPrice;
  } catch (e) {
    logger.error("Error calculating total price", {
      zone,
      organization_id,
      total_distance,
      item_type,
      error: e.message,
    });
    return {
      error: e.message,
    };
  }
};
