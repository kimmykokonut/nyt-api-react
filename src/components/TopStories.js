import React, { useEffect, useState } from "react";
//info from NYT Top stories API
const TopStories = () => {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [topStories, setTopStories] = useState([]);

  useEffect(() => {
    fetch(`https://api.nytimes.com/svc/topstories/v2/home.json?api-key=${process.env.REACT_APP_API_KEY}`)
    .then(response => {
      if (!response.ok) {
        throw new Error(`${response.status}: ${response.statusText}`);
      } else {
        return response.json()
      }
    })
    .then((jsonifiedResponse) => {
      setTopStories(jsonifiedResponse.results)
      setIsLoaded(true)
    })
    .catch((error) => {
      setError(error.message)
      setIsLoaded(true)
    });
  }, []) //bc empty array depend. hook will run 1x.

  if (error) {
    return <h1>Error: {error}</h1>;
  } else if (!isLoaded) {
    return <h1>...Loading...</h1>;
  } else {
    return (
      <>
      <h1>Top Stories</h1>
      <ul>
          {topStories.map((article, index) => //where getting 'article'? basic. could give ea obj their own id to use as key
        <li key={index}>  
          <h3>{article.title}</h3>
          <p>{article.abstract}</p>
        </li>
        )}
      </ul>
      </>
    );
  }

}
export default TopStories;