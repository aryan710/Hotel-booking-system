const hotelControllers = require("./controllers/hotelControllers");
const authControllers = require("./controllers/authControllers");
const router = require('express').Router();

// hotel routes
router.get('/api/get-hotels', hotelControllers.getHotels)
router.get('/api/get-hotel/:id', hotelControllers.getHotel)

// user routes
router.post('/api/user-register', authControllers.register);
router.post('/api/user-login', authControllers.login);
router.post('/api/user-logout', authControllers.logout);


// router.get('/api/get-user')
// router.post('/api/feedback/:hotelId/:roomId')
// router.post('/api/booking/:hotelId/:roomId')


// // hotel routes
// router.post('/api/register-hotel')
// router.post('/api/login-hotel')
// router.post('/api/add-room')
// router.delete('/api/remove-room/:roomId')
// router.put('/api/update-room')
// router.put('/api/update-room')

module.exports = router