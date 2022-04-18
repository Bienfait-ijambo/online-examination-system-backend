var express = require('express');
var bodyParser = require('body-parser');
var apiRouter = require('./apiRouter').router;
var app=express()

/*
*we set ejs template egine
*/
app.set('view engine','ejs')

/*
* allow to access form attribue
*/
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())

app.use('/api/',apiRouter)



//routes
app.use('/',require('./routes/web'))

//allow to access into assets folder
app.use('/assets',express.static('assets'))



const PORT = process.env.PORT || 8080

app.listen(PORT,console.log(`server started on port ${PORT}`))
