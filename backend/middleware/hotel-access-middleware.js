const userModel = require("../models/user-model");

async function hotelAccessMiddleware(req, res, next) {
    try {
      if (req.user.role !== "hotel" || !req.user) {
        throw new Error();
      }
      const user = await userModel.findById(req.user._id);
      if(!user || !user.hotelId) throw new Error();
      req.user.hotelId  = user.hotelId;
      next();
    } catch (error) {
      res.status(401).json({
        error: true,
        message: "Unauthorized user",
        success: false,
        data: {},
      });
    }
  }
  module.exports = hotelAccessMiddleware;
  