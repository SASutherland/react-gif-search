import React, { useEffect, useState } from "react";
import axios from "axios";
import SearchForm from "./Components/SearchForm";
import GifList from "./Components/GifList";

function App() {
  const [gifs, setGifs] = useState([]);
  const [query, setQuery] = useState("panda");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // activeFetch ensures the latest query is fetched. It is set to false after each query.
    setLoading(true);
    let activeFetch = true;

    axios.get(`https://api.giphy.com/v1/gifs/search?api_key=gm1dfkC7reinIgvyjRaxYMLm2IwjvFjw&q=${query}&limit=24&rating=g`)
      .then(response => {
        if (activeFetch) {
          setGifs(response.data.data);
          setLoading(false);
        }
      })
      .catch(error => {console.log("Error fetching and parsing data", error)})

    // FETCHING WITHOUT AXIOS:

    // fetch("https://api.giphy.com/v1/gifs/trending?api_key=gm1dfkC7reinIgvyjRaxYMLm2IwjvFjw&limit=24&rating=g")
    //   .then(response => response.json())
    //   .then(responseData => setGifs(responseData.data))
    //   .catch(error => console.log("Error fetching and parsing data", error));

    return () => {activeFetch = false}
  }, [query]);

  const handleQueryChange = searchText => {
    setQuery(searchText);
  };

  return (
    <div>
      <div className="main-header">
        <div className="inner">
          <h1 className="main-title">Shawn - GifSearch</h1>
          <SearchForm changeQuery={handleQueryChange} />
        </div>
      </div>
      <div className="main-content">
        {
          (loading)
          ? <p>Loading...</p>
          : <GifList data={gifs} />
        }
      </div>
    </div>
  );
}

export default App;
