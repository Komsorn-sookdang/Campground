const mongoose = require('mongoose');

const CampgroundSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true,'Please add a name'],
        unique: true,
        trim: true,
        maxlength: [50,'Name can not be more than 50 characters']
    },
    address: {
        type: String,
        required: [true,'Please add a address']
    },
    tel: {
        type: String,
    },
}, {
    toJSON: {virtuals: true},
    toObject: {virtuals: true}
});
// Cascade delete appointments when a Campground is deleted
CampgroundSchema.pre('remove', async function(next) {
    console.log(`Appointments being removed from Campground ${this._id}`);
    await this.model('Appointment').deleteMany({Campground: this._id});
    next();
});
// Reverse populate with virtuals
CampgroundSchema.virtual('appointments', {
    ref: 'Appointment',
    localField: '_id',
    foreignField: 'Campground',
    justOne: false
});

module.exports = mongoose.model('Campground', CampgroundSchema);