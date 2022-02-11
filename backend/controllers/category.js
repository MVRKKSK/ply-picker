const Category = require("../models/Category")

exports.create = (req, res) => {
    const category = new Category(req.body);
    category.save((err, data) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        res.json({ data });
    });
};


exports.getCategories = (req,res) => {
    Category.find().exec((err , data) => {
        if(err){
            res.status(404).json(err)
        }
        res.status(200).json(data)
    })
}
