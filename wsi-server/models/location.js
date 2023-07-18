const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const qrcode = require('qrcode');
//const fs = require('fs');

const LocationSchema = new Schema({
    name: { type: String, required: true },
    subLocations: [{ type: Schema.Types.ObjectId, ref: "Location", required: false }],
    domLocations: [{ type: Schema.Types.ObjectId, ref: "Location", required: true }],
    QRString: { type: String }
});

LocationSchema.virtual("url").get(function () {
    return "/catalog/locations/" + this.id;
});

LocationSchema.virtual("QRpath").get(function () {
    return "/QRCodes/" + this.id;
});

async function generateAndSaveQRCode(next) {
    const qrCodePath = '/QRCodes/' + this._id; // Create the QR code path using the object ID

    try {
        // Generate the QR code image and save it
        await qrcode.toFile('public' + qrCodePath + '.png', qrCodePath, { errorCorrectionLevel: 'H' });

        // Save the generated QR code path to the QRString field in the schema
        this.QRString = qrCodePath;
    } catch (error) {
        console.error('Error generating QR code:', error);
    }

    next();
}

async function checkLocationExists(name) {
    try {
        const existingLocation = await Location.findOne({ name });
        return !!existingLocation; // Returns true if a location with the given name already exists
    } catch (error) {
        // Handle any errors that occur during the database query
        console.error('Error checking location:', error);
        throw error;
    }
}

// Register the pre-hook middleware on the schema
LocationSchema.pre('save', generateAndSaveQRCode);
LocationSchema.pre('checkLocationExists', checkLocationExists);
module.exports = mongoose.model("Location", LocationSchema);