const userModel = require("../models/user-model");

class UserService {
  async getUserByUnEm(username, email) {
    const userByuserName = await userModel.findOne({ username });
    const userByEmail = await userModel.findOne({ email });
    return { userByuserName, userByEmail };
  }
  async getUserByEmail(email){
    // console.log(email);
    return await userModel.findOne({email: email});
  }
  async createUser(user) {
    const { username, email, hashedPassword, role } = user;
    return await userModel.create({username, email, password: hashedPassword, role});
  }
}
module.exports = new UserService();
