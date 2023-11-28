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
    body("parentLocation", "Parent Location is not set").escape(),

    (req, res, next) => {
        const errors = validationResult(req);

        console.log(req.body);
        const item = new Item({ name: req.body.name, count: req.body.count, location: req.body.parentLocation });


        if (!errors.isEmpty()) {
            alert(errors);
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
