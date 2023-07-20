const Item = require("../models/item");
const Location = require("../models/location");

const { body, validationResult } = require("express-validator");

const async = require("async");

exports.index = (req, res) => {
    async.parallel(
        {
            item_count(callback) {
                Item.countDocuments({}, callback);
            },
            location_count(callback) {
                Location.countDocuments({}, callback);
            },
            location_list(callback) {
                Location.find().exec({}, callback);
            },
            item_list(callback) {
                Item.find().exec({}, callback);
            }
        },
        (err, results) => {
            res.render("index", {
                title: "WSI Home Page",
                error: err,
                data: results
            })
        }

    )
}

// Display item create form on GET.
exports.item_create_get = (req, res, next) => {
    async.parallel(
        {
            selectedLocation(callback) {
                Location.findById(req.params.locationid).exec(callback);
            },
            locations(callback) {
                Location.find().exec({}, callback);
            }
        },
        (err, results) => {
            res.render(
                "item_form",
                {
                    title: "adding an item to a location",
                    error: err,
                    data: results
                }
            )
        }
    )
}

// Handle item create on POST.
exports.item_create_post = [
    //sanitize and validate the name field
    body("name", "Item name required").trim().isLength({ min: 1 }).escape(),
    body("locationSelect", "Item locationSelection is required").isJSON(),
    body("count", "Item count required").isInt(),

    //Process request after validation and sanitizaion
    (req, res, next) => {
        const errors = validationResult(req);
        console.log(req.body);

        const selectedLocation = JSON.parse(req.body.locationSelect);

        console.log(req.body.locationSelect._id);
        console.log(selectedLocation);


        //create a item object with escaped and trimmed data
        const item = new Item({ name: req.body.name, location: selectedLocation, count: req.body.count });

        if (!errors.isEmpty()) {
            //There are errors. Render the form again with asnitized values/error mesages.
            res.render("item_form", {
                title: "Create Item Again",
                item,
                errors: errors.array(),
            });
            return;
        } else {
            //Data from form is valid.
            //check if item with same name alread exists.
            item.save((err) => {
                if (err) {
                    return next(err);
                }
                //Genre saved. redirect to genre detail page
                res.redirect(item.url);
            });
        }
    }
]
// Display item delete form on GET.
exports.item_delete_get = (req, res) => {
    res.send("NOT IMPLEMENTED: item delete GET");
};

// Handle item delete on POST.
exports.item_delete_post = (req, res) => {
    res.send("NOT IMPLEMENTED: item delete POST");
};

// Display item update form on GET.
exports.item_update_get = (req, res) => {
    res.send("NOT IMPLEMENTED: item update GET");
};

// Display item update form on POST.
exports.item_update_post = (req, res) => {
    res.send("NOT IMPLEMENTED: item update POST");
};

// Handle item detail on GET.
exports.item_detail = (req, res, next) => {
    async.waterfall(
        [
            function getItem(callback) {
                Item.findById(req.params.id)
                    .exec((err, item) => {
                        if (err || !item) {
                            return callback(err || new Error("Item not found"), null);
                        }

                        // Assuming "item.location" contains the ObjectId reference to the location
                        callback(null, { item, locationId: item.location });
                    });
            },
            function getLocation({ item, locationId }, callback) {
                Location.findById(locationId)
                    .exec((err, location) => {
                        if (err || !location) {
                            return callback(err || new Error("Location not found"), null);
                        }

                        callback(null, { item, location });
                    });
            },
        ],
        (err, results) => {
            console.log(err);
            console.log(results);
            if (err) {
                return next(err);
            }
            if (results.item == null) {
                const err = new Error("Item not found");
                err.status = 404;
                return next(err);
            }
            if (results.location == null) {
                const err = new Error("location not found");
                err.status = 404;
                return next(err);
            }
            res.render("item_detail", {
                title: "Item Detail",
                item: results.item,
                location: results.location
            });
        }
    )
};

// Handle item list on GET.
exports.item_list = (req, res) => {
    res.send("NOT IMPLEMENTED: item list GET");
};