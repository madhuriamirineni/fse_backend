//create express app
const exp=require('express')
const app=exp()

//add body parsing m-w
app.use(exp.json())

const mongoose=require('mongoose')
const env=require('dotenv')
env.config()

const DB_URL=process.env.LOCAL_DB_URL;

//connect to database
mongoose.connect(DB_URL)
.then(()=>{console.log("Db connection success")})
.catch(err=>{console.log("err in DB connection",err)})


//import api
const userApp=require('./APIs/user-api')
//forward req to userApp if path start with /user-api
app.use('/user-api',userApp)

const movieApp=require('./APIs/movie-api')
app.use('/movie-api',movieApp)

const ticketApp=require('./APIs/ticket-api')
app.use('/ticket-api',ticketApp)

//error handler m-w
app.use((err,req,res,next)=>{
    res.send({message:"error occured",payload:err.message})
})


//add port number
const PORT=process.env.PORT||4000
app.listen(PORT,()=>{console.log(`web server is listening on ${PORT}`)})