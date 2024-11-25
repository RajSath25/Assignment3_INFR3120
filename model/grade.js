/* Grade.js (in Model Folder)

Page serves as file to create a model for the MongoDB database document.*/
let mongoose = require("mongoose");

let gradeModel = mongoose.Schema({
    AssignmentName:String,
    GradeNumerator:Number,
    GradeTotal:Number,
    Weight:Number
},
{
    collection: "average"
}
);
module.exports=mongoose.model("Grade", gradeModel);