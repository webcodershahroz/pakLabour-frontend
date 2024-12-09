import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { StateContext } from "../context/StateContext";
import Loading from "./utils/Loading";
import Jobs from './jobsScreen/Jobs'
import Workers from './workersScreen/Workers'

function SearchResults() {
  const { query, type } = useParams();
  const [isLoading,setIsLoading] =  useState(false);
  //function to get result of search query from mongodb
  const getSearchResults = ()=>{
    
  }

  return (
    <>
      <div className="container mx-auto h-[fit-content] w-full mb-5">
        <div>
          <strong className="font-bold text-3xl mb-7 block">
            Search results for {query}
          </strong>
        </div>
        <div className="tab-header flex gap-6 border-b border-gray mb-5">
          <Link
            to={`/search/jobs/${query}`}
            className={`${
              type === "jobs" ? "underline" : ""
            } underline-offset-4 decoration-brandcolor decoration-4 hover:font-bold`}
          >
            Jobs
          </Link>
          <Link
            to={`/search/workers/${query}`}
            className={`${
              type === "workers" ? "underline" : ""
            } underline-offset-4 decoration-brandcolor decoration-4 hover:font-bold`}
          >
            Workers
          </Link>
        </div>
        {isLoading ? <Loading/> : type==='jobs'? <Jobs/> :<Workers/>}
      </div>
    </>
  );
}

export default SearchResults;
