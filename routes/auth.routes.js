const {Router} = require('express')
const User = require('../modeles/User')
const bcrypt = require('bcryptjs')
const {check, validationResult} = require('express-validator')
const jwt = require("jsonwebtoken")
const config = require('config')

const router = Router()


// router  /api/auth/regiter
router.post( 
    'register',
    [
        // валидатор проверить чтобы пустие полья не отправирили 
        check('email', 'Некорректный email').isEmail(),
        check('password', 'Минимальная длина пароля 6 символов')
          .isLength({ min: 6 })
    ],
     async (req, res)=>{
try{

    // валидатор 
    const errors = validationResult(req)
  if(!errors.isEmpty()){
    return res.status(400).json({
        errors: errors.array(),
        message: 'Некорректный данные при регистрации'
      })
  }


//логика 
// получем даний с фронтента
const {email, password} = req.body

// логика регистрация провераем если есть тако пользватель
const candiate = await User.findOne({email})

// если есть пользватель то 
if(candiate){
    res.status(400).json({message: 'Такой пользватель уже существует'})
}


// щифровать пароль и сравнивать 
const hashedPassword = await bcrypt.hash(password, 12)

// создаем новий пользватела 
const user = new User({email, password: hashedPassword})

// сохранаем пользвателья 
await user.save()

res.status(201).json({message: 'Пользватель создан '})

}catch(e){
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
}

})




// router  /api/auth/login
router.post(
    'login', 
    [
        // валидатор проверка даних
        check('email', 'Введите корректный email').normalizeEmail().isEmail(),
    check('password', 'Введите пароль').exists()
    ],
    async (req, res)=>{
try{

    // валидатор 
    const errors = validationResult(req)
  if(!errors.isEmpty()){
    return res.status(400).json({
        errors: errors.array(),
        message: 'Некорректный данные при входе в систему'
      })
  }

  // логика 
  const {email, password} = req.body
 
  // ишем пользвателья 
  const user = await User.findOne({email})


  // если нет такой пользватель 
  if(!user){
      return res.status(400).json({message: 'Пользватель не найден'})
  }

  // сравниваем пароль то что получаем и то что в базах
   const isMatch = await bcrypt.compare(password, user.password)

   // провераем совпвдаеть пароль 
    if(!isMatch){
       return res.status(400).json({message: 'Неверный пароль попробуйте снова'})
    }
   
    //  создаем токен
    const token = jwt.sign(
        // тут userID  токен 
        {userId: user.id},
        //тут передаем секретный кулуч с папка конфиг
        config.get('jwtSecrtet'),
        // тут врем токена через сколько закончится 
        {expiresIn: '1h'}

    )
    
    // ллогин завершено отвечаем все 
    res.json({token, userId: user.id})

}catch(e){
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
}

})

module.exports = router