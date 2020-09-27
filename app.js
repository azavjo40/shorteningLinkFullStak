const express = require('express')
const config = require('config')
const mongoose = require('mongoose')
const app = express()

// порт забираем из config
const PORT = config.get('port') || 5000

//что бы json формать бил
app.use(express.json({extended: true}))

// это  адрес запоса /api/auth/ 
app.use('/api/auth', require('./routes/auth.routes'))

// тут подкулчаем базаданих
async function start() {
    try {
        // адрес база даний 
      await mongoose.connect(config.get('mongoUrl'), {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
      })
      // на это порту слушает 
      app.listen(PORT, () => console.log(`App has been started on port ${PORT}...`))
    } catch (e) {
        // если ошибка 
      console.log('Server Error', e.message)
      // иначе выходим 
      process.exit(1)
    }
  }
  
  start()
  
  



