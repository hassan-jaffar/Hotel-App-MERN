const mongoose = require("mongoose");

const roomSchema = mongoose.Schema({
    name : {
        type: String,
        required : true
    },
    maxcount : {
        type: Number,
        required : true
    },
    phonenumber : {
        type : Number,
        required : true
    },
    rentperday : {
        type: Number,
        required : true
    },
    imageurls : [],
    bookings: [{
        bookingid: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Booking'
        },
        fromdate: {
            type: String,
            required: true
        },
        todate: {
            type: String,
            required: true
        },
        userid: {
            type: String,
            required: true
        },
        status: {
            type: String,
            required: true
        }
    }],
    type : {
        type: String,
        required : true
    },
    description : {
        type : String,
        required : true
    }

}, {
    timestamps : true,
}
)

const roomModel = mongoose.model('rooms', roomSchema);

module.exports = roomModel