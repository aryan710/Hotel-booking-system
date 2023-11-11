const bookingModel = require("../models/booking-model");
const hotelModel = require("../models/hotel-model");

class HotelService {
  async getHotels() {
    const hotels = hotelModel.find();
    return hotels;
  }
  async getHotel(id) {
    const hotel = hotelModel.findOne({ _id: id });
    return hotel;
  }
  async createHotel(data) {
    const {
      name,
      email,
      description,
      contact_number,
      images,
      location,
      address,
      rooms,
    } = data;

    return await hotelModel.create({
      name,
      email,
      description,
      contact_number,
      images,
      location,
      address,
      rooms,
    });
  }
  async isRoomTypeExist(hotel, roomType) {
    let available = false;
    let roomTypeExist = false;
    const { rooms } = hotel;
    for (const room of rooms) {
      if (room.room_type === roomType) {
        available = false;
        if (room.total_room_available != 0) {
          available = true;
        }
        roomTypeExist = true;
        return { available, roomTypeExist };
      }
    }
    return { available, roomTypeExist };
  }

  async getPricePerDay(hotel, roomType) {
    const { rooms } = hotel;
    let price;
    for (const room of rooms) {
      if (room.room_type === roomType) {
        price = room.price_per_night;
      }
    }
    // console.log(setroom);
    return price;
  }

  async bookHotel(user, hotelId, roomType, checkIn, checkOut, netPrice) {
    // console.log(netPrice);
    return await bookingModel.create({
      user: user._id,
      hotel: hotelId,
      room_type: roomType,
      checkInDate: checkIn,
      checkOutDate: checkOut,
      totalPrice: netPrice,
    });
  }
}
module.exports = new HotelService();
