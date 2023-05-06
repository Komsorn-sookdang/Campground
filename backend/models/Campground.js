const mongoose = require("mongoose");

const CampgroundSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add a name"],
      unique: true,
      trim: true,
      maxlength: [50, "Name can not be more than 50 characters"],
    },
    address: {
      type: String,
      required: [true, "Please add a address"],
    },
    tel: {
      type: String,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);
// Cascade delete bookings when a Campground is deleted
CampgroundSchema.pre("remove", async function (next) {
  console.log(`Bookings being removed from Campground ${this._id}`);
  await this.model("Booking").deleteMany({ Campground: this._id });
  next();
});
// Reverse populate with virtuals
CampgroundSchema.virtual("bookings", {
  ref: "Booking",
  localField: "_id",
  foreignField: "campground",
  justOne: false,
});

module.exports = mongoose.model("Campground", CampgroundSchema);
