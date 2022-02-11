const mongoose = require('mongoose');
const crypto = require('crypto');
const { v1: uuidv1 } = require('uuid');
const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,
            required: true,
            maxlength: 32
        },
        email: {
            type: String,
            trim: true,
            required: true,
            unique: true
        },
        mobile_no: {
            type: Number,
            min: 10,
            unique: true,
            default: null
        },
        hashed_password: {
            type: String,
            required: true
        },
        salt: String,
        dateofbirth: {
            type: String,
            default: ""
        },
        Profilepic: {
            type: String,
            default: ""
        },
        address_1: {
            type: String,
            default: ""
        },
        address_2: {
            type: String,
            default: ""
        },
        address_3: {
            type: String,
            default: ""
        },
        pincode: {
            type: Number,
            default: null
        },
        cart: {
            type: Array,
            default: []
        },
        wishlist: {
            type: Array,
            default: []
        },
        history: {
            type: Array,
            default: []
        },
        role: {
            type: Number,
            default: 0
        },
    },
    { timestamps: true }
);


userSchema
    .virtual('password')
    .set(function (password) {
        this._password = password;
        this.salt = uuidv1();
        this.hashed_password = this.encryptPassword(password);
    })
    .get(function () {
        return this._password;
    });

userSchema.methods = {

    authentication: function(plainPassword){
         return this.encryptPassword(plainPassword) === this.hashed_password
    },

    encryptPassword: function (password) {
        if (!password) return '';
        try {
            return crypto
                .createHmac('sha1', this.salt)
                .update(password)
                .digest('hex');
        } catch (err) {
            return '';
        }
    }
};

module.exports = mongoose.model('User', userSchema);