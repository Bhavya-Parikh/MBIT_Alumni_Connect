const mongoose = require('mongoose')
const Schema = mongoose.Schema

const studentSchema = new Schema({
    rollno: {type:String,required:true},
    name:{type:String,required:true},
    joining_year:{type:String,required:true},
    graduation_year:{type:String,required:true},
    email: {type: String, required: true},
    password: {type: String, required: true}
})
module.exports = mongoose.model('Student',studentSchema) 