import React from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import AuthPage from './Pages/AuthPage';
import DetailPage from './Pages/DetailPage';
import LinksPage from './Pages/LinksPage';
import CreatePage from './Pages/CteatePage';



export const useRoutes = isAuthenticated =>{
    //если правда то показьваем 
if(isAuthenticated){
    return(
        <Switch>
      <Route path="/links" exact>
          <LinksPage />
          </Route>
          <Route path="/create" exact>
          <CreatePage />
      </Route >
      <Route path="/detail">
      <DetailPage />
      </Route>
     
      <Redirect to="/create" />
  </Switch>
   //если нет такая страница то отправлаем
    )
}
return(
  <Switch>
      <Route path="/" exact>
      <AuthPage />
      </Route>
     
      <Redirect to="/" />
  </Switch>
   //если нет такая страница то отправлаем
)
}