const {Schema, modal, Types, model} = require('mongoose')

// схема для сохранения дания пользвателья 
const schema = new Schema({
    // email поличаем 
    email: {type: String, required: true, unique: true},
    // тут получаем пароль 
    password: {type: String, required: true},
    // тут у каждого будить свой сылка 
    links: [{ type: Types.ObjectId, ref: 'Link' }]
  })
  
  module.exports = model('User', schema)