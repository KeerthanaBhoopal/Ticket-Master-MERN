const mongoose=require('mongoose')
const validator= require('validator')
mongoose.set('useCreateIndex',true)
mongoose.set('useUnifiedTopology',true) 

const Schema=mongoose.Schema

const employeeSchema=new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        validate:{
            validator:function(value){
                return validator.isEmail(value)
            },
            message:function(){
                return 'invalid email format'
            }
        }

    },
    department:{
        type:Schema.Types.ObjectId,
        required:true,
        ref:'Department'//which model will it belong
    
    },
    mobile:{
        type:String,
        required:true,
        minlength:10,
        maxlength:10
    },
    createdAt:{
        type:Date,
        default:new Date()
    }
})
const Employee=mongoose.model('Employee',employeeSchema)

module.exports=Employee
