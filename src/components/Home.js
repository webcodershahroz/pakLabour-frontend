import React, { useContext, useEffect } from "react";
import { StateContext } from "../context/StateContext";
import { Link, useLocation, useNavigate } from "react-router-dom";
function Home() {
  const { searchQuery, setSearchQuery } = useContext(StateContext);
  const navigate = useNavigate();

  return (
    <div className="h-[70vh] mb-14 mt-10">
      <div
        className={`h-[24rem] w-11/12 bg-brandcolor m-auto rounded-3xl flex flex-col items-center justify-center bg-gradient-to-r from-brandcolor from-10% via-emerald-400 via-30% to-emerald-500 to-90% drop-shadow-lg gap-y-14 p-5 mb-20 `}
      >
        <div>
          <h1 className="text-white text-7xl font-bold text-center">
            Search for work here
          </h1>
        </div>
        <div className="w-8/12 flex relative items-center">
          <input
            type="text"
            className="h-14 w-full outline-none px-2 rounded shadow-md"
            placeholder="Search work"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button
            onClick={() => {
              //handle search button click
              const params = new URLSearchParams();
              params.append("type", 'jobs');
              params.append("query", searchQuery);

              navigate(`/search?${params.toString()}`);
            }}
            className={`absolute right-0 top-0 bottom-0 px-3 bg-black text-white h-full rounded-r font-bold flex items-center justify-center ${searchQuery.length===0?'pointer-events-none':''}`}
          >
            Search
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;
