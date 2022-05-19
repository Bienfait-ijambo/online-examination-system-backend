var express=require('express')
var router=express.Router()
const User = require('../../app/controllers/auth/User')
const Subject=require('../../app/controllers/admin/Subject')
const Exam=require('../../app/controllers/admin/Exam')
const Question=require('../../app/controllers/admin/Question')
const Option=require('../../app/controllers/admin/Option')






router.post('/register',User.register)
router.post('/login',User.login)
router.get('/list_users',User.getUsers)

router.post('/new_subject',Subject.newSubject)
router.put('/edit_subject',Subject.editSubject)
router.get('/subjects',Subject.getSubjects)
router.get('/subject/:id',Subject.sigleSubject)
router.delete('/subject/:id',Subject.removeSubject)
router.get('/all_subject',Subject.allSubject)


router.post('/new_exam',Exam.newExam)
router.put('/update_exam',Exam.updateExam)
router.delete('/delete_exam/:id',Exam.deleteExam)
router.get('/get_exams',Exam.displayExam)



router.post('/new_question',Question.newQuestion)
router.put('/update_question/:id',Question.updateQuestion)
router.delete('/delete_question/:id',Question.deleteQuestion)
router.get('/get_questions',Question.displayQuestion)

router.post('/new_option',Option.addOption)
router.put('/update_option/:id',Option.updateOption)
router.delete('/delete_option/:id',Option.deleteOption)
// router.get('/get_questions',Question.displayQuestion)

module.exports=router