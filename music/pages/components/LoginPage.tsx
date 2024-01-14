import React from 'react'
import { useEffect, useState } from 'react'

interface LoginPageInterface {
    clientID: String,
    redirectURI: String,
    authEndpoint: String,
    responseType: String
}

const LoginPage: React.FC<LoginPageInterface> = ({
    clientID,
    redirectURI,
    authEndpoint,
    responseType
}) => {
  const [token, setToken] = useState("")

  useEffect(() => {
    const hash = window.location.hash ?? ""
    let token = window.localStorage.getItem("token") || undefined

    if (!token && hash) {
        token = hash.substring(1).split("&").find(el => el.startsWith("access_token"))?.split("=")[1]

        window.location.hash = ""
        window.localStorage.setItem("token", token ?? "")
    }

    setToken(token ?? "")
  }, [])
  return (
    <div className='flex h-screen w-full items-center' style={{paddingLeft: "15%"}}>
        <div className='flex flex-col gap-5'>
        <div className='flex flex-col gap-4'>
            <h2 className='text-5xl'>Welcome to Music</h2>
            <h2 className='text-xl'>Log in to listen to the songs you enjoy</h2>
        </div>
         <a style={{width: "200px", height: "40px", borderRadius: "20px", fontWeight: "bold", backgroundColor: "green"}} className="flex flex-col items-center justify-center" href={`${authEndpoint}?client_id=${clientID}&redirect_uri=${redirectURI}&response_type=${responseType}&scope=user-read-private playlist-read-private`}>Log In</a>
         </div>
    </div>
  )
}

export default LoginPage