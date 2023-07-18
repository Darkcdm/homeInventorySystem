const Item = require("../models/item");
const Location = require("../models/location");

const async = require("async");

exports.index = (req, res) => {
    async.parallel(
        {
            item_count(callback) {
                Item.countDocuments({}, callback);
            },
            location_count(callback) {
                Location.countDocuments({}, callback);
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
exports.item_create_get = (req, res) => {
    res.send("NOT IMPLEMENTED: item create GET");
};

// Handle item create on POST.
exports.item_create_post = (req, res) => {
    res.send("NOT IMPLEMENTED: item create POST");
};

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
exports.item_detail = (req, res) => {
    res.send("NOT IMPLEMENTED: item detail GET");
};

// Handle item list on GET.
exports.item_list = (req, res) => {
    res.send("NOT IMPLEMENTED: item list GET");
};