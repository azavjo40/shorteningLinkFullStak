// hook для отправка собщения о ошибке в спливающей окней
import {useCallback} from 'react'


export const useMesaage = () => {
  return useCallback( text=>{
  // спрашиваем если в обек  window что то есть отправляем в спливаюшей окна 
  if(window.M && text) {
    window.M.toast({html: text})
  }
  },[]) 
}