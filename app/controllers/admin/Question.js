const { Subject, Exam,Question } = require("../../../models");
const { QuestionSchema } = require("../../helper/admin_validator");
const createError = require("http-errors");
const Sequelize = require("sequelize");
var helper=require('../../helper/paginate')
const { query } = require("express");
const Op = Sequelize.Op;

module.exports = {
  newQuestion: async (req, res, next) => {
    try {

      const result = await QuestionSchema.validateAsync(req.body);
      const question = await Question.create(req.body);
      res.status(201).send({data:question,message:"Question created successfully !"})

    } catch (error) {
      if (error.isJoi === true) error.status == 422;
      next(error);
    }
  },

  displayQuestion:async (req,res)=>{
    // http://127.0.0.1:5000/get_questions?exam_id=1&search=&size=0
    const {search}=req.query
    const {page,size,totalPage}=helper.paginate(req.query)

       const questions=await Question.findAndCountAll({
        include: {
          model: Exam,
        },
        where:{examId:req.query.exam_id}, 
        where: {
          question_title:{
            [Op.like]: `%${search}%`,
          }
        },
        limit: size,
        offset: page * size
      });
      res.send({
        data: questions,
        currentPage:page,
        totalPages:  totalPage(questions.count),
      });
    
  },

  updateQuestion:async(req,res,next)=>{
    try {
        const result = await QuestionSchema.validateAsync(req.body);
        const question = await Question.update(req.body,{where:{id:req.body.id}});
        res.status(201).send({data:question,message:"Question updated successfully !"})
    } catch (error) {
        if(error.isJoi===true) error.status== 422
        next(error)
    }
  },

  deleteQuestion:async(req,res)=>{
      const question=await Question.destroy({where:{id:req.params.id}})
      res.status(200).send({message:"question deleted successfully"})
  }
};
