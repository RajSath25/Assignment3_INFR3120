/* Grade.js (in Routes Folder)

Page serves as file to create routes for view files.*/

let express = require("express") // importing express
let router = express.Router(); // importing router
let mongoose = require("mongoose") // importing mongoose library

let grade = require("../model/grade"); //creating model object

/*read function for list of grades */
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

/*GET create function for adding grades */
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

/*POST create function for adding grades */
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

/*GET edit function for editting grades */
router.get("/edit/:id", async(req,res,next)=>{
    try {
        const id = req.params.id;
        const GradeToEdit = await grade.findById(id);
        res.render("Grades/edit", {
            title:"Edit Grade",
            grade:GradeToEdit
        })
    } 
    catch (err) {
        console.error(err)
        next(err)
    }
})

/*POST edit function for editting grades */
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

/*GET delete function for deleting grades */
router.get("/delete/:id", async(req,res,next)=>{
    try {
        let id = req.params.id
        grade.deleteOne({_id:id}).then(()=>{
            res.redirect("/grade")
        })
    } catch (err) 
    {
        console.error(err);
        res.render("/Grades/grade",{
            error:"Error on the server"
        })
    }
})

module.exports=router; // exporting router