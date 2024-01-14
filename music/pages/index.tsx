import { useEffect, useState } from "react"
import LoginPage from "./components/LoginPage"
import HomePage from "./components/HomePage"

export default function Home() {
  const CLIENT_ID = "b2e7f35b30814a369e02eeefb9154735"
  const REDIRECT_URI = "http://localhost:3000"
  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize"
  const RESPONSE_TYPE = "token"

  const [token, setToken] = useState("")

  useEffect(() => {
    const token = localStorage.getItem("token")

    if (token != null || token != "") {
      setToken(token ?? "")
    } else {
      setToken("")
    }
  }, [])

  console.log(token)
  return (
    <div>
    {token != "" ? 
      <HomePage token={token}/>
      :
      <LoginPage clientID={CLIENT_ID} redirectURI={REDIRECT_URI} authEndpoint={AUTH_ENDPOINT} responseType={RESPONSE_TYPE}/>
    }
    </div>
  )
}
