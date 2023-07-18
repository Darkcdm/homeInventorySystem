const BookInstance = require("../models/bookinstance");
const Book = require("../models/book");

const { body, validationResult } = require("express-validation");

const async = require("async");

//Display list of all BookInstances.
exports.bookinstance_list = (req, res, next) => {
	BookInstance.find()
		.populate("book")
		.exec(function (err, list_bookinstances) {
			if (err) {
				return next(err);
			}
			// Successful, so render
			res.render("bookinstance_list", {
				title: "Book Instance List",
				bookinstance_list: list_bookinstances,
			});
		});
};

//Display detail page for a specific BookInstance.
exports.bookinstance_detail = (req, res, next) => {
	async.parallel(
		{
			book_instance(callback) {
				BookInstance.findById(req.params.id).populate("book").exec(callback);
			},
		},
		(err, results) => {
			if (err) {
				return next(err);
			}
			if (results.book_instance == null) {
				//No results found
				const err = new Error("Book Instance not found");
				err.status = 404;
				return next(err);
			}
			console.log(results);
			//successful, so redender
			res.render("bookinstance_detail", {
				title: results.book_instance.id,
				book_instance: results.book_instance,
			});
		}
	);
};

//Display BookInstance create form on GET.
exports.bookinstance_create_get = (req, res) => {
	res.send("NOT IMPLEMENTED: BookInstance create GET");
};

//Handle BookInstance create on POST.
exports.bookinstance_create_post = (req, res) => {
	res.send("NOT IMPLEMENTED: BookInstance create POST");
};

//Display BookInstance delete form on GET.
exports.bookinstance_delete_get = (req, res) => {
	res.send("NOT IMPLEMENTED: BookInstance delete GET");
};

//Handle BookInstance delete on POST.
exports.bookinstance_delete_post = (req, res) => {
	res.send("NOT IMPLEMENTED: BookInstance delete POST");
};

//Display BookInstance update form on GET.
exports.bookinstance_update_get = (req, res) => {
	res.send("NOT IMPLEMENTED: BookInstance update GET");
};

// Handle bookinstance update on POST.
exports.bookinstance_update_post = (req, res) => {
	res.send("NOT IMPLEMENTED: BookInstance update POST");
};
