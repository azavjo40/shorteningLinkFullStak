// фн перехватить логику для линк next для продолжения запросы
const jwt = require('jsonwebtoken')
const config = require('config')

module.exports = (req, res, next) => {
    //проверяем если сервер то продолбжаем запросы 
  if (req.method === 'OPTIONS') {
    return next()
  }

  try {
 // получаем токен с хидер строка которие будем отправлять с фронтента забиряем первий элемент
    const token = req.headers.authorization.split(' ')[1] // "Bearer TOKEN"
   
// если нет токен
    if (!token) {
         // отвечаем нет авторизация
      return res.status(401).json({ message: 'Нет авторизации' })
    }
// если есть токен то разпарсим их
    const decoded = jwt.verify(token, config.get('jwtSecret'))
    // положим его 
    req.user = decoded
    next()

  } catch (e) {
    res.status(401).json({ message: 'Нет авторизации' })
  }
}
