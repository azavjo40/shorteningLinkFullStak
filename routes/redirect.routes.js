
const {Router} = require('express')
const Link = require('../models/Link')
const router = Router()


// перенаправить ссылку на новий redirekt
router.get('/:code', async (req, res)=>{
    try {
        // ищем ссылку по code с помощи params забераем id 
const link = await Link.findOne({code: req.params.code})
// проверяем если есть пишем логику
if(link){
    // тут считаем клик 
link.clicks++
//тут сохряняем
await link.save()
// тут возрашаем делаем редирект к оргиналу 
return res.redirect(link.from)
}
// иначе отвечаем 
res.status(404).json('Ссылка не найдена')
  } catch (e) {
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
  }
})

module.exports = router