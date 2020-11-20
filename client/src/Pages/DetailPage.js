import React, { useCallback, useContext, useEffect, useState } from 'react'
import {useParams} from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import {useHttp} from '../hooks/http.hook'
import {Loader} from '../components/Loader'
import { LinkCard } from '../components/LinkCard'


function DetailPage (){
  // получаем токен авторизация 
  const {token} = useContext(AuthContext)
// useHttp 
const {request, loading} = useHttp()

  // hook для сылк то что получем с бкн
  const [link, setLink] = useState(null)
  // это хук для получения по id сылку самий назвали в router id 
  const linkId = useParams().id

  // загрузить ссылку 
  const getLink = useCallback( async()=>{
try{
// запрос к база
  const feched = await request(`/api/link/${linkId}`, 'GET', null, {
    Authorization: `Bearer ${token}`
   })
   // передаем сылки 
   setLink(feched)
}catch(e){}
  },[token, linkId, request])
  // когда у нас будеть готов компонент то делаем запрось 
  useEffect(()=>{
    getLink()
  },[getLink])

  // тепер проверяем если loading true то возрашаем <Loader
     if(loading){
       return <Loader />
     }

     return (
       // если loading false и link то возрашаем linkCard передаем в пропс link
      <div className="container">
      
        { !loading && link && <LinkCard link={link} /> } 
       
      </div>
    )
}
export default DetailPage
