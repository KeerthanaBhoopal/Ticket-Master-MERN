const mongoose=require('mongoose')
const Schema=mongoose.Schema
const ticketSchema=new Schema({
    code:{
        type:String,
        required:true 
    },
    customer:{
        type:Schema.Types.ObjectId,
        ref:'Customer',
        required:true
    },
    employees:[{
        type:Schema.Types.ObjectId,
        ref:"Employee",
        required:true
    }],
    department:{
        type:Schema.Types.ObjectId,
        ref:"Department",
        required:true
    },
    message:{
        type:String
    },
    priority:{
        type:String,
        enum:['high','low','medium']// array enum is string objects
    },
    // isResolved:{
    //     type:String
    // }
})
const Ticket=mongoose.model('Ticket',ticketSchema)
module.exports=Ticket