const hotelService = require("../services/hotel-service");
const paymentService = require("../services/paymentService");
const instance = require("../services/razorpay-service");
const crypto = require("crypto");
class PaymentControllers {
  async getKey(req, res) {
    res.status(200).json({ key: process.env.RAZORPAY_API_KEY });
  }
  async checkout(req, res) {
    const { id } = req.params;
    const { roomType, checkIn, checkOut, amount } = req.body;
    if (!id || !checkIn || !checkOut || !roomType || !amount) {
      return res.status(400).json({
        error: true,
        message: "The request is missing a required parameter",
        success: false,
        data: {},
      });
    }

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

    const { available, roomTypeExist } = await hotelService.isRoomTypeExist(
      hotel,
      roomType
    );
    if (!roomTypeExist) {
      return res.status(404).json({
        error: true,
        message: "This type of room is not exist in our hotel",
        success: false,
        data: {},
      });
    }
    if (!available) {
      return res.status(404).json({
        error: true,
        message: "All rooms are booked",
        success: false,
        data: {},
      });
    }

    const date1 = new Date(checkIn);
    const date2 = new Date(checkOut);
    const difference = date2.getTime() - date1.getTime();
    const differenceInDays = difference / (1000 * 3600 * 24);
    const pricePerday = await hotelService.getPricePerDay(hotel, roomType);
    const netPrice = pricePerday * differenceInDays;

    if (Number(amount) !== netPrice) {
      return res.status(400).json({
        error: true,
        message:
          "The provided amount does not match the expected amount for this transaction.",
        success: false,
        data: {},
      });
    }

    const options = {
      amount: Number(amount * 100),
      currency: "INR",
    };
    const order = await instance.orders.create(options);
    res.status(200).json({
      success: true,
      order,
    });
  }

  async paymentVerification(req, res) {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      req.body;
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_APT_SECRET)
      .update(body.toString())
      .digest("hex");
    const isAuthentic = expectedSignature === razorpay_signature;
    if (isAuthentic) {
      // Database comes here
      await Payment.create({
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
      });
    } else {
      return res.status(400).json({
        success: false,
      });
    }

    res.status(200).json({
      success: true,
    });
  }
}

module.exports = new PaymentControllers();
