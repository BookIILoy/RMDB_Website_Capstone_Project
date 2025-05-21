const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const UserScrema = new Schema({
    firstname: String,
    lastname: String,
    username: String,
    email: String,
    password: String
})

const User = mongoose.model('user_accounts', UserScrema);
module.exports = User;