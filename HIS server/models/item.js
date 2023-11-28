const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ItemSchema = new Schema({
    name: { type: 'string', required: true },
    location: { type: Schema.Types.ObjectId, ref: "location", required: true },
    count: { type: 'number', required: true }
});

ItemSchema.virtual("url").get(function () {
    return "/item/" + this.id;
});

module.exports = mongoose.model("Item", ItemSchema);