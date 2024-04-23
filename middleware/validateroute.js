exports.validateRequest = (req, res, next) => {
  console.log(req);
  // Check if all required fields are present
  const { zone, organization_id, total_distance, item_type } = req.body;
  if (!zone || !organization_id || !total_distance || !item_type) {
    return res.status(400).json({ error: "All fields are required" });
  }

  // Check if organization_id is numeric
  if (isNaN(organization_id)) {
    return res.status(400).json({ error: "Organization ID must be numeric" });
  }

  // Check if total_distance is numeric
  if (isNaN(total_distance)) {
    return res.status(400).json({ error: "Total distance must be numeric" });
  }

  // Check if item_type is valid
  if (!["perishable", "non-perishable"].includes(item_type)) {
    return res.status(400).json({ error: "Invalid item type" });
  }

  // If all checks pass, proceed to the next middleware
  next();
};
