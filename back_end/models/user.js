const mongoose = require('mongoose');
const argon2 = require('argon2');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    email: {
        type: String,
        require: true,
        trim: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
    }
}, {
    timestamps: true
});

// Hash password before saving to database
UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next(); // Only hash if password is new or modified

    try {
        this.password = await argon2.hash(this.password);
        next();
    } catch (err) {
        next(err);
    }
});

const User = mongoose.model("User", UserSchema);
module.exports = User;