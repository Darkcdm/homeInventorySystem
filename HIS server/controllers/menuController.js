const Item = require("../models/item");
const Location = require("../models/location");

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
            }
        },
        (err, results) => {
            if (err) {
                return next(err);
            }

            if (results.locations == null) {
                //No locations found
                const err = new Error("No locations found");
                err.status = 404;
                return next(err);
            }
            res.render("main_menu", {
                title: "Main Menu",
                errors: err,
                results: results,
                locationsJSON: JSON.stringify(results.locations),
                itemsJSON: JSON.stringify(results.items)
            });
        }
    );
};