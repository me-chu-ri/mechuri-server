const UserRepository = require('../repositories/userRepository');
const userRepository = new UserRepository();
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const sendEmail = require('../utils/sendEmail');
const redisClient = require('../utils/redis');
const bcrypt = require('bcrypt');

dotenv.config();

class AuthService {

    async login(userData) {
        try {
            const {email,password} = userData;
            const exUser = await userRepository.findUserByEmail(email);
            const isPasswordValid = await bcrypt.compare(password, exUser.password);
            if(isPasswordValid){
                const payload = { email: exUser.email, nickname: exUser.nickname };
                const token = jwt.sign(
                    payload,
                    process.env.JWT_SECRET_ACCESS_KEY,
                    {
                        algorithm:process.env.JWT_ALGORITHM,
                        expiresIn:process.env.JWT_ACCESS_EXPIRE
                    }
                );
                return ({
                    ok: 1,
                    message: "Authorize successed",
                    user: exUser,
                    token: token,
                  });
            }
            else {
                return ({
                    ok: 0,
                    message: "Authorize failed",
                  });
            }
        } catch(error){
            throw error;
        }
    }

    async join(userData) {
        const { email, nickname, password } = userData;
        
        // 이미 존재하는 사용자인지 확인
        try {
        const exUser = await userRepository.findUserByEmail(email);
        
        if (exUser) {  
            return ({
                ok: 0,
                message: "This email is already in use",
            });
        }
        const hashedPassword = await bcrypt.hash(password, 12);

        // 사용자 생성
        await userRepository.createUser({
            email,
            nickname,
            password: hashedPassword,
        }); 
        return ({
            ok: 1,
            message: "Register success",
        });
        } catch (error) {
            throw error;
        }
    
        }
    async postCode(userEmail) {
        const {email} = userEmail;
        try{
                const code = crypto.randomBytes(3).toString('hex');
                const emailContent =
                    `<html><h1>인증코드는 ${code} 입니다<h1><html>`
                
                await sendEmail({
                    to: email,
                    subject: 'Mechuri 서비스 인증코드',
                    html: emailContent,
                });

                await redisClient.setEx(email,180,code);

                return ({
                    ok: 1,
                    message: "Post code success",
                })
        }catch(error){
            throw error;
        }
    }
    async verifyCode(userData) {
        const {email, code} = userData;
        
        try{
            const verifyCode = await redisClient.get(email);
            if (code == verifyCode){
                return({
                    ok:1,
                    message: "verify success",
                })
             }
             else{
                return({
                    ok:0,
                    message: "verify failed"
                })
             }
            }
        catch(error){
            throw error;
        }
    }

}
module.exports = AuthService;