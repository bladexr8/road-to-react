import React from 'react';
import axios from 'axios';

// API Endpoint for Hacker News Stories
const API_ENDPOINT = 'https://hn.algolia.com/api/v1/search?query=';

// Top Level App Component
const  App = () => {

  // initial list of stories
  const initialStories = [
    {
      title: 'React',
      url: 'https:/reactjs.org',
      author: 'Jordan Walker',
      num_comments: 3,
      points: 4,
      objectID: 0,
    },
    {
      title: 'Redux',
      url: 'https:/redux.js.org',
      author: 'Dan Abramov, Andrew Clark',
      num_comments: 2,
      points: 5,
      objectID: 1,
    },
  
  ];

  // state property and setter function
  // using React useState() hook
  const [searchTerm, setSearchTerm] = React.useState(localStorage.getItem('search') || 'React');

  // reducer for stories state (useReducer Hook)
  const storiesReducer = (state, action) => {
    switch (action.type) {
      case 'STORIES_FETCH_INIT':
        return {
          ...state,
          isLoading: true,
          isError: false,
        };
      case 'STORIES_FETCH_SUCCESS':
        return {
          ...state,
          isLoading: false,
          isError: false,
          data: action.payload,
        };
      case 'STORIES_FETCH_FAILURE':
        return {
          ...state,
          isLoading: false,
          isError: true,
        }
      default:
        throw new Error();
    }
  }

  // stories to render using state
  const [stories, dispatchStories] = React.useReducer(
    storiesReducer, 
    { data: [], isLoading: false, isError: false }
  );

  // memoized handler (useCallback hook)
  const handleFetchStories = React.useCallback(async () => {
    if (!searchTerm) return;

    dispatchStories({ type: 'STORIES_FETCH_INIT' });

    try {
      const result = await axios.get(`${API_ENDPOINT}${searchTerm}`)

      dispatchStories({
        type: 'STORIES_FETCH_SUCCESS',
        payload: result.data.hits,
      });
    } catch {
      dispatchStories({ type: 'STORIES_FETCH_FAILURE' });
    }

  }, [searchTerm]);

  // async data load
  React.useEffect(() => {
    handleFetchStories();    
  },[handleFetchStories]);


  // React useEffect hook to persist last
  // entered search term to local browser
  // storage
  // first argument is a function to run side-effect
  // second argument is a dependency array of variables
  // i.e. if one of these variables changes the side-effect
  // function is run
  React.useEffect(() => {
    // persist to local browser storage
    localStorage.setItem('search', searchTerm);
  }, [searchTerm]);

  // handler for when a search term is entered
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div>
      <h1>
        My Hacker Stories
      </h1>

      <InputWithLabel 
        id="search"
        label="Search"
        value={searchTerm} 
        onInputChange={handleSearch} />

      <hr />

      {/* render the list here */}
      {/* and by the way: that's how you do comments in JSX */}

      {stories.isError && <p>Something went wrong...</p>}

      {stories.isLoading ? (
        <p>Loading...</p>
      ) : (
        <List list={stories.data} />
      )}

    </div>
  );
}

/*********************************************************************************** */

// Search Component
const InputWithLabel = ({ id, label, value, type = 'text', onInputChange }) => {

  // return a React Fragment
  return (
    <>
      {/* input label which has event handler defined in parent component */}
      <label htmlFor={id}>{label} </label>
      &nbsp;
      <input id={id} 
        type={type} 
        value={value} 
        onChange={onInputChange} />
    </>
  )
}

/*********************************************************************************** */

// List Component
// use object destructuring in
// function signature
// note use of spread operator
// to pass item values
const List = ({ list }) => {
  return (
      <ul>
        {list.map((item) => {
          return (
            <Item key={item.objectID} {...item} />
          )          
        })}
      </ul>
  );
}

/*********************************************************************************** */

// List Item
// note object destructuring in function
// signature
const Item = ({ title, url, author, num_comments, points}) => {
  return (
    <li>
      <span>
        <a href={url}>{title}</a>
      </span>
      <span> {author}</span>
      <span> {num_comments}</span>
      <span> {points}</span>              
    </li>
  )
}

/*********************************************************************************** */

export default App;
