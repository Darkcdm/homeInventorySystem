const mongoose = require('mongoose');
const Schema = mongoose.Schema;






const ItemSchema = new Schema({
    name: { type: String, required: true },
    location: { type: Schema.Types.ObjectId, ref: "Location", required: true },
    count: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now, }
});








ItemSchema.virtual("icPath").get(function () {
    return "/itemPics/" + this.id + ".png";
});


ItemSchema.virtual("url").get(function () {
    return "/catalog/item/" + this.id;
});

module.exports = mongoose.model("Item", ItemSchema);