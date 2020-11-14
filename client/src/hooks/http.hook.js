// my hooks http fetch запрос к сервер
import { useState, useCallback} from "react"



export const useHttp = ()=>{
    // fn loading это что бы указать flse true для авторизация пользвателья 
    const {loading, setloading} = useState(false)
    // fn error пустой 
    const {error, setError} = useState(null)
    // fn запрось к сервер
const request = useCallback( async (url, method = 'GET', body = null, headers = {} ) =>{
// запускаем авторизация
setloading(true)
    try{
    // запрос в сервер 
const response = await fetch(url,{method, body, headers})
const data = await response.json()

//если не ок то ошибка
if(!response.ok){
    throw new Error(data.message ||' Что-то Пошло не так ')
}
// тут закнчваем 
setloading(false)

// иначе все хорошо  вернем data с сервера  
return data
}catch(e){
    setloading(false)
    setError(e.message)
    throw e
}

}, [])
// очиска error
const clearError = ()=> setError(null)
// возрашаем fn 
return { loading, request, error, clearError}
}