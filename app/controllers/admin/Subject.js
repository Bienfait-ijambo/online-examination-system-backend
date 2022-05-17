const {Subject,Exam} =require('../../../models')
const {subjectSchema}=require('../../helper/admin_validator')
const createError=require('http-errors')

module.exports={

 
    //subject
    newSubject:async(req,res,next)=>{
        try{
         
            const result=await subjectSchema.validateAsync(req.body)
            const doesExist=await Subject.findOne({where:{subjectName:req.body.subjectName}})
            if(doesExist) throw new createError.BadRequest("Subject already exist !")
            const newSubject=await Subject.create(req.body)
            res.status(201).send({subject:newSubject,message:"new subject added successfulyly"})
        }
        catch(error){
            if(error.isJoi===true) error.status=422
            next(error)
        }
        
    },

    editSubject:async(req,res)=>{
  
        const updateSubject=await Subject.update(
            {subjectName:req.body.subjectName},
            {where:{id:req.params.id}
        })
        res.status(200).send({message:"subject updated !"})
    }
}