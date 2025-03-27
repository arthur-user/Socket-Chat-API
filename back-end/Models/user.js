const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
    name: {type: String, required: true, minlength: 3, maxlength: 40},
    email: {type: String, required: true, minlength: 5, maxlength: 40, unique: true},
    password: {type: String, required: true, minlength: 5, maxlength: 1024}
},
{timestamps: true}
)

const User = mongoose.model("User", userSchema);

module.exports = User;
