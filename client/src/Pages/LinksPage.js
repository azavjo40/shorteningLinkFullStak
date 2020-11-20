import React, {useCallback, useContext, useEffect, useState} from 'react'
import {useHttp} from '../hooks/http.hook'
import {AuthContext} from '../context/AuthContext'
import {Loader} from '../components/Loader'
import {LinksList} from '../components/LinksList'

export const LinksPage = () => {
  // тут будить наш общей все ссылки
  const [links, setLinks] = useState([])
// hooks http
  const {loading, request} = useHttp()
   //авторизация
  const {token} = useContext(AuthContext)
// фн для загрузка 
  const fetchLinks = useCallback(async () => {
    try {
      // запрос к база
      const fetched = await request('/api/link', 'GET', null, {
        Authorization: `Bearer ${token}`
      })
        // передаем в сетликс
      setLinks(fetched)
    } catch (e) {}
  }, [token, request])
// вызваем функцию
  useEffect(() => {
    fetchLinks()
  }, [fetchLinks])
 // если то loader
  if (loading) {
    return <Loader/>
  }

  return (
    <div className="center">
      {!loading && <LinksList links={links} />}
    
    </div>
  )
}
