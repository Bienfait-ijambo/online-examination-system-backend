const {Subject,Exam} =require('../../../models')
const {subjectSchema}=require('../../helper/admin_validator')
const createError=require('http-errors')
const Sequelize = require("sequelize");
var helper=require('../../helper/paginate')
var util=require('../../helper/util')
const { query } = require("express");
const Op = Sequelize.Op;

module.exports={

 
    //subject
    newSubject:async(req,res,next)=>{
        try{
         
            const result=await subjectSchema.validateAsync(req.body)
            const doesExist=await Subject.findOne({where:{subjectName:req.body.subjectName}})
            if(doesExist) throw new createError.BadRequest("Subject already exist !")
            const newSubject=await Subject.create(req.body)
            res.status(201).send({subject:newSubject,message:"New subject added successfuly !"})
        }
        catch(error){
            if(error.isJoi===true) error.status=422
            next(error)
        }
        
    },

    editSubject:async(req,res,next)=>{

        try{
            const result=await subjectSchema.validateAsync({subjectName:req.body.subjectName})
            const updateSubject=await Subject.update({subjectName:req.body.subjectName},
                {where:{id:req.body.id}
            })
            res.status(200).send({message:"subject updated !"})
        }
        catch(error){
            if(error.isJoi===true) error.status=422
            next(error) 
        }
   
    },
    sigleSubject:async(req,res)=>{
        const subject =await Subject.findOne({where:{id:req.params.id},attributes:['id','subjectName']})
        res.status(200).send({data:subject})
    },
     getSubjects:async(req,res)=>{
        // http://localhost:5000/list_users?search=&filter_by_type=Admin&size=0
        const {search}=req.query
        const {page,size,totalPage}=helper.paginate(req.query)

        const subjects=await Subject.findAndCountAll({
            where: {
                subjectName: {
                    [Op.like]: `%${search}%`,
                },
            },
         
            attributes:['id','subjectName'],
            limit: size,
            offset: page * size
        });

         res.send({
            data: subjects,
            currentPage:page,
            totalPages:  totalPage(subjects.count),
          });

    },
    removeSubject:async(req,res)=>{
      const question=await Subject.destroy({where:{id:req.params.id}})
      res.status(200).send({message:"subject deleted successfully"})
    }

}