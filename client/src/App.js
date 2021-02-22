import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { apiKey } from './secret.json'
import Photo from './components/Photo'

const baseUrl = 'https://api.nasa.gov/mars-photos/api/v1/'
const earthDate = '2021-2-16'

const App = () => {
  const [photos, setPhotos] = useState(null)

  useEffect(async () => {
    const data = await axios.get(
      `${baseUrl}rovers/curiosity/photos?earth_date=${earthDate}&api_key=${apiKey}`
    )
    // console.log('🚀 ~ file: App.js ~ line 16 ~ useEffect ~ data ', data)
    setPhotos(data.data.photos)
  }, [])
  return (
    <div className="App">
      <header className="App-header">
        <h1>Mars</h1>
        {photos &&
          photos.map((p) => (
            <Photo
              key={p.id}
              src={p.img_src}
              alt={`${p.rover.name} ${p.camera.full_name} ${p.earth_date}`}
            />
          ))}
      </header>
    </div>
  )
}

export default App
