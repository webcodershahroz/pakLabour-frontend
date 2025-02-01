import React, { useContext, useEffect, useState } from "react";
import {
  Link,
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { StateContext } from "../context/StateContext";
import Loading from "./utils/Loading";
import Jobs from "./jobsScreen/Jobs";
import Workers from "./workersScreen/Workers";

function SearchResults() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query");
  const type = searchParams.get("type");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  
  //function to get result of search query from mongodb
  const getSearchResults = () => {};

  const handleClickOnJobOrWorker = (type) => {
    //handle search button click
    const params = new URLSearchParams();
    params.append("type", type);
    params.append("query", query);

    navigate(`/search?${params.toString()}`);
  };

  return (
    <>
      <div className="container mx-auto h-[fit-content] w-full mb-5">
        <div>
          <strong className="font-bold text-3xl mb-7 block">
            Search results for {query}
          </strong>
        </div>
        <div className="tab-header flex gap-6 border-b border-gray mb-5">
          <button
            to={`/search/jobs/${query}`}
            onClick={() => {handleClickOnJobOrWorker('jobs')}}
            className={`${
              type === "jobs" ? "underline" : ""
            } underline-offset-4 decoration-brandcolor decoration-4 hover:font-bold`}
          >
            Jobs
          </button>
          <button
            onClick={() => {handleClickOnJobOrWorker('workers')}}
            className={`${
              type === "workers" ? "underline" : ""
            } underline-offset-4 decoration-brandcolor decoration-4 hover:font-bold`}
          >
            Workers
          </button>
        </div>
        {isLoading ? (
          <Loading />
        ) : type === "jobs" ? (
          <Jobs query={query} />
        ) : (
          <Workers />
        )}
      </div>
    </>
  );
}

export default SearchResults;
