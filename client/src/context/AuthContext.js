// передавать все фн авторизация и передать по все предложения  

import {createContext} from 'react'
// фн пустой 
function noop(){}

//создаем шаблон пустой  и создаем контекст 
export const AuthContext = createContext({
    token: null,
    userId: null,
    login: noop,
    logout:noop,
    isAuthenticated: false
})