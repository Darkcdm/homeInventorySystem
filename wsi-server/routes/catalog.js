const express = require("express");
const router = express.Router();

//Require controllers modules

const itemController = require("../controllers/itemController");
const locationController = require("../controllers/locationController");

/// ITEM ROUTES ///

// GET catalog home page.
router.get("/", itemController.index);



//GET request for creating an item. NOTE this must come before routes that display items (uses id).
router.get("/item/create/:locationid", itemController.item_create_get);

//POST request for creating item.
router.post("/item/create/:locationid", itemController.item_create_post);

//GET request to delete item.
router.get("/item/:id/delete", itemController.item_delete_get);

// POST request to delete item
router.post("/item/:id/delete", itemController.item_delete_post);

// GET request to update item.
router.get("/item/:id/update/:locationid", itemController.item_update_get);

// POST request to update item.
router.post("/item/:id/update", itemController.item_update_post);

// GET request for one item.
router.get("/item/:id", itemController.item_detail);

// GET request for list of all items.
router.get("/items", itemController.item_list);



/// LOCATION ROUTES ///

//GET request for creating an location. NOTE this must come before routes that display locations (uses id).
router.get("/location/create", locationController.location_create_get);

//POST request for creating location.
router.post("/location/create", locationController.location_create_post);

router.get("/location/:id/create/", locationController.subLocation_create_get);

//POST request for creating location.
router.post("/location/:id/create", locationController.subLocation_create_post);

//GET request to delete location.
router.get("/location/:id/delete", locationController.location_delete_get);

// POST request to delete location
router.post("/location/:id/delete", locationController.location_delete_post);

// GET request to update location.
router.get("/location/:id/update", locationController.location_update_get);

// POST request to update location.
router.post("/location/:id/update", locationController.location_update_post);

// GET request for one location.
router.get("/location/:id", locationController.location_detail);

// GET request for list of all location.
router.get("/locations", locationController.location_list);


module.exports = router;
