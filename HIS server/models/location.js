const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const LocationSchema = new Schema({
    name: { type: 'string', required: true },
    subLocations: [{ type: Schema.Types.ObjectId, ref: "Location" }],
    parentLocation: { type: Schema.Types.ObjectId, ref: "Location" },
    items: [{ name: "string", count: "number" }],
});

LocationSchema.virtual("url").get(function () {
    return "/location/" + this.id;
});

module.exports = mongoose.model("Location", LocationSchema);