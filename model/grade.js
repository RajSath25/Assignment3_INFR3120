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