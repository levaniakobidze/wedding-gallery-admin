import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import FileBase64 from "react-file-base64";

function App() {
  const [file, setFile] = useState({ url: "" });
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(false);

  const post = () => {
    if (file.url) {
      setLoading(true);
      axios.post("https://wedding-api-eo5d.onrender.com/", file).then(() => {
        setLoading(false);
        window.location.reload();
      });
    }
  };
  const deletePhoto = (id) => {
    setLoading(true);
    axios
      .delete(`https://wedding-api-eo5d.onrender.com/${id}`)
      .then(() => window.location.reload());
    // setLoading(false);
  };

  useEffect(() => {
    setLoading(true);
    axios
      .get("https://wedding-api-eo5d.onrender.com/")
      .then((res) => {
        setPhotos(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="App">
      <div className="add-new-photo-cont">
        <FileBase64
          className="filebase"
          type="file"
          multiple={false}
          onDone={({ base64 }) => setFile({ url: base64 })}
        />
        <button disabled={loading} onClick={post} type="submit">
          დაამატე ფოტო
        </button>
      </div>

      <div className="photosList">
        {loading && (
          <div className="load-cont">
            <div class="load"></div>
          </div>
        )}
        {photos &&
          photos.map((photo, index) => {
            return (
              <div className="photo-card">
                <img src={photo.url} alt="" />
                <button
                  disabled={loading}
                  onClick={() => deletePhoto(photo._id)}>
                  წაშალე ფოტო
                </button>
                {loading && (
                  <div className="load-cont">
                    <div class="load"></div>
                  </div>
                )}
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default App;
