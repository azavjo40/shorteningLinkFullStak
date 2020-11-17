// links для моделация сылка

const {Router} = require('express')
const Link = require('../models/Link')
const router = Router()
const auth = require('../middleware/auth.middleware')
const config = require('config')
const shortis = require('shortid')
const shortid = require('shortid')
// /api/link/generste  создать добавить мидолвер
router.post('/generate',auth, async (req, res)=>{
    try{
        // тут храним адресь локол хост
  const baseUrl = config.get('baseUrl')

   // получаем from откуда получем сылку 
   const {from} = req.body

   // сформировать каротки код придумать уникалний пут с библотеки shortid
 const code = shortid.generate()

 // проверяем если такой сылка в базе то отправляем это сылку
  const existing   = await Link.findOne({from})
 if(existing){
    return res.status(200).json({link: existing})
 }

 // to сформировать хост и коде  и отправить 
     const to = baseUrl + '/t' + code

     //создаем сылка 
     const link = new Link({
         code, to, from, owner: req.user.userId
     })

     // сохрянаем
     await link.save()

     res.status(201).json({link})
    }catch(e){
        res.status(500).json({message: 'Что-то пошло не такб попробуйте снова'})
}
})





// все запрось тут добавляем мидлвер
router.get('/',auth, async (req, res)=>{
    try{
        // забераем все сылки 
   const links = await Link.find({owner: req.user.userId}) // тут то что создали в мидолверы
   // возрашаем все сылки
   res.json(links)
    }catch(e){
        res.status(500).json({message: 'Что-то пошло не такб попробуйте снова'})
    }
})





// по id  добавляем мидолвер
router.get('/:id',auth, async (req, res)=>{
    try{
      // забераем сылки по  id
      const links = await Link.findById(req.params.id) 
      // возрашаем  сылки
      res.json(links)
    }catch(e){
        res.status(500).json({message: 'Что-то пошло не такб попробуйте снова'})
    }
})




module.exports = router