const { reject } = require("bcrypt/promises");
const JWT = require("jsonwebtoken");
const createError=require('http-errors')

module.exports = {
  signAcessToken: (user) => {
    return new Promise((resolve, reject) => {
      const privateKey = process.env.PRIVATE_KEY;
      JWT.sign({ userId: user.id }, privateKey, { expiresIn: "1h" },(err, token)=> {
          if(err){
            reject(createError.InternalServerError())
          }
          resolve(token)
        });
    });
  },

  removeBearer: (token) =>{
    if(token !== null && typeof token!==undefined){
      return token.replace("Bearer ", "");
    }
  },

  verifyToken: (token) => {
    return new Promise((resolve, reject) => {
      var userId = -1;
      // var token=module.exports.removeBearer(token);
      if (token != null) {
        var jwtToken = jwt.verify(token, process.env.PRIVATE_KEY);
        if (jwtToken != null) userId = jwtToken.userId;
        resolve();
      } else {
        reject();
      }
    });
  },
};
