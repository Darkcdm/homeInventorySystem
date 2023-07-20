const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const qrcode = require('qrcode');
//const fs = require('fs');








const LocationSchema = new Schema({
    name: { type: String, required: true },
    domLocations: {
        type: Schema.Types.ObjectId,
        ref: "Location",
        required: false,
        default: function () {
            // Return a default value based on your condition here
            // In this example, we'll use null as the default value, but you can set it to any specific ObjectId or custom value as needed.
            return null;
        },
        validate: {
            validator: function (value) {
                // The validation function to check if the value meets your requirements
                // In this example, we're allowing null (for top-level locations) or a valid ObjectId reference (for child locations)
                return value === null || mongoose.isValidObjectId(value);
            },
            message: props => `Invalid domLocation: ${props.value}. A valid ObjectId reference or null is required.`
        }
    },
    QRString: { type: String }
});

















LocationSchema.virtual("url").get(function () {
    return "/catalog/location/" + this.id;
});

LocationSchema.virtual("QRpath").get(function () {
    return "/QRCodes/" + this.id + ".png";
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



// Register the pre-hook middleware on the schema
LocationSchema.pre('save', generateAndSaveQRCode);
module.exports = mongoose.model("Location", LocationSchema);