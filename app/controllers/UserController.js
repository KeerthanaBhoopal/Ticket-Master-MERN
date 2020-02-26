//this is the file with correct code for now - 5/2/2020

//video 17--middleware function
const express=require('express')
//const bcryptjs=require('bcryptjs')//
const router=express.Router()
const _ = require('lodash')
const  {User}=require('../models/User')
const {authenticateUser}=require('../middlewares/authentication')

//localhost:3000/users/register/
router.post('/register',function(req,res){
  //  module.exports.list=(req,res)=>{
    const body=req.body
    //console.log(body)
    //creating user object
    const user=new User(body)
    //console.log(user.isNew)//true//video 8 isNew Property
    user.save()
        .then(function(user){
            //console.log(user.isNew)//false
            console.log(_.pick(user, ['_id', 'username', 'email']))
            res.send(_.pick(user, ["_id", "username", "email"]))
            
        })
        .catch(function(err){
            res.send(err)
        })
})





//localhost:3000/users/login
router.post('/login',function(req,res){
 //   module.exports.log=(req,res)=>{
    const body=req.body
//check email exist or not
//define our own static method..on user model
    User.findByCredentials(body.email,body.password)//static method
    .then(function(user){
        //video 12 generate token for user--define instance method in user
      return  user.generateToken()//return promise object-instance method asynchronous operation
       // res.send(user)
    })
    .then(function(token){//after user//this time we get entire tokenhgjvjucvjhchdcy inf
        //res.setHeader('x-auth', token).send({token})//12
        res.send({token})

    })
    .catch(function(err){
        res.send(err)
    })
})


//http is a stateless protocol- it will give you a request and send a response, it does not save the user data

//localhost:3000/users/account
router.get('/account',authenticateUser, function(req,res){
//    module.exports.acc=(req,res)=>{
    const {user}=req
    console.log(_.pick(user,['_id', 'username', 'email']))
        res.send(_.pick(user,['_id', 'username', 'email']))
   
})

//localhost:3000/users/logout
router.delete('/logout',authenticateUser, function(req,res){
    const {user, token} =req
    User.findByIdAndUpdate(user._id, {$pull:{tokens:{token:token}}})
        .then(function(){
            res.send({notice:'successfully logged out'})
        })
        .catch(function(err){
            res.send(err)
        })

})


module.exports={
    userRouter:router
}
