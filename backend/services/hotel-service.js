const hotelModel = require("../models/hotel-model");

class HotelService{
    async getHotels(){
        const hotels = hotelModel.find();
        return hotels;  
    }
    async getHotel(id){
        const hotel = hotelModel.findOne({_id: id});
        return hotel;
    }   
}
module.exports = new HotelService();