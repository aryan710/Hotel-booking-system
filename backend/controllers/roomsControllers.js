const hotelService = require("../services/hotel-service");

class RoomsControllers {
  async getAllRooms(req, res) {
    const { id } = req.params; //hotelID
    const hotelIdAttachedWithRequest = req.user.hotelId.toString();

    if (id !== hotelIdAttachedWithRequest) {
      return res.status(401).json({
        error: true,
        message: "Unauthorized user",
        success: false,
        data: {},
      });
    }

    try {
      const hotel = await hotelService.getHotel(id);
      if (!hotel) {
        return res.status(404).json({
          message: "error",
          error: "Resource not found",
        });
      }
      res.status(200).json({
        error: false,
        success: true,
        data: hotel.rooms,
      });
    } catch (error) {
      return res.status(500).json({
        message: "error",
        error: "Internal server Error",
      });
    }
  }
  async editRoom() {
    const { room_type } = req.body;
    const { id } = req.params;
  }
  async deleteRoom() {
    const { room_type } = req.body;
    const { id } = req.params;
    const hotelIdAttachedWithRequest = req.user.hotelId.toString();

    if (id !== hotelIdAttachedWithRequest) {
      return res.status(401).json({
        error: true,
        message: "Unauthorized user",
        success: false,
        data: {},
      });
    }

    try {
      const hotel = await hotelService.getHotel(id);
      if (!hotel) {
        return res.status(404).json({
          message: "error",
          error: "Resource not found",
        });
      }

      const newList = hotel.rooms.filter((room) => room.room_type != room_type);

      hotel.rooms = newList;
      await hotel.save();

      res.status(200).json({
        error: false,
        success: true,
      });
    } catch (error) {
      return res.status(500).json({
        message: "error",
        error: "Internal server Error",
      });
    }
  }
}
module.exports = new RoomsControllers();
