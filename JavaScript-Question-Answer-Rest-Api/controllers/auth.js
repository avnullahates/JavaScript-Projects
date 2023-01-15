const User = require('../models/User')
const CustomError = require("../helpers/error/CustomError");
const asyncErrorWrapper = require("express-async-handler");

const register = asyncErrorWrapper(async (req, res, next) => {
    //POST DATA
   
    
    const {name,email,password,role} = req.body;
    //async, await
    const user = await User.create({
        name,
        email,
        password,
        role
    });
    res.status(200).json({
        seccess: true,
        data: user
    });
});

const errorTest = (req, res, next) => {
    return next(new SyntaxError("Bir hata olystu... Custom Error", 400));
};

module.exports = {
    register,
    errorTest
}