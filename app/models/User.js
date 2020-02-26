//here we can use only the ES5 coz use the current object value


const mongoose=require('mongoose')
const validator=require('validator')
const Schema=mongoose.Schema
const jwt=require('jsonwebtoken')
const bcryptjs=require('bcryptjs')

const userSchema=new Schema({
    username:{
        type:String,
        required:true,
        unique:true,
        minlength:5
    },
    email:{
        type:String,
        required:true,
        unique:true,
        //custom validation
        validate:{//object--validator,message
            validator:function(value){
                return validator.isEmail(value)
            },
            message:function(){
                return 'invalid email format'
            }
        }

    },
    password:{
        type:String,
        required:true,
        minlength:6,
        maxlength:128

    },
    //video11--array of objects
    tokens:[     //to have a multi-login user from many devices then we have to save multiple tokens
        {        // the token data need not just be the user id it can have many other properties
            token:{
                type:String
            },
            createdAt:{
                type:Date,
                default:Date.now
            }
        }
    ]
})
//pre hooks//video 4password encryption //model middleware
userSchema.pre('save',function(next){
    const user=this//refer  to user object in .save
    //changing 8
    if(user.isNew){//8 only when a new user registers a token should be genenrated coz for every 'save' this function is called, when user is trying to register into the database
bcryptjs.genSalt(10)  //salt just like how imp it is in cooking, it is imp in password encryption
.then(function(salt){
    bcryptjs.hash(user.password,salt)
      .then(function(encryptedPassword){
            user.password=encryptedPassword
    next()//true
   // false
    })
    })
}
else{
    next()
}
})

//own static method // this is an asynchronous task- fetching the email from the DB is an asynchronous task
userSchema.statics.findByCredentials=function(email,password){
    const User=this
        //find user based on email--this method will retrun a promise--
        return User.findOne({email})//it will also return promise
            .then(function(user){
            if(!user){
                return Promise.reject('invalid email/password')
            }

            return bcryptjs.compare(password,user.password)//db password //compare method- takes the salt and uses it on the password it will provide the same hashed value and now it compares it to true
                .then(function(result){//bolean true or false
                    if(result){
                        return Promise.resolve(user)
                    //    return new Promise(function(resolve,reject){
                    //        resolve(user)
                    //    })
                    }
                    else{
                        return Promise.reject('invalid password/email')
                    }
                })
        })

    .catch(function(err){//1st then
        return Promise.reject(err)
        //return new Promise(function/resolve)
        //reject(err)
        //})
    })
}
//defining static method
//vid 15
userSchema.statics.findByToken=function(token){
    const User=this
    let tokenData
    try{
        tokenData=jwt.verify(token,'jwt@123')//decoding  // we can encode and decode the tokens
    }
    catch(err){
        return Promise.reject(err)//throw so many errors
    }
    //if valid token
    return User.findOne({//return promise--get user object
        _id:tokenData._id,
        'tokens.token':token//tokens is an object , which has the token property- we put it in the '' so that we can use the '.' 
    })
    
    
}

//own instance methods-12{
userSchema.methods.generateToken=function(){
    const user=this//instance
    const tokenData={
        _id:user._id,
        username:user.username,
        createdAt:Number(new Date())
        //role:admin/custoemr
        }
    //generating actual token
    const token=jwt.sign(tokenData,'jwt@123')
    user.tokens.push({
        token//???

    })
    //pushed but still we have not saved it
    return user.save()
    .then(function(user){
        return Promise.resolve(token)//
    })
    .catch(function(err){
        return Promise.reject(err)
    })
}

const User=mongoose.model('User',userSchema)
module.exports={
    User
}