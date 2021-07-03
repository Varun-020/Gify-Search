import React,{useState} from 'react';
import './App.css';

const GIPHY_API = "https://api.giphy.com/v1/gifs/search?api_key=m6kwV8ekcF41Y1OfPRNeIrxOf8S885NX&limit=5&offset=0&q="
function App() {
  const [search,setSearch] = useState('');
  const [loading,setLoading] = useState(false);
  const [error,setError] =useState("")
  const [gifs,setGifs] = useState([]);

  const gifSearch=()=>{
    setError("")
    setGifs([])

    if(search.length > 0){
      fetch(GIPHY_API+search).then((res)=>{
        setLoading(true);
        return res.json();
      }).then((result)=>{
        setLoading(false);
        console.log(result)
        setGifs(result.data.map((gif)=>{
          return gif.images.fixed_height.url;
        }))
      }).catch((err)=>{
        setLoading(false);
        alert('something went wrong');
      })
    }
    else{
      setError('Enter search term')
    }
  }
  return (
    <>
      <div className="header">
        <div className="group">
        <input type="text" placeholder="Search Gif" value={search} onChange={(e)=>setSearch(e.target.value)} />
        <button onClick={gifSearch}>Search</button>
        </div>
      </div>
      <div className="error">
      <p>{error}</p>
      </div>
      
      <div className="result">
      {loading ? <div className="loading">
          <div className="loader"></div>
        </div> : <div className="list">
          {gifs.map(gif=>{
            return (
            <div className="item">
                <img src={gif} alt="gif here" />
            </div>)  
          })}
        </div> }
      </div>
    </>
  );
}

export default App;
