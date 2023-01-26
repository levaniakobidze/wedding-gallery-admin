import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios';
import FileBase64 from 'react-file-base64';

function App() {
  const [file,setFile] = useState({url:''})
  const [photos, setPhotos] = useState([])

  const post = () => {
    axios.post('https://wedding-api-eo5d.onrender.com/',file).then(() => window.location.reload())
  }
  const deletePhoto = (id) => {
      axios.delete(`https://wedding-api-eo5d.onrender.com/${id}`).then(() => window.location.reload())
  }


  useEffect(() => {
    axios.get('https://wedding-api-eo5d.onrender.com/').then((res) => {
      setPhotos(res.data)
    }).catch((err) => {
      console.log(err);
    })
  },[])
  
  return (
    <div className="App">
     <div className='add-new-photo-cont' >
      <FileBase64 className='filebase' type="file" multiple={false}
       onDone={({ base64 }) => setFile({url:base64})
      } />
      <button onClick={post} type='submit' >დაამატე ფოტო</button>
       </div>
       <div className='photosList'>
          {
           photos && photos.map((photo,index) => {
              return (
                <div className='photo-card'>
                <img src={photo.url} alt="" />
                <button onClick={() => deletePhoto(photo._id)}>წაშალე ფოტო</button>
            </div>
              )
            })
          }
       
       </div>
    </div>
  )
}

export default App
