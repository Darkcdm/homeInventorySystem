const Item = require("../models/item");
const Location = require("../models/location");

const { body, validationResult } = require("express-validator");

const async = require("async");

exports.index = (req, res, next) => {

    async.parallel(
        {
            location_count(callback) {
                Location.countDocuments().exec(callback);
            },
            item_count(callback) {
                Item.countDocuments().exec(callback);
            },
            locations(callback) {
                Location.find()
                    .populate("subLocations")
                    .exec(callback);
            },
            items(callback) {
                Item.find().exec(callback);
            },
            formErrors(callback) {

                const errors = req.session.formErrors || {};

                req.session.formErrors = null;

                callback(null, errors);
            }
        },
        (err, results) => {
            if (err) {
                return next(err);
            }
            console.log("TEST", results.formErrors.errors);

            if (results.locations == null) {
                //No locations found
                const err = new Error("No locations found");
                err.status = 404;
                return next(err);
            }
            res.render("main_menu", {
                title: "Main Menu",
                errors: err,
                formErrors: results.formErrors.errors,
                results: results,
                locationsJSON: JSON.stringify(results.locations),
                itemsJSON: JSON.stringify(results.items)
            });
        }
    );
};