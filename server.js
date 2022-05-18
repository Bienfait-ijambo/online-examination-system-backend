var express=require('express');
var bodyParse=require('body-parser');
var createError=require('http-errors')
// var cluster=require('cluster')
var cors = require('cors')
require('dotenv').config()
var app=express()

var api=require('./routes/v1/api')


app.use(cors())

app.use(bodyParse.json())
app.use(bodyParse.urlencoded({extended:true}))

app.use('/api',api)

app.use(async (req, res, next) => {
	next(createError.NotFound())
})

app.use((err, req, res, next) => {
	res.status(err.status || 500)
	res.send({
	  error: {
		status: err.status || 500,
		message: err.message,
	  },
	})
  })

const PORT= process.env.PORT

// //to for use in deployment
// if(cluster.isMaster){
// 	//count the machines cpu's
// 	var cpuCount=require('os').cpus().length
// 	//create a worker for each cpu
// 	for (var i = 0; i < cpuCount; i++) {
// 		cluster.fork()
// 	}
// 	//listen for die workers
// 	cluster.on('exit',function(){
// 		cluster.fork()
// 	})
// }else{
	app.listen(PORT,()=>console.log("server is running at "+PORT))
// }


