import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import mongoose from "mongoose"

import postRouter from './routes/posts.js'
import userRouter from './routes/users.js'


const app = express();

app.use(bodyParser.json({limit: "30mb", extented : true }))
app.use(bodyParser.urlencoded({limit: "30mb", extented : true }))
app.use(cors());

// app.use('/',(req,res)=>{
//     res.send("Aoye, balle balle ");
// })
app.use('/posts', postRouter)
app.use('/users', userRouter);


// const CONNECTION_URL = 'mongodb://localhost:27017/memories'
const CONNECTION_URL = 'mongodb+srv://sumit:test@inotebook.la6ft.mongodb.net/myFirstDataa?retryWrites=true&w=majority'
const PORT = process.env.PORT || 5000

mongoose.connect(CONNECTION_URL , { useNewUrlParser: true, useUnifiedTopology : true})
.then( ()=>{ app.listen(PORT , ()=>{ console.log(`Server is runnning at  ${PORT}`)}) })
.catch( (error)=>{ console.log(error.message) })

// mongoose.set('useFindAndModify', false)


