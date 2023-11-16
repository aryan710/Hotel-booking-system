const bookingModel = require("../models/booking-model");
const feedbackModel = require("../models/feedback-model");
const hotelModel = require("../models/hotel-model");

class BookingService {
  async getAllConfirmedBookings(hotelId){
    return bookingModel.find({hotel: hotelId, status:"confirmed"});
  }
  async getAllCanceledBookings(hotelId){
    return bookingModel.find({hotel: hotelId, status:"canceled"});
  }
  async getAllPendingBookings(hotelId){
    return bookingModel.find({hotel: hotelId, status:"pending"});
  }
}
module.exports = new BookingService();
