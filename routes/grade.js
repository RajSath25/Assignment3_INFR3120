let express = require("express")
let router = express.Router();
let mongoose = require("mongoose")

let grade = require("../model/grade");
const { error } = require("jquery");

router.get("/",async(req,res,next)=>{
    try{
        const Grade = await grade.find()
        res.render("Grades/grade", {title: "Grade List", GradeList: Grade});
    }
    catch (err)
    {
        console.error(err);
        res.render("grade",{
            error:"Error on Server"})
    }
});

router.get("/add", async(req,res,next)=>{
    try {
        res.render("Grades/add",{
            title: "Add Grade"
        })
    } catch (error) {
        console.error(err)
        res.render("Grades/grade", {
            error: "Error on Server"
        })
    }
})

router.post("/add", async(req,res,next)=>{
    try{
        let newGrade = grade({
            "AssignmentName":req.body.AssignmentName,
            "GradeNumerator":req.body.GradeNumerator,
            "GradeTotal":req.body.GradeTotal,
            "Weight":req.body.Weight
        })
        grade.create(newGrade).then(()=>{
            res.redirect("/grade")
        })
    }
    catch(err){
        console.error(err)
        res.render("Grades/grade",{
            error: "Error on Server"
        })
    }
})

router.get("/edit/:id", async(req,res,next)=>{
    try {
        const id = req.params.id;
        const GradeToEdit = await grade.findById(id);
        res.render("/Grades/edit", {
            title:"Edit Grade",
            grade:GradeToEdit
        })
    } 
    catch (err) {
        console.error(err)
        next(err)
    }
})

router.post("/edit/:id", async(req,res,next)=>{
    try {
        let id = req.params.id
        let updatedGrade = grade({
            "_id":id,
            "AssignmentName":req.body.AssignmentName,
            "GradeNumerator":req.body.GradeNumerator,
            "GradeTotal":req.body.GradeTotal,
            "Weight":req.body.Weight
        })
        grade.findByIdAndUpdate(id,updatedGrade).then(()=>{
            res.redirect("/grade")
        })
    } catch (err) {
        console.error(err)
        res.render("Grades/grade", {
            error: "Error on server"
        })
    }
})

module.exports=router;