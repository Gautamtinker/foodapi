const express = require("express");
const router = express.Router();
const pricingController = require("../controller/foodRoute");
const { validateRequest } = require("../middleware/validateroute");

// POST /pricing/calculate
router.get("/calculate", validateRequest, pricingController.calculatePrice);

module.exports = router;
