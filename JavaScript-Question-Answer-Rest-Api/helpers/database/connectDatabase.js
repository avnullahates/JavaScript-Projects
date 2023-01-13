const mongoose = require("mongoose");

const connectDatabase = () => {

    mongoose.connect(process.env.MONGO_URI, {

        useNewUrlParser: true,
        useUnifiedTopology: true

    })
        .then(() => {
            console.log("Mongo connettion success");
        })
        .catch(err => {
            console.log(err);
        })
};


module.exports = connectDatabase;