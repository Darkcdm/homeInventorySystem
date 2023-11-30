const Location = require("../models/location");

const { body, validationResult } = require("express-validator");

const async = require("async");

exports.location_detail = (req, res, next) => {
    res.send("test");
    //res.render("location_detail", { location: {} });
};

exports.create_location_get = (req, res, next) => {
    res.render("location_form", {});
};


exports.create_location_post = [
    //sanitize and validate the name field
    body("name", "Location name required").trim().isLength({ min: 1 }).escape(),

    //Process request after validation and sanitizaion
    (req, res, next) => {
        const errors = validationResult(req);
        const location = new Location({ name: req.body.name });

        if (!errors.isEmpty()) {
            //There are errors. Render the form again with asnitized values/error mesages.
            req.session.formErrors = errors;

            // Redirect to the main menu controller
            res.redirect('/');
            return;
        } else {
            //Data from form is valid.
            //check if Genre with same name alread exists.
            Location.findOne({ name: req.body.name }).exec((err, found_location) => {
                if (err) {
                    //There are errors. Render the form again with asnitized values/error mesages.
                    req.session.formErrors = err;

                    // Redirect to the main menu controller
                    res.redirect('/');
                    return;
                }

                if (found_location) {
                    //Genre exists, redirect to its detail page
                    res.redirect(found_location.url);
                } else {
                    //create a genre object with escaped and trimmed data

                    location.save((err) => {
                        if (err) {
                            return next(err);
                        }
                        //Genre saved. redirect to genre detail page
                        res.redirect("/");
                    });
                }
            });
        }
    },
];

exports.add_location_post = [
    //sanitize and validate the name field
    body("name", "Location name required").trim().isLength({ min: 1 }).escape(),
    body("location", "Location not assigned").trim().escape(),

    //Process request after validation and sanitizaion
    (req, res, next) => {
        const errors = validationResult(req);
        const location = new Location({ name: req.body.name, parentLocation: req.body.location });

        if (!errors.isEmpty()) {
            //There are errors. Render the form again with asnitized values/error mesages.
            req.session.formErrors = errors;

            // Redirect to the main menu controller
            res.redirect('/');
            return;
        } else {
            //Data from form is valid.
            //check if Genre with same name alread exists.
            Location.findOne({ name: req.body.name }).exec((err, found_location) => {
                if (err) {
                    //There are errors. Render the form again with asnitized values/error mesages.
                    req.session.formErrors = err;

                    // Redirect to the main menu controller
                    res.redirect('/');
                }

                if (found_location) {
                    //Genre exists, redirect to its detail page
                    res.redirect(found_location.url);
                } else {
                    //create a genre object with escaped and trimmed data

                    location.save((err) => {
                        if (err) {
                            return next(err);
                        }
                        //Genre saved. redirect to genre detail page
                        res.redirect("/");
                    });
                }
            });
        }
    },
];