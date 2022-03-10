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
  const [searchTerm, setSearchTerm] = React.useState(localStorage.getItem('search') || 'React');

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

      <Search search={searchTerm} onSearch={handleSearch} />

      <hr />

      {/* render the list here */}
      {/* and by the way: that's how you do comments in JSX */}

      <List list={searchedStories} />
    
    </div>
  );
}

// Search Component
const Search = (props) => {

  // use object destructuring on props
  const { search, onSearch } = props;

  return (
    <div>
      {/* input label which has event handler defined in parent component */}
      <label htmlFor="search">Search: </label>
      <input id="search" type="text" value={search} onChange={onSearch} />
    </div>
  )
}


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

export default App;
