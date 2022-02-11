const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema
const SubCategorySchema = new mongoose.Schema(
    {
        Group_name:{
            type:String,
            required:true
        },
        Sub_Category:{
            type: ObjectId,
            ref: "SubCategory"
        },
        Category:{
            type: ObjectId,
            ref: "Category"
        }
    },
    { timestamps: true }
);


module.exports = mongoose.model('Group', GroupSchema);