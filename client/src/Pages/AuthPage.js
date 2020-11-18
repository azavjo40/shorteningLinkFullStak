import React, { useContext, useEffect, useState }   from 'react'
import { useHttp } from '../hooks/http.hook'
import { useMesaage } from '../hooks/message.hook'
import {AuthContext} from '../context/AuthContext'

function AuthPage (){
  //передаем Authcontext в useContext
const auth = useContext(AuthContext)
// import my hooks 
const message = useMesaage()
  const { request, loading, error, clearError} = useHttp()
  const [form, setForm] = useState({
    email: '', password: ''
  })
  
  //  следить за ошибка и отправляем пз
  useEffect(()=>{
  message(error)
  clearError()
  },[error,message, clearError])

// что бы убрать с импута ошибку обновить инпут 
  useEffect(() => {
    window.M.updateTextFields()
  }, [])
 
// фн для сбора поля 
const changeHandler = event =>{
  setForm({...form, [event.target.name]: event.target.value })
}
// fn register
const registerHandler = async () =>{
try{
const data = await request('/api/auth/register','POST', {...form})
  message(data.message)
 
}catch(e){}
}

// fn login
const loginHandler = async () =>{
  try{
  const data = await request('/api/auth/login','POST', {...form})
    //message(data.message)
   // передаем значения token userId  до context
    auth.login(data.token, data.userId)
   
  }catch(e){}
  }

 return(
   <div className="row">
   <div className="col s6 offset-s3">
    <h1 style={{fontSize: 30}}>Регистрация || Войти</h1>
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
           value={form.email}
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
           value={form.password}
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
         onClick={loginHandler}
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