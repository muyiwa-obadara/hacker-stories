import React, { useCallback, useEffect, useReducer, useState } from "react";
import axios from "axios";

import {StyledContainer, StyledHeadlinePrimary} from "../styles/Styles";
import SearchForm from "./SearchForm";
import List from "./List";

const API_ENDPOINT = "https://hn.algolia.com/api/v1/search?query=";

function storiesReducer(state, action) {
  switch (action.type) {
    case "STORIES_FETCH_INIT":
      return {
        ...state,
        isLoading: true,
        isError: false,
      }
    case "STORIES_FETCH_SUCCESS":
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload
      }
    case "STORIES_FETCH_FAILURE":
      return {
        ...state,
        isLoading: false,
        isError: true,
      }
      case "REMOVE_STORY":
        return {
          ...state,
          data: state.data.filter(
          story => action.payload.objectID !== story.objectID
          ),
        };
      default:
        throw new Error();
  }      
}

function useSemiPersistentState(key, initialState){
  const [value, setValue] = useState(localStorage.getItem(key) || initialState);
  useEffect(function(){
    localStorage.setItem(key, value);
  }, [value, key]);
  return [value, setValue];
}


function App() {  
  const [stories, dispatchStories] = useReducer(storiesReducer, {data: [], isLoading: false, isError: false});
  const [searchTerm, setSearchTerm] = useSemiPersistentState("search", "React");
  const [url, setUrl] = useState(`${ API_ENDPOINT }${ searchTerm }`);

  function handleSearchInput(event){
    setSearchTerm(event.target.value);
  }

  function handleSearchSubmit(event) {
    setUrl(`${ API_ENDPOINT }${ searchTerm }`);
    event.preventDefault(); 
  }

  const handleFetchStories = useCallback(async () => {
    dispatchStories({ type: "STORIES_FETCH_INIT" });
    try {
      const result = await axios.get(url);
      dispatchStories({
      type: "STORIES_FETCH_SUCCESS",
      payload: result.data.hits,
    });
    }catch{
      dispatchStories({
        type: "STORIES_FETCH_FAILURE",
      });
    }
  }, [url]);

  useEffect(() => {
    handleFetchStories();
  }, [handleFetchStories])
    
  function handleRemoveStory(item){
    dispatchStories({
      type: "REMOVE_STORY",
      payload: item,
    });
  }
    
  return (
    <StyledContainer>
      <StyledHeadlinePrimary>My Hacker Stories</StyledHeadlinePrimary>
      <SearchForm
        searchTerm={ searchTerm}
        onSearchInput={ handleSearchInput }
        onSearchSubmit={ handleSearchSubmit }
      />
      <br/>
      {stories.isError && <p>Something went wrong . . .</p>}
      {stories.isLoading ? (<p>Loading . . .</p>) : (<List list={ stories.data } onRemoveItem={ handleRemoveStory }/>)}
    </StyledContainer>
  );
}

export default App; 