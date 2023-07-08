const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ItemSchema = new Schema({
    name: { type: String, required: true },
    location: [{ type: Schema.Types.ObjectId, ref: "location", required: true }],
    createdAt: { type: Date, default: Date.now, }
});

ItemSchema.virtual("url").get(function () {
    return "/catalog/items/" + this.id;
});

module.exports = mongoose.model("Item", ItemSchema);