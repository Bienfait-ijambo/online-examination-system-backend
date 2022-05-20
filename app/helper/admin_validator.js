const Joi=require('joi')

const subjectSchema=Joi.object({
    subjectName:Joi.string().required()
})

const examSchema=Joi.object({
    id:Joi.any().optional(),
    courseId:Joi.number(),
    duration:Joi.number(),
    total_question:Joi.number(),
    right_question:Joi.number(),
    bad_question:Joi.number(),
})


const QuestionSchema=Joi.object({
    id:Joi.any().optional(),
    examId:Joi.number().required(),
    question_title:Joi.string().required(),
    answer_option:Joi.number().required(),
})


const optionSchema=Joi.object({
    id:Joi.number(),
    questionId:Joi.number().required(),
    option_number:Joi.number().required(),
    option_title:Joi.string()
})
module.exports={
    subjectSchema,
    examSchema,
    QuestionSchema,
    optionSchema
}