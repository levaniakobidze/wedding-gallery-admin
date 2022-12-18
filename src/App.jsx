import { useState } from 'react'
import './App.css'
import axios from 'axios';
import FileBase64 from 'react-file-base64';

function App() {
  const [file,setFile] = useState({url:''})

  const post = () => {
    axios.post('http://localhost:5000/',file)
  }


  return (
    <div className="App">
     <button onClick={post} >fetch</button>asdas
     <div >
      <FileBase64 type="file" multiple={false}
       onDone={({ base64 }) => setFile({url:base64})
       } />
       </div>
    </div>
  )
}

export default App
