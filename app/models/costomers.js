const mongoose=require('mongoose')
const Schema=mongoose.Schema
const validator=require('validator')
const customerSchema=new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        //custom validation
        validate:{
            validator:function(value){
                return validator.isEmail(value)
            },
            message:function(){
                return 'invalid email format'
            }
        }
    },
    mobile:{
        type:String,
        required:true,
        validate:{
            validator:function(value){
                return validator.isNumeric(value)
            },
            message:function(){
                return 'invalid mobile number'
            }
        },
        minlength:10,
        maxlength:10
    },
    createdAt:{
        type:Date,
        default:new Date()
    }
})
const Customer=mongoose.model('Customer',customerSchema)
module.exports=Customer
