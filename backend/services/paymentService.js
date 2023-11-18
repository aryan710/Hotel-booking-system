class PaymentService {
  async validateAmount(id, amount) {
    let isValidated = false;
    let hotel;
    try {
      hotel = await hotelService.getHotel(id);
      console.log(hotel);
      if (!hotel) {
        const errorMsg = {
          status: 400,
          message: "The request is missing a required parameter",
        };
        throw new Error(JSON.stringify(errorMsg));
      }
    } catch (error) {
      const errorMsg = {
        status: 500,
        message: "Internal server error",
      };
      throw new Error(JSON.stringify(errorMsg));
    }

    const { available, roomTypeExist } = await hotelService.isRoomTypeExist(
      hotel,
      roomType
    );
    if (!roomTypeExist) {
      const errorMsg = {
        status: 404,
        message: "This type of room is not exist in our hotel",
      };
      throw new Error(JSON.stringify(errorMsg));
    }
    if (!available) {
      const errorMsg = {
        status: 404,
        message: "All rooms are booked",
      };
      throw new Error(JSON.stringify(errorMsg));
    }

    const date1 = new Date(checkIn);
    const date2 = new Date(checkOut);
    const difference = date2.getTime() - date1.getTime();
    const differenceInDays = difference / (1000 * 3600 * 24);
    const pricePerday = await hotelService.getPricePerDay(hotel, roomType);
    const netPrice = pricePerday * differenceInDays;

    if (Number(amount) === netPrice) {
       isValidated = true;
    }
    return true;
  }
}
module.exports = new PaymentService();
