const mongoose = require('mongoose')
const bcrypt = require('bcrypt')


const UserSchema = new mongoose.Schema({
    userName: {
        type: String,
        unique: true
    },
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String,
        required: true

    }
})

UserSchema.pre('save', function save(next) {
    const user = this
    if (!user.isModified('password')) {
        return next() 
    }
    bcrypt.genSalt(10, (err, salt) => {
        if (err) { return next(err)}
        bcrypt.hash(user.password, salt, (err,hash)=> {
            if (err) {return next(err)}
            user.password=hash
            next()
            })
        })
    })
    UserSchema.methods.comparePassword = function (candidatePassword) {
        return new Promise((resolve, reject) => {
            bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
                if (err) {
                    return reject(err);
                }
                resolve(isMatch);
            });
        });
    };

module.exports = mongoose.model('User', UserSchema)