const Department=require('../models/departments')

module.exports.list=(req,res)=>{
    Department.find()
    .then((departments)=>{
        res.json(departments)
    })
    .catch((err)=>{
        res.json(err)
    })
}
module.exports.create=(req,res)=>{
    const body=req.body
    const department=new Department(body)
    department.save()
    .then((department)=>{
        res.json(department)
    })
    .catch((err)=>{
        res.json(err)
    })
}
module.exports.update=(req,res)=>{
    const id=req.params.id
    const body=req.body
    Department.findByIdAndUpdate(id,body,{new:true,runValidators:true})
    .then((departments)=>{
        if(departments){
        res.json(departments)
        }else{
            res.json({})
        }
    })
    .catch((err)=>{
        res.json(err)
    })
}
module.exports.show=(req,res)=>{
    const id=req.params.id
    Department.findById(id)
    .then((department)=>{
        if(department){
            res.json(department)
        }
        else{
            res.json({})
        }
    })
    .catch((err)=>{
        res.json(err)
    })
}
module.exports.remove=(req,res)=>{
    const id=req.params.id
    Department.findByIdAndDelete(id)
    .then((departments)=>{
        if(departments)
        res.json(departments)
        else
        res.json({})
    })

    .catch((err)=>{
        res.json(err)
    })
    }
