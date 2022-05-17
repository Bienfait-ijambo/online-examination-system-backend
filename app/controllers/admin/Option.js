const { Subject, Exam,Question,Option } = require("../../../models");
const { optionSchema } = require("../../helper/admin_validator");
const createError = require("http-errors");
const Sequelize = require("sequelize");
var helper=require('../../helper/paginate')
const { query } = require("express");
const Op = Sequelize.Op;

module.exports = {

  addOption: async (req, res, next) => {
    try {
      const result = await optionSchema.validateAsync(req.body);//to try bulk create
      const option = await Option.bulkCreate([req.body]);
      res.status(201).send({data:option,message:"created successfully !"})

    } catch (error) {
      if (error.isJoi === true) error.status == 422;
      next(error);
    }
  },

  //view option for a single question
//   displayQuestion:async (req,res)=>{
//     // http://127.0.0.1:5000/get_questions?exam_id=1&search=&size=0
//     const {search}=req.query
//     const {page,size,totalPage}=helper.paginate(req.query)

//        const questions=await Question.findAndCountAll({
//         include: {
//           model: Exam,
//         },
//         where:{examId:req.query.exam_id}, 
//         where: {
//           question_title:{
//             [Op.like]: `%${search}%`,
//           }
//         },
//         limit: size,
//         offset: page * size
//       });
//       res.send({
//         data: questions,
//         currentPage:page,
//         totalPages:  totalPage(questions.count),
//       });
    
//   },

  updateOption:async(req,res,next)=>{
    try {
        const result = await optionSchema.validateAsync(req.body);
        const option = await Option.update(req.body,{where:{id:req.body.id}});
        res.status(201).send({data:option,message:"Option updated successfully !"})
    } catch (error) {
        if(error.isJoi===true) error.status== 422
        next(error)
    }
  },

  deleteOption:async(req,res)=>{
      const option=await Option.destroy({where:{id:req.params.id}})
      res.status(200).send({message:"option deleted successfully"})
  }
};
