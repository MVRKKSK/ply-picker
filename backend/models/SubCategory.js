const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema
const SubCategorySchema = new mongoose.Schema(
    {
        Sub_Category_name: {
            type: String,
            trim: true,
            required: true,
            maxlength: 32
        },
        Sub_Category_image: {
            type: "string",
            required: true,
        },
        Category:{
            type: ObjectId,
            ref: "Category"
        }
    },
    { timestamps: true }
);


module.exports = mongoose.model('SubCategory', SubCategorySchema);