const mongoose= require("mongoose")

const userSchema = mongoose.Schema({
    userName : {type: String, required: true},
    password: {type: String, required: true},
    selected : {type: String, required: true}
})

const userModel = mongoose.model("userPdc", userSchema)

module.exports = userModel;