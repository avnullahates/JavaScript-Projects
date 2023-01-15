const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const Schema = mongoose.Schema;



const UserSchema = new Schema({
    name: {
        type: String,
        require: [true, "Please provide a name"]
    },
    email: {
        type: String,
        require: [true, "Please provide email"],
        uniqe: [true, "Please try different email"],
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            "Please provide a vaild email"
        ]
    },
    role: {
        type: String,
        default: "user",
        enum: ["user", "admin"]
    },
    password: {
        type: String,
        minLength: [6, "Please provide a password with min lenght 6"],
        require: [true, "Please provide a password"],
        select: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    title: {
        type: String
    },
    about: {
        type: String
    },

    place: {
        type: String
    },
    website: {
        type: String
    },
    profile_image: {
        type: String,
        default: "default.jpg"
    },
    blocked: {
        type: Boolean,
        default: false
    }
});


UserSchema.pre("save", function (next) {

//parola degisme
    if (!this.isModified("password")) {
        next();
    }

    bcrypt.genSalt(10, (err, salt) => {
        if (err) next(err);
        bcrypt.hash(this.password, salt, (err, hash) => {
            if (err) next(err);
            this.password = hash;
            next();
        });
    });
});


module.exports = mongoose.model("User", UserSchema); 