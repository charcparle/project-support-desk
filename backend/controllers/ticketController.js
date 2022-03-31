const asyncHandler = require("express-async-handler");

const User = require("../models/userModel");
const Ticket = require("../models/ticketModel");

// @desc Get user tickets
// @route GET /api/tickets
// @access Private
const getTickets = asyncHandler(async (req, res) => {
  // console.log(req.headers)
  //   Get user using the id in the JWT
  const user = await User.findById(req.user.id);
  if (!user) {
      res.status(401)
      throw new Error("User not found")
  }

//   Get tickets of the user
const tickets = await Ticket.find({user: req.user.id})
  res.status(200).json(tickets);
});

// @desc Create new ticket
// @route POST /api/tickets
// @access Private
const createTicket = asyncHandler(async (req, res) => {
  // console.log(req.headers)
  res.status(200).json({ message: "createTicket" });
});

module.exports = { getTickets, createTicket };
