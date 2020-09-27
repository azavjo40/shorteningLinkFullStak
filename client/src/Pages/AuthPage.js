import React, {useState} from 'react'
//import  {Button} from 'react-bootstrap';
import { useHttp } from '../hooks/http.hook';


function AuthPage (){

  // импортируем наш hoos 
  const {loading, request} = useHttp()

  // работа с формам забераем всю форм для отправка 
  const [form, setForm] = useState({
    email: '', password: ''
  })

  // фунция обмен инпуть
  const changeHandler = event => {
    setForm({ ...form, [event.target.name]: event.target.value })
  }


  // функция запрос на сервер с помоши хуук
     const registerHandler = async ()=>{

      try{ 
        // тут передаем параметр фунция api адрес 
       const data = await request('http://localhost:5000/api/auth/register','POST',{...form})
       console.log('data',data)
      }catch(e){ console.log('error', e.message) }

     }
    return (
      <div className="formCon">
     <div >
        <h1>Сократи Ссылку</h1>
        <div >
          <div>
            <span>Авторизация</span>
            <div>

              <div >
                <input
                  placeholder="Введите email"
                  id="email"
                  type="text"
                  name="email"
                  className="yellow-input"
                  value={form.email}
                  onChange={changeHandler}
                />
                <label htmlFor="email">Email</label>
              </div>

              <div className="input-field">
                <input
                  placeholder="Введите пароль"
                  id="password"
                  type="password"
                  name="password"
                  className="yellow-input"
                  value={form.password}
                  onChange={changeHandler}
                />
                <label htmlFor="email">Пароль</label>
              </div>

            </div>
          </div>
          <div >
          <button
              style={{marginRight: 10}}
              disabled={loading}
             
            >
              Войти
            </button>

            <button
              onClick={registerHandler}
              disabled={loading}
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
