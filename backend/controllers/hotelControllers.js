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
      data: hotel,
    });
  }

  async createHotel(req, res) {
    const {
      name,
      contact_number,
      email,
      description,
      images,
      location,
      address,
      rooms,
    } = req.body;

    if (
      !name ||
      !email ||
      !description ||
      !contact_number ||
      !location ||
      !address ||
      !rooms ||
      !location.city ||
      !location.state ||
      rooms.length === 0
    ) {
      return res.status(400).json({
        error: true,
        message: "The request is missing a required parameter",
        success: false,
        data: {},
      });
    }

    let hotel;
    try {
      hotel = await hotelService.createHotel({
        name,
        email,
        description,
        contact_number,
        images,
        location,
        address,
        rooms,
      });
    } catch (error) {
      return res.status(500).json({
        error: true,
        message: error.message,
        success: false,
        data: {},
      });
    }

    res.status(200).json({
      error: false,
      message: `your hotel id is ${hotel._id}`,
      success: true,
      data: hotel,
    });
  }

  async giveFeedback(req, res) {
    const { id } = req.params;
    const { feedback } = req.body;
    let hotel;
    try {
      hotel = await hotelService.getHotel(id);
      if (!hotel) {
        return res.status(404).json({
          error: true,
          message: "The request is missing a required parameter",
          success: false,
          data: {},
        });
      }
    } catch (error) {
      return res.status(500).json({
        error: true,
        message: "Internal server error 1",
        success: false,
        data: {},
      });
    }
    let feed;
    try {
      feed = await hotelService.createFeedback(req.user._id, id, feedback);
      hotel.feedbacks.push(feed._id);
      await hotel.save();
    } catch (error) {
      return res.status(500).json({
        error: true,
        message: "Internal server error 1",
        success: false,
        data: {},
      });
    }

    res.status(200).json({
      error: true,
      message: "thank you for your feedback!!",
      success: false,
      data: feed,
    });
  }
}
module.exports = new HotelControllers();
