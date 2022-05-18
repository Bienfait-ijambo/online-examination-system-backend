const {authSchema,loginSchema}=require('../../helper/auth_validator')
const bcrypt = require('bcrypt');
const {User}=require('../../../models')
const createError=require('http-errors')
const jwt=require('../../helper/jwt')
const Sequelize = require("sequelize");
var helper=require('../../helper/paginate')
const { query } = require("express");
const Op = Sequelize.Op;

module.exports={
    register:async (req,res,next)=>{
        try {

            const result = await authSchema.validateAsync(req.body);
            const userExist=await User.findOne({where:{email:req.body.email}})
            if(userExist) throw new createError.BadRequest("This email has already been registered !")
            const hash= await bcrypt.hash(req.body.password, 10)
            //we pass the hash format to req.body.password
            req.body.password=hash
            const newUser=await User.create(req.body)
            res.status(200).send({message:"user created !"})

        } catch (error) {
            if (error.isJoi === true) error.status = 422
            next(error)
        }
    },
    


    login:async (req,res,next)=>{
        try{
         
            const result=await loginSchema.validateAsync(req.body);
            const user=await User.findOne({attributes:['id','name','email','password'],where:{email:req.body.email}})
            if(!user) throw new createError.NotFound("Incorrect email adress !")
            const isMatch= await bcrypt.compare(req.body.password,user.password)
            
            if(!isMatch) throw new createError.Unauthorized("Email or password incorrect !")
            const  token= await jwt.signAcessToken(user.id)
            res.status(200).send({userId:user.id,userEmail:user.email,userToken:token})

        }catch(error){
            if(error.isJoi === true) 
            return createError.BadRequest("user name or password invalid ")
            next(error)
        }
    },
    getUsers:async(req,res)=>{
        // http://localhost:5000/list_users?search=&filter_by_type=Admin&size=0
    const {search,filter_by_type}=req.query
    const {page,size,totalPage}=helper.paginate(req.query)

    const users=await User.findAndCountAll({
        where: {
            user_type:`${filter_by_type}`,
            name: {
                [Op.like]: `%${search}%`,
            },
        },
     
        attributes:['id','name','email','user_type'],
        limit: size,
        offset: page * size
    });

     res.send({
        data: users,
        currentPage:page,
        totalPages:  totalPage(users.count),
      });

    }

    //finish this part==token refresh and sort_users //secure routes

}