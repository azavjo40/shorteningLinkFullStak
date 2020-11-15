import React, {useState}  from 'react'
import { useHttp } from '../hooks/http.hook'


function AuthPage (){
// import my hooks 
  const {loading, request  } = useHttp()
  const [form, setForm] = useState({
    email: '', password: ''
  })
  
 
// фн для сбора поля 
const changeHandler = event =>{
  setForm({...form, [event.target.name]: event.target.value })
}
// fn register
const registerHandler = async () =>{

try{
const data = await request('http://localhost:5000/api/auth/register','POST', {...form})
  console.log('data',data)
  console.log('hello')
}catch(e){}
}

 return(
   <div className="row">
   <div className="col s6 offset-s3">
    <h1 style={{fontSize: 30}}>Сократи-Ссылку</h1>
    <div className="card blue darken-1">
        <div className="card-content white-text">
          <span className="card-title">Авторизация</span>
          <div>
        
        <div className="input-field ">
          <input placeholder="Введите Email" 
          id="emil"
           type="email"
           name="email" 
           className="yellow-input"
           onChange={changeHandler}
          />
          <label htlmfor="email">Email</label>
        </div>

        <div className="input-field ">
        <input placeholder="Введите Пароль" 
          id="password"
           type="password"
           name="password" 
           className="yellow-input"
           onChange={changeHandler}
          />
          <label   htlmfor="password">Пароль</label>
        </div>
         
          </div>
        </div>
        <div className="card-action">

        <button className="btn yellow darken-4" 
         style={{marginRight: 10}}
          // что бы заблокирват бтн или разблок
          disabled={loading}

         >
           Войти
           </button>

         <button className="btn grey lithen-1 black-text"
         // что бы заблокирват бтн или разблок
           disabled={loading}
            onClick={registerHandler}
            
         >
           Регистрация
           </button> 
          
        </div>
      </div>
   </div>
   </div>
 )
}
export default AuthPage