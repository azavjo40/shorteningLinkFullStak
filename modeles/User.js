const {Schema, model, Types} = require('mongoose')
// создаем логику в базе  для пользватела
const schema = new Schema({
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    // логика для сылок
    links: [{type: Types.ObjectId, ref: 'Link'}]
})



module.exports = model('UserTest', schema)