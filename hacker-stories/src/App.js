import React from 'react';

const  App = () => {

  const stories = [
    {
      title: 'React',
      url: 'https:/reactjs.org',
      author: 'Jordan Walke',
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
  const [searchTerm, setSearchTerm] = React.useState('');

  // handler for when a search term is entered
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  // filter stories based on search term entered
  // in Search component
  const searchedStories = stories.filter((story) => {
    return story.title.toLowerCase().includes(searchTerm.toLowerCase());
  })

  return (
    <div>
      <h1>
        My Hacker Stories
      </h1>

      <Search onSearch={handleSearch} />

      <hr />

      {/* render the list here */}
      {/* and by the way: that's how you do comments in JSX */}

      <List list={searchedStories} />
    
    </div>
  );
}

// Search Component
const Search = (props) => {

  return (
    <div>
      {/* input label which has event handler defined in parent component */}
      <label htmlFor="search">Search: </label>
      <input id="search" type="text" onChange={props.onSearch} />
    </div>
  )
}


// List Component
const List = (props) => {
  return (
      <ul>
        {props.list.map((item) => {
          return (
            <Item key={item.objectID} item={item} />
          )          
        })}
      </ul>
  );
}

// List Item
const Item = (props) => {
  return (
    <li>
      <span>
        <a href={props.item.url}>{props.item.title}</a>
      </span>
      <span> {props.item.author}</span>
      <span> {props.item.num_comments}</span>
      <span> {props.item.points}</span>              
    </li>
  )
}

export default App;
