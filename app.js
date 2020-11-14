// сервер
const cors = require('cors')
const express = require('express')
const morgan = require('morgan') 
const bodyParser = require('body-parser')
const config = require('config')
const mongoose = require('mongoose')
const PORT = process.env.PORT || config.get('port') || 5000
const app = express()
const routAuth = require('./routes/auth.routers')
app.use('/api/auth',routAuth)

// cors что бы можно била от всюда взвать сервер
app.use(cors())

//body-parser
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

//morgan что бы увидеть просес запроса в коннсол
app.use(morgan('dev'))

// подкулчения mongoDb
     async function start(){
     try{
        await mongoose.connect(config.get('mongoUrl'),{
            useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
        })
        console.log('Mongo conected')
     }catch(e){
         console.log('Server Error', e.message)
         // если что то полшо не так то завершим процес 
         process.exit(1)
     }
     }
 
start()




app.listen(PORT, ()=>console.log(`App has been  strted on ${PORT}...`))