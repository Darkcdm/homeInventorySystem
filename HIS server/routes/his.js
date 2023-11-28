const express = require('express');
const router = express.Router();

//controllers
const item_controller = require("../controllers/itemController");
const location_controller = require("../controllers/locationController");
const menu_controller = require("../controllers/menuController");

// MENU ROUTES //
//GET HIS home page

router.get("/", menu_controller.index);

// ITEM ROUTES //

//GET detail
router.get('/item/:id', item_controller.item_detail);
//POST detail

//GET create
//router.get('/item/create/:id', item_controller.create_item_get);
//POST create
router.post('/item/create', item_controller.create_item_post);
//GET delete

//POST delete

//GET update

//POST update



// LOCATION ROUTES //


//GET create
router.get("/location/create", location_controller.create_location_get);

//POST create
router.post("/location/create", location_controller.create_location_post);
//GET delete

//POST delete

//GET update

//POST update

//GET detail
router.get('/location/:id', location_controller.location_detail);
//POST detail









module.exports = router;