const winston = require("winston");
const logger = winston.createLogger({
  transports: [
    new winston.transports.Console(), // Log to console
    new winston.transports.File({ filename: "logs/app.log" }), // Log to file
  ],
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
});
module.exports = logger;
