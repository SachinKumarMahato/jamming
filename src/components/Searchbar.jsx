function Searchbar  ()  {
  return (
    <>
      <div className="flex flex-col justify-center items-center gap-4 my-12">
        <label htmlFor="search">
          <input 
          type="text" 
          id="search"
          placeholder="enter a song title"
          className="capitalize border-2 border-gray-500 max-h-20"
          />
        </label>
        <button type="button">search</button>
      </div>
    </>
  )
}

export default Searchbar;