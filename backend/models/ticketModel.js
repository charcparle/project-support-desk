const mongoose = require("mongoose");

const ticketSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User"
    },
    product: {
      type: String,
      required: [true, "Please select a product"],
      enum: ["Signalling", "Rolling Stock", "PWay", "Power Distribution", "Station Structures"]
    },
    description: {
      type: String,
      required: [true, "Please descibe the issue"],
    },
    status: {
      type: String,
      required: true,
      enum: ["new", "open", "close"],
      default: "new"
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Ticket', ticketSchema)
