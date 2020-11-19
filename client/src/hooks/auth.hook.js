// my hooks для авторизация человека  либо войти в систему либо выйти
import {useCallback, useEffect, useState} from 'react'

const stotageName = 'userData'
export const useAuth = () => {
    // token 
const [token, setToken] = useState(null)

// для того что бы обновлять token ready
const [ready, setReady] = useState(false)

//userID
const [userId, setUserId] = useState(null)
// фн для войти 
const login = useCallback((jwtToken, id)=>{
    setToken(jwtToken)
    setUserId(id)
    //запис в локолстороч
    localStorage.setItem(stotageName, JSON.stringify({
        userId:id , token: jwtToken
    }))
},[])

// фн выйти
const logout = useCallback(()=>{
   // очистить поля userId token
    setToken(null)
    setUserId(null)
     // очистит локолстороч
      localStorage.removeItem(stotageName)
},[])
// смотрить сам грузить даний 
useEffect(()=>{
    // получаем даний с локолстороч
    const  data = JSON.parse(localStorage.getItem(stotageName))
    //проверяем если передаем  token  userId в login
    if(data && data.token){
     login(data.token, data.userId)
    }
    setReady(true)
},[login])
// експорт 
return {login, logout, token, userId,ready}

}