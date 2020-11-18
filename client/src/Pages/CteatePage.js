import React, {useState, useEffect, useContext} from 'react'
import {useHistory} from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import { useHttp } from '../hooks/http.hook'





function  CreatePage (){
  // получаем авторизация 
 const auth = useContext(AuthContext)
 // хук история
   const history = useHistory()
  const {request} = useHttp()
  const [link, setLink] = useState('')

// что бы убрать с импута ошибку обновить инпут 
useEffect(() => {
  window.M.updateTextFields()
}, [])

// fn для нажати enter
const pressHandler = async event => {
  if (event.key === 'Enter') {
    try {
      const data = await request('/api/link/generate', 'POST', {from: link}, {
        Authorization: `Bearer ${auth.token}`
      })
      // когда сделали сылку обрашаемся к хисори делаем редирек к айди делайл
      history.push(`/detail/${data.link._id}`)
    } catch (e) {}
  }
}
    return (
      <div className="row">
   <div className="col s8 offset-s2" style={{paddingTop: '2rem'}}>
   <div className="input-field ">
          <input placeholder="Вставьте ссылку" 
          id="link"
           type="text"
           value={link}
          onChange={e => setLink(e.target.value)}   
          // фн для отправка с нажати ентер
          onKeyPress={pressHandler}      
            />
          <label htlmfor="link">Введите ссылку</label>
          
        </div>
   </div>
      </div>
    )
}
export default CreatePage
