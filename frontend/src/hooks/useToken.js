import { useEffect, useState } from "react"


export default function useToken() {
 const [token, setToken] = useState(localStorage.getItem('token') || '')

 useEffect(()=>{
    if(!token){
        localStorage.removeItem(token)
    }else{
        localStorage.setItem('token',token)
    }
 }, [token])
 return [token, setToken]
}
