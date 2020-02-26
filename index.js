const express=require('express')
const cors=require('cors')
const router=require('./config/routes')
const setUpDB=require('./config/database')
const {userRouter}= require('./app/controllers/UserController')
setUpDB()

const app=express()
const port=3040

app.use(express.json())
app.use(cors())
app.use('/users', userRouter)



app.use('/',router)
app.use(express.json())

app.listen(port,()=>{
    console.log('Listening to the port',port)
})
