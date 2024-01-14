import { NextApiRequest, NextApiResponse } from "next";
 

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        let accessToken = req.body.token
        let playlist_id = req.body.playlist_id
        const response = await fetch(`https://api.spotify.com/v1/playlists/${playlist_id}`, {
          headers: {
            Authorization: 'Bearer ' + accessToken + " user-read-private"
            
          }
        });
      
        const data = await response.json();

        res.status(200).json({ message: data })
    } catch (err) {
        res.status(500).json({message: "An error happened. Please try again."})
    }
}