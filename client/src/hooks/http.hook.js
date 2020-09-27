
import {useState, useCallback} from 'react'


// собстный hook наш 
export const useHttp = () => {
     // loading 
  const [loading, setLoading] = useState(false)
   // error
  const [error, setError] = useState(null)

    // функция для запрос на сервер параметри укажем потом 
  const request = useCallback(async (url, method = 'GET', body = null, headers = {}) => {
       // тут будить запрос на сервер

     // чтобы загрузился
    setLoading(true)
    try {

     //если есть бодий то отправлаем json
      if (body) {
        body = JSON.stringify(body)
        headers['Content-Type'] = 'application/json'
      }

      const response = await fetch(url, {method, body, headers})
       // сделали формать json
      const data = await response.json()

       // если в поль не все ок то 
      if (!response.ok) {
        throw new Error(data.message || 'Что-то пошло не так')
      }

       //заканчиваем загруску 
      setLoading(false)

      return data
    } catch (e) {
           //заканчиваем загруску 
      setLoading(false)

      // если ошибка то отправлаем и выкидваем
      setError(e.message)
      throw e
    }

      // тут будить зависимость напримерь если внутри будить функция
  }, [])

  // функция очиска error
  const clearError = useCallback(() => setError(null), [])

  // возрашаем их 
  return { loading, request, error, clearError }
}



