import React from 'react'
import {useRoutes} from './routes'
import {BrowserRouter } from 'react-router-dom'




function App (){
  // тут подкулчаем наш раутер которие созали самый 
  const routes = useRoutes(false)
    return (
      <BrowserRouter>
      <div className="container">
      {routes}
      </div>
      </BrowserRouter>
    )
}

export default App
