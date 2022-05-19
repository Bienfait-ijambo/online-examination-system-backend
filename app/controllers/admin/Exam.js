const { Subject, Exam } = require("../../../models");
const { examSchema } = require("../../helper/admin_validator");
const createError = require("http-errors");
const Sequelize = require("sequelize");
var helper=require('../../helper/paginate')
const { query } = require("express");
const Op = Sequelize.Op;
module.exports = {

  newExam: async (req, res, next) => {
    try {
      const result = await examSchema.validateAsync(req.body);
      const exam = await Exam.create(req.body);
      res.status(201).send({exam:exam,message:"Exam created successfully !"})

    } catch (error) {
      if (error.isJoi === true) error.status == 422;
      next(error);
    }
  },

displayExam:async (req,res)=>{
    // http://127.0.0.1:5000/get_exams?search=&size=0
    const {search}=req.query
    const {page,size,totalPage}=helper.paginate(req.query)

       const exams=await Exam.findAndCountAll({
        include: {
          model: Subject,
          attributes: ["id", "subjectName"],
          where: {
            subjectName: {
              [Op.like]: `%${search}%`,
            },
          },
        },
        limit: size,
        offset: page * size
      });
      res.send({
        data: exams,
        currentPage:page,
        totalPages:  totalPage(exams.count),
      });
    
  },

  updateExam:async(req,res,next)=>{
    try {
        const result = await examSchema.validateAsync(req.body);
        const exam = await Exam.update(req.body,{where:{id:req.body.id}});
        res.status(201).send({exam:exam,message:"Exam updated successfully !"})
    } catch (error) {
        if(error.isJoi===true) error.status== 422
        next(error)
    }
  },

  deleteExam:async(req,res)=>{
      const exam=await Exam.destroy({where:{id:req.params.id}})
      res.status(200).send({message:"exam deleted successfully"})
  }
};
