var bcrypt = require('bcrypt');
var jwtUtil = require('../utils/jwt.util');
var models =require('../models')
var asyncLib = require("async");


module.exports={


	register:(req,res)=>{
		//params
		var email = req.body.email;
		var username = req.body.username;
		var password = req.body.password;
		var bio = req.body.bio;
		var isAdmin = req.body.isAdmin;


		// if (email != "" || username != "" || password != "" || bio!="") {
		// 	return res.status(400).json({'error':'missing parameters'})
		// }

		//check if user exist

		models.User.findOne({
			attributes:['email'],
			where:{email:email}
		}).then((userFound)=>{

			if (!userFound) {
				
				bcrypt.hash(password,5,(error,bcryptPassword)=>{
					var newUser=models.User.create({
						email:email,
						username:username,
						password:bcryptPassword,
						bio:bio,
						isAdmin:0
					}).then(()=>{
						return res.status(201).json({'success':"user create"})
					})
				})

			}else{
				return res.status(409).json({'error':'user already exist'})
			}

		}).catch((error)=>{
			return res.status(400).json({'error':'unable to check user'})
		})


	},

	login:(req,res)=>{

		var email = req.body.email;
		var password = req.body.password;

		models.User.findOne({
			where:{email:email}
		}).then((userFound)=>{

			if (userFound) {

				bcrypt.compare(password,userFound.password,(error,resBycrypt)=>{

					if (resBycrypt) {
						return res.status(200).json({
							'userId':userFound.id,
							'token' : jwtUtil.generateTokenForUser(userFound)
						});

					}else{
						return res.status(403).json({'error':'invalide password'});
					}
				})

			}

		}).catch((error)=> res.status(400).json({'error':'unable to check user'}))

	},

	getUserProfile:(req,res)=>{
		//getting auth header
		var headerAuth = req.headers['authorization'];
		var userId = jwtUtil.getUserId(headerAuth);

	    if(userId < 0) 
	    return res.status(400).json({'error':'invalide password'});

		models.User.findOne({
			attributes:['id','email','username','bio'],
			where:{id:userId}
		}).then((user)=>{

			if (user) {
			    return res.status(201).json(user)
			}else{
	    		return res.status(404).json({'error':'invalide password'});
			}

		}).catch((error)=>res.status(500).json({'error':'user not found'}))

	}

}

