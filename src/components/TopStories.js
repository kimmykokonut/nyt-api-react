import React, { useEffect, useReducer } from "react";
import topStoriesReducer from "../reducers/top-stories-reducer"; 
//import action creators
import { getTopStoriesFailure, getTopStoriesSuccess } from "../actions/index";
import userEvent from "@testing-library/user-event";

//create initial state for userReducer hook
const initialState = {
  isLoaded: false,
  topStories: [],
  error: null
};

const TopStories = () => {
  //usereducer is now managing the old useState stuff...
  // const [error, setError] = useState(null);
  // const [isLoaded, setIsLoaded] = useState(false);
  // const [topStories, setTopStories] = useState([]);
  //initialize useReducer hook
  const [state, dispatch] = useReducer(topStoriesReducer, initialState);

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
      // setTopStories(jsonifiedResponse.results)
      // setIsLoaded(true)
      // create action then dispatch it:
      const action = getTopStoriesSuccess(jsonifiedResponse.results)
      dispatch(action);
    })
    .catch((error) => {
      // setError(error.message)
      // setIsLoaded(true)
      //create action and dispatch:
      const action = getTopStoriesFailure(error.message)
      dispatch(action);
    });
  }, []) //bc empty array depend. hook will run 1x.
  //destructure from state var:
  const { error, isLoaded, topStories } = state;

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