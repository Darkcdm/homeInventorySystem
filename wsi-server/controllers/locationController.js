const Item = require("../models/item");
const Location = require("../models/location");

const { body, validationResult } = require("express-validator");

const async = require("async");

// Display location create form on GET.
exports.location_create_get = (req, res) => {
    res.render("location_form", { title: "Create Root Location" });
};

// Handle location create on POST.
exports.location_create_post = [
    //sanitize and validate the name field
    body("name", "Location name required").trim().isLength({ min: 1 }).escape(),

    //Process request after validation and sanitizaion
    (req, res, next) => {
        const errors = validationResult(req);

        let locationId = null;

        if (req.body.domLocations !== undefined) {
            locationId = req.body.domLocations;
        }

        //create a location object with escaped and trimmed data
        const location = new Location({ name: req.body.name, domLocations: null });

        if (!errors.isEmpty()) {
            //There are errors. Render the form again with asnitized values/error mesages.
            res.render("location_form", {
                title: "Create location",
                location,
                errors: errors.array(),
            });
            return;
        } else {
            //Data from form is valid.
            //check if location with same name alread exists.
            Location.findOne({ name: req.body.name }).exec((err, found_location) => {
                if (err) {
                    return next(err);
                }

                if (found_location) {
                    //Genre exists, redirect to its detail page
                    res.redirect(found_location.url);
                } else {
                    location.save((err) => {
                        if (err) {
                            return next(err);
                        }
                        //Genre saved. redirect to genre detail page
                        res.redirect(location.url);
                    });
                }
            });
        }
    },
];

exports.subLocation_create_get = (req, res) => {
    res.render("sub_location_form", { title: "Create Sub Location" });
};

exports.subLocation_create_post = [
    //sanitize and validate the name field
    body("name", "Location name required").trim().isLength({ min: 1 }).escape(),

    //Process request after validation and sanitizaion
    (req, res, next) => {
        const errors = validationResult(req);

        let locationId = null;

        if (req.body.domLocations !== undefined) {
            locationId = req.body.domLocations;
        }

        //create a location object with escaped and trimmed data
        const location = new Location({ name: req.body.name, domLocations: null });

        if (!errors.isEmpty()) {
            //There are errors. Render the form again with asnitized values/error mesages.
            res.render("location_form", {
                title: "Create location",
                location,
                errors: errors.array(),
            });
            return;
        } else {
            //Data from form is valid.
            //check if location with same name alread exists.
            Location.findOne({ name: req.body.name }).exec((err, found_location) => {
                if (err) {
                    return next(err);
                }

                if (found_location) {
                    //Genre exists, redirect to its detail page
                    res.redirect(found_location.url);
                } else {
                    location.save((err) => {
                        if (err) {
                            return next(err);
                        }
                        //Genre saved. redirect to genre detail page
                        res.redirect(location.url);
                    });
                }
            });
        }
    },
];

// Display location delete form on GET.
exports.location_delete_get = (req, res) => {
    async.parallel(
        {
            assignedItems(callback) {
                Location.deleteOne({ id: req.params.id }).exec(callback);
            }
        },
        (err, results) => {
            if (!err) {
                res.redirect("/catalog/");
            } else {
                res.send(err);
            }
        }
    )
};

// Handle location delete on POST.
exports.location_delete_post = (req, res) => {
    res.send("NOT IMPLEMENTED: location delete POST");
};

// Display location update form on GET.
exports.location_update_get = (req, res) => {
    res.send("NOT IMPLEMENTED: location update GET");
};

// Display location update form on POST.
exports.location_update_post = (req, res) => {
    res.send("NOT IMPLEMENTED: location update POST");
};

// Handle location detail on GET.
exports.location_detail = (req, res, next) => {
    async.parallel(
        {
            location(callback) {
                Location.findById(req.params.id).exec(callback);
            },
            locationItems(callback) {
                Item.find({ location: req.params.id }).exec(callback);
            }
        },
        (err, results) => {
            if (err) {
                return next(err);
            }
            if (results.location == null) {
                const err = new Error("Location not found");
                err.status = 404;
                return next(err);
            }
            res.render("location_detail", {
                title: "Location Detail",
                location: results.location,
                locationItems: results.locationItems,
            });
        }
    )
};

// Handle location list on GET.
exports.location_list = (req, res) => {
    res.send("NOT IMPLEMENTED: location list GET");
};