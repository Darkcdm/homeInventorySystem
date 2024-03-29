const Item = require("../models/item");

const { body, validationResult } = require("express-validator");

const async = require("async");

exports.item_detail = (req, res, next) => {
    res.render("item_detail", { item: {} });
};

exports.create_item_get = (req, res, next) => {
    res.render("item_form", {});
};

exports.create_item_post = [
    body("name", "Item name is required").trim().isLength({ min: 1 }).escape(),
    body('count', "Item count is required").escape(),
    body("location", "Parent Location is not set").escape(),

    (req, res, next) => {
        const errors = validationResult(req);

        console.log(req.body);
        const item = new Item({ name: req.body.name, count: req.body.count, location: req.body.location });


        if (!errors.isEmpty()) {
            //There are errors. Render the form again with asnitized values/error mesages.
            req.session.formErrors = errors;

            // Redirect to the main menu controller
            res.redirect('/');
            return;
        } else {

            item.save((err) => {
                if (err) {
                    return next(err);
                }
                //Genre saved. redirect to genre detail page
                res.redirect("/");
            });
        }


    }
];
