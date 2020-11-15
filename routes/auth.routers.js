  
const router = require('express').Router()
const bcrypt = require('bcryptjs')
const config = require('config')
const jwt = require('jsonwebtoken')
const {check, validationResult} = require('express-validator')
const User = require('../modeles/User')

// /api/auth/register
router.post(
  '/register',
  [
    //валидатор
    check('email', 'Некоррекнный email ').isEmail(),
    check('password', 'Миннимальна парол 6 сиволь')
    .isLength({min: 6})
  ],
  async (req, res) => {
    console.log('body', req.body)
  try {
// валидатор 
    const errors = validationResult(req)
   if(!errors.isEmpty()){
     return res.status(400).json({
       errors: errors.array(),
       message: 'Некоррекный даний при регистрации'
     })
   }


    const {email, password} = req.body 

   const candiDate = await User.findOne({email: email})
   
   if(candiDate){
   return  res.status(400).json({message: 'Такой пользватель уже сушествуеть'})
   }
   const hashedPassword = await bcrypt.hash(password, 12)
   const user = new User({email, password: hashedPassword})

   await user.save()
   res.status(201).json({message: 'Пользватель создан'})
  
  } catch (e) {
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
  }
})
  // /api/auth/login
  router.post(
    '/login',
    [
      // валидатор
      check('email', 'Ведите корректный email').normalizeEmail().isEmail(),
      check('password', 'ведите пароль').exists
    ],
    async (req, res)=>{
      try {
        // валидатор 
            const errors = validationResult(req)
           if(!errors.isEmpty()){
             return res.status(400).json({
               errors: errors.array(),
               message: 'Некоррекный даний при при входе система'
             })
           }
        
        const [email, password] = req.body

        const user = await User.findOne({email: email})
        if(!user){
          return res.status(400).json({message: 'пользватель не найден'})
        }
           // проверка совпадает парол 
        const isMatch = await bcrypt.compare(password, user.password)
         if(!isMatch){
         return res.status(400).json({message: 'Неверний пароль попробуйте снова'})
         }
         // токен 
         const token = jwt.sign(
           {userId: user.id},
           // секретний клуч
           config.get('jwtSectret'),
           // время токенв на 1 час
           {expiresIn: '1h'}
         )
            
         res.status(200).json({token, userId: user.id})
}catch(e){
  res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
}
  })
  
  
  module.exports = router