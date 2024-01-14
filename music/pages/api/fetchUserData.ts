import { NextApiRequest, NextApiResponse } from "next";
 

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        let accessToken = req.body.token

        const response = await fetch('https://api.spotify.com/v1/me', {
          headers: {
            Authorization: 'Bearer ' + accessToken
          }
        });
      
        const data = await response.json();

        res.status(200).json({ message: data })
    } catch (err) {
        res.status(500).json({message: "An error happened. Please try again."})
    }
}