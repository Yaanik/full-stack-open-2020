const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')


const userSchema = new mongoose.Schema({
    username: {
        type: String,
        minlength: 3,
        required: true,
        unique: true,
        uniqueCaseInsensitive: true
    },
    name: String,
    passwordHash: {
        type: String,
        required: true,
    },
    blogs: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Blog'
    }],
});

userSchema.plugin(uniqueValidator);

userSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
        delete returnedObject.passwordHash
    }
})

const User = mongoose.model('User', userSchema);

module.exports = User;