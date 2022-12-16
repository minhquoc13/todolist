const mongoose = require('mongoose')

const connectDB = (url) => {
    mongoose.set({
        'strictQuery': true
    })
        .connect(url)
        .then(() => {
            console.log('Connected to MongoDB')
        })
        .catch((err) => {
            console.log(err)
        })
}

module.exports = connectDB