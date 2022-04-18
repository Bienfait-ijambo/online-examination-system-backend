var jwt = require('jsonwebtoken');

//user tocken

const JWT_SIGN_SECRET = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ908XYdfdeyJzdWIiOiIxMjM0x09NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5cX003éx).;";

module.exports={

	generateTokenForUser:(userData)=>{

		return jwt.sign({
			userId:userData.id,
			isAdmin:userData.isAdmin
		},JWT_SIGN_SECRET,{
			expiresIn:"1h",
		})
	},

	parseAuthorization:(authorization)=>{
		return (authorization!=null) ? authorization.replace('Bearer',''):null;
	},
	getUserId:(authorization)=>{
		var userId = -1;
		var token = module.exports.parseAuthorization(authorization);
		if (token!=null) {
			try{
			var jwtToken = jwt.verify(token,JWT_SIGN_SECRET);
			 if (jwtToken !=null) 
			 	userId = jwtToken.userId;

			} catch(err){

			}
		}
		return userId;
	}
}