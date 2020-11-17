const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
  // откуда будить 
  from: {type: String, required: true},
// до куда
  to: {type: String, required: true, unique: true},
  // кодь 
  code: {type: String, required: true, unique: true},
  // дата что бы дата добавить 
  date: {type: Date, default: Date.now},
  // что бы проверить сколько клик бил
  clicks: {type: Number, default: 0},
  // что бы узнать кто делал клик или сылка по id
  owner: {type: Types.ObjectId, ref: 'User'}
})

module.exports = model('Link', schema)
