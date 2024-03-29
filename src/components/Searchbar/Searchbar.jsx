// SearchBar.js (Child Component)
import  { useCallback, useState } from 'react';
import "./Searchbar.css"

const SearchBar = ({ onSearch }) => {
  const [term, setTerm] = useState('');
  const handleTermChange = useCallback((event) => {
    setTerm(event.target.value);
  },[])

  const search = useCallback(() => {
    onSearch(term)
  },[onSearch, term])
  return (
    <div className='SearchBar'>
      <input placeholder='Enter A Song Title' onChange={handleTermChange}/>
      <button className='SearchButton' onClick={search}>SEARCH</button>
    </div>
  )
};

export default SearchBar;

