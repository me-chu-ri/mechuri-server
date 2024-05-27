const AuthService = require("../services/authService");
const authService = new AuthService();

const login = async (req, res, next) => {
    
    const userData = req.body;
    
    try {
        const loginData = await authService.login(userData);
        
        if (loginData.ok) {
            res.cookie('token', loginData.token, { httpOnly: true });
            return res.status(200).json({
                message: loginData.message,
            })
        }
        else{
            return res.status(401).json({
                message: loginData.message,
            })
        }
    } catch(error) {
        console.error("Login controller error:", error);
    }}

const join = async (req, res, next) => {
    const userData = req.body;
    try {
        const joinData = await authService.join(userData);
        if (joinData.ok) {
            return res.status(200).json({
                message: joinData.message,
            })
        }
        else {
            return res.status(401).json({
                message: joinData.message,
            })
        }
    }catch(error){
        console.error("Join controller error:",error);
    }
}

const postCode = async (req, res, next) => {
    const userEmail = req.body;
    try {
            const codeData = await authService.postCode(userEmail);
            if(codeData.ok) {
                return res.status(200).json({
                    message: codeData.message,
                })
            }
    }
    catch(error){
        console.error("Post code controller error:",error);
    }
}

const verifyCode = async (req, res, next) => {
    const userData = req.body;
    try {
            const codeData = await authService.verifyCode(userData);
            if(codeData.ok) {
                return res.status(200).json({
                    message: codeData.message,
                })
            }
    }
    catch(error){
        console.error("Verify code controller error:",error);
    }
}

    module.exports = {login, join, postCode, verifyCode}