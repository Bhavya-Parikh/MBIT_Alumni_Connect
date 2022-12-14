const mongoose = require('mongoose')
const Schema = mongoose.Schema

const studentSchema = new Schema({
    rollno: {type:String,required:true},
    firstname:{type:String,required:true},
    lastname:{type:String,required:true},
    joining_year:{type:String,required:true},
    graduation_year:{type:String,required:true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    company:{type:String},
    linkedin:{type:String},
    twitter:{type:String},
    instagram:{type:String},
    github:{type:String}
})
module.exports = mongoose.model('Student',studentSchema) 