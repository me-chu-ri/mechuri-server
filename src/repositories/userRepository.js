const User = require("../models/user");

class UserRepository {
    
    async createUser(userData) {
        return await User.create(userData);
    }

    async findUserByNickName(nickname) {
        return await User.findOne({ where: { nickname } });
    }

    async findUserByEmail(email) {
        return await User.findOne({ where: { email } });
    }

    async findUserByPhone(phone) {
        return await User.findOne({ where: { phone } });
    }
}


module.exports = UserRepository;
