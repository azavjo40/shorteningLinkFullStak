import React from 'react'
import {Switch, Route,  Redirect} from 'react-router-dom'
import LinksPage from './LinksPage'
import CreatePage from './CteatePage'
import DetailPage from './DetailPage'
import AuthPage from './AuthPage'
// roters 
export const  useRoutes = isAuthenticated =>{
    if(isAuthenticated){
   //если человек авторизован true  isAuthenticated то 
        return( 
        
 <Switch>
 <Route path="/links" exact>
         <LinksPage />
</Route>
  
<Route path="/create" exact>
    <CreatePage />
</Route>

<Route path="/detail/:id">
    <DetailPage />
</Route>

 <Redirect to="create" />
</Switch>

    )
    }
    // иначе другой router 
    return(
        <Switch>
      <Route>
          <AuthPage path="/" exact />
      </Route>
      <Redirect to="/" />
        </Switch>
    )
    }