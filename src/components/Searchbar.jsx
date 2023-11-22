import { useState, useCallback } from "react";

function Searchbar  (props)  {
  const [term, setTerm] = useState("")

  const handleTermChange = useCallback((event) => {
    setTerm(event.target.value);
  },[])
  return (
    <>
      <div className="flex flex-col justify-center items-center gap-4 py-16">
        <label htmlFor="search">
          <input 
          type="text" 
          id="search"
          placeholder="enter a song title"
          onChange={handleTermChange}
          className="capitalize border-2 border-gray-500 inline-block min-h-[2.5rem] min-w-[15rem]"
          />
        </label>
        <button
        type="button"
        className="
        bg-black
        text-white
        py-3
        px-12
        rounded-full
        hover:bg-white hover:text-black
        "
        >search</button>
      </div>
    </>
  )
}

export default Searchbar;