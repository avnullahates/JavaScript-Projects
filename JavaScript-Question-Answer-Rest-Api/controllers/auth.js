const User = require('../models/User')
const CustomError = require("../helpers/error/CustomError");
const asyncErrorWrapper = require("express-async-handler");
const { sendJwtToClient } = require("../helpers/authorization/tokenHelpers");
const { response } = require('express');
const { validateUserInput, comparePassword } = require("../helpers/input/inputHelpers");
const sentEmail = require("../helpers/libraries/sentEmail");


const register = asyncErrorWrapper(async (req, res, next) => {
    //POST DATA


    const { name, email, password, role } = req.body;
    //async, await
    const user = await User.create({
        name,
        email,
        password,
        role
    });

    sendJwtToClient(user, res);
});
const login = asyncErrorWrapper(async (req, res, next) => {
    const { email, password } = req.body;
    if (!validateUserInput(email, password)) {
        return next(new CustomError("Please Check your inputs", 400))
    }


    const user = await User.findOne({ email }).select("+password");

    if (!comparePassword(password, user.password)) {
        return next(new CustomError("Pleace check your credentials", 400))
    }


    sendJwtToClient(user, res);

});
const logout = asyncErrorWrapper(async (req, res, next) => {

    const { NODE_ENV } = process.env;

    return res.status(200)
        .cookie({
            httpOnly: true,
            expires: new Date(Date.now()),
            secure: NODE_ENV === "development" ? false : true
        }).json({
            success: true,
            message: "Logut success"
        })

});
const getUser = (req, res, next) => {

    res.json({
        success: true,
        data: {
            id: req.user.id,
            name: req.user.name
        }
    });

}

const imageUpload = asyncErrorWrapper(async (req, res, next) => {

    const user = await User.findByIdAndUpdate(req.user.id, {
        "profile_image": req.savedProfileImage
    }, {
        new: true,
        runValidators: true
    });

    res.status(200).json({
        success: true,
        message: "image upload successfull",
        data: user
    });
});

//Forgot Password
const forgotPassword = asyncErrorWrapper(async (req, res, next) => {
    const resetEmail = req.body.email;
    const user = await User.findOne({ email: resetEmail });

    if (!user) {
        return next(new CustomError("There is  no user with that email", 400));
    }
    const resetPasswordToken = user.getResetPasswordTokenFromUser();
    await user.save();

    const resetPasswordUrl = `http//localhost:5000/api/auth/resetpassword?resetPasswordToken=${resetPasswordToken}`;

    const emailTemplate = `
    <h3>Reset Your Password</h3>
    <p> This <a href = '${resetPasswordUrl}' target = '_blank'>link</a> will expire in 1 hour </p>
    
    `;

    const nodemailer = require("nodemailer");
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: "anvullahates@gmail.com",
            pass: "ewfenkqzarevltcm"
        }
    });



    let mailOptions = {
        from: process.env.SMTP_USER,
        to: resetEmail,
        subject: "Reset Your Password",
        html: emailTemplate
    }

    transporter.sendMail(mailOptions, (err, data) => {
        if (err) {
            console.log(err);
        } else {
            res.json({
                success: true,
                message: "Token is sent"
            });
        }
    });

});


const resetPassword = asyncErrorWrapper(async (req, res, next) => {

    const { resetPasswordToken } = req.query;
    const { password } = req.body;

    if (!resetPasswordToken) {
        return next(new CustomError("Please provide a valid tokan!!!"))
    }
    let user = await User.findOne({
        resetPasswordToken: resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() }
    });
    if (!user) {
        return next(new CustomError("Invalid Token or Session Expired", 404));
    }

    user.password = password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();


    return res.status(200)
        .json({
            success: true,
            message: "Reset Password Succesful"
        })
});
module.exports = {
    register,
    getUser,
    login,
    logout,
    imageUpload,
    forgotPassword,
    resetPassword

}