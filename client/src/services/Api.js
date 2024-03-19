export const BASE_URL = 'http://localhost:3001/'

export default function LogoUrl (url){
    const imageURL = BASE_URL + url.substring(7)
    return imageURL
  }