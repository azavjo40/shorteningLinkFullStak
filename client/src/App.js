import React from 'react'
import {BrowserRouter as Router} from 'react-router-dom'
import 'materialize-css'
import { useRoutes } from './Pages/routes'
import { useAuth } from './hooks/auth.hook'
import { AuthContext } from './context/AuthContext'
import {Navbar} from './components/Navbar'
import { Loader } from './components/Loader'


function App (){
  // експорт мой хук для авторизация локол стороч
  const {token, login, logout, userId, ready} = useAuth()
  // провепить true false зависить от токен передаем в rout
  const isAuthenticated  = !!token
  // передаем  isAuthenticated зависить от токен если правда то router будеть работать 
  const routes = useRoutes(isAuthenticated)

  // в случе ready false  если не опредлиле авторизация то мы возрашаем капм загруску  
  if(!ready){
    return <Loader />
  }
    return (
      <AuthContext.Provider value={{
        // передаем все хук авторизация 
        token, login, logout, userId, isAuthenticated
      }}>
        <Router>
      {isAuthenticated && <Navbar />}
      <div className="row  ">
     {routes}
      </div>
      </Router>
      </AuthContext.Provider>
    )
  
}


export default App
