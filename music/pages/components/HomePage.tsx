import axios from 'axios'
import React from 'react'
import { useEffect, useState } from 'react'
import ReactPlayer from 'react-player'

interface HomePageInterface {
    token: String, 
}

const HomePage: React.FC<HomePageInterface> = ({
    token, 
}) => {
  const [userData, setUserData] = useState("")
  const [songData, setSongData] = useState([])
  const [playlistData, setPlaylistData] = useState({})
  const [loading, setLoading] = useState("")
  const [currentPlayer, setCurrentPlayer] = useState(null)

  const startPlaying = (track) => {
    setCurrentPlayer(track)
  }

  const getPlaylistData = (playListArg) => { 
    axios.post("/api/getPlaylistData", {
      token: token,
      playlist_id: playListArg
     }).then(res => setPlaylistData(res.data.message)).catch(err => console.log(err)) 
  }
 
  useEffect(() => {  
    async function callAll() {
      try {
        let first = await axios.post("/api/fetchUserData", {
          token: token
        })   
        setUserData(first.data.message)
        setLoading("one")

        let second = await axios.post("/api/getSongData", {
            token: token
        })
        setSongData(second.data.message.items)
        setLoading("two")
 
        let third = await axios.post("/api/getPlaylistData", {
          token: token,
          playlist_id: second.data.message.items[0].id
        })
        setPlaylistData(third.data.message) 
        setLoading("two")

      } catch (err) {
        console.log("Something happened. Please try again later.")
      } finally {
        setLoading("three")
      }
    }
    callAll()
  }, [])

 
  

  const HandleLogOut = () => {
    localStorage.setItem("token", "")
    window.location.reload()
  }
  console.log(playlistData)
  return (
    <>  
    {loading == "one" ? (
      <div className='flex items-center justify-center h-screen text-5xl font-bold'>
        Loading Playlists
      </div>
    ) : loading == "two" ? (
      <div className='flex items-center justify-center h-screen text-5xl font-bold'>
        Loading Songs
      </div>
    ) : loading == "three" ? (
    <div className='flex flex-col items-center'>
        <header className='flex w-full justify-between p-6'>
          <h2 className='font-bold text-2xl'>Music</h2>
          <button onClick={HandleLogOut}>Log Out</button>
        </header>
        <div style={{border: "2px solid white", width: "98%"}}/>
        <div className='w-full flex flex-col p-6'>
          <h2 className='text-2xl'>Welcome {userData.display_name}!</h2>
          <div className='mt-4 font-bold'>
            <h2>Your Playlists</h2>
            <div className='cursor-pointer flex gap-5 mt-3' style={{overflow: "auto"}}>
              {songData.map((item, index) => (
                <div onClick={() => getPlaylistData(item.id)} className="flex items-center justify-center p-3" style={{backgroundColor: "white", color: "black", borderRadius: "20px", whiteSpace: "nowrap"}} key={index}>
                  {item.name}
                </div>
              ))}
            </div>
          </div>
          
        </div>
        <div style={{border: "2px solid white", width: "98%"}}/>
        <div className='w-full flex flex-col p-6'>
        <h2 className='text-2xl font-bold mb-6'>{playlistData.name}</h2>
        <h2 className='text-lg font-bold mb-5'>All Tracks</h2> 
        <div className='flex flex-col gap-5'>
          { 
          playlistData.tracks.items.map((item, index) => (
            <div className='flex gap-4 items-center' onClick={() => startPlaying(playlistData.tracks[index])}>
              <img style={{width: "50px", height: "50px", borderRadius: "10px"}} src={item.track.album.images[0].url} />
              {item.track.name}
            </div>
          )) 
          } 
        </div>
        </div>
        
    </div>
    ) : (
      <div className='flex items-center justify-center h-screen text-5xl font-bold'>
        Something happened. Please try again.
      </div>
    ) }
    </>  
  )
}

export default HomePage