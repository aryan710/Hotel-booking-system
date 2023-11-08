const hotelService = require("../services/hotel-service");

class HotelControllers {
  async getHotels(req, res) {
    let hotels;
    try {
      hotels = await hotelService.getHotels();
    } catch (error) {
      return res.status(500).json({
        message: "error",
        error: "Internal server Error",
      });
    }
    res.status(200).json({
      message: "success",
      data: hotels,
    });
  }

  async getHotel(req, res) {
    const hotelId = req.params.id;
    let hotel;
    try {
      hotel = await hotelService.getHotel(hotelId);
      if (!hotel) {
        return res.status(404).json({
          message: "error",
          error: "Resource not found",
        });
      }
    } catch (error) {
      return res.status(500).json({
        message: "error",
        error: "Internal server Error",
      });
    }

    res.status(200).json({
        message: "success",
        data: hotel
    });
  }
}
module.exports = new HotelControllers();
