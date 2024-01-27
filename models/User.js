const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

// Schema to create User model
const userSchema = new Schema(
    {
        id: {
            type: Number,
            required: true,
            unique: true,
        },
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            maxlength: 50,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            maxlength: 50,
            match: [
                /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                "Please enter a valid email address"
            ],
        },
        password: {
            type: String,
            required: true,
            minLength: 8,
        },
    },
    {
        // dont know if I need this, test!!!
        toJSON: {
            virtuals: true,
        },
        id: false,
    },
    {
        hooks: {
            beforeCreate: async (newUserData) => {
                newUserData.password = await bcrypt.hash(newUserData.password, 10);
                return newUserData;
            },
            beforeUpdate: async (updatedUserData) => {
                updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
                return updatedUserData;
            },
        },
    },
);

const User = model('User', userSchema);

module.exports = User;
