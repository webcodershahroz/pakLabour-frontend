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
  const [location, setLocation] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [searchResultJobs, setSearchResultJobs] = useState([]);
  const [previousJobState, setPreviousJobState] = useState([]);
  const [searchResultWorkers, setSearchResultWorkers] = useState([]);
  const [previousWorkerState, setPreviousWorkerState] = useState([]);

  //function to get result of search query from mongodb
  const filterJobsAndWorkersByLocation = async (e) => {
    console.log(e.target.value);
    setLocation(e.target.value);
    console.log(e.target.value.length);
    if (e.target.value.length !== 0) {
      if (type === "jobs") {
        const filteredJobsByLocation = searchResultJobs.filter((job) =>
          job.location
            ?.trim()
            .toLowerCase()
            .includes(e.target.value?.trim().toLowerCase())
        );
        console.log(filteredJobsByLocation);
        setSearchResultJobs(filteredJobsByLocation);
      }
      if (type === "workers") {
        const filteredWorkersByLocation = searchResultWorkers.filter((worker) =>
          worker.workerLocation
            ?.trim()
            .toLowerCase()
            .includes(e.target.value?.trim().toLowerCase())
        );
        setSearchResultWorkers(filteredWorkersByLocation);
      }
    } else {
      if (type === "jobs") setSearchResultJobs(previousJobState);
      else setSearchResultWorkers(previousWorkerState);
    }
  };

  const handleClickOnJobOrWorker = (type) => {
    //handle search button click
    const params = new URLSearchParams();
    params.append("type", type);
    params.append("query", query);

    navigate(`/search?${params.toString()}`);
  };

  const getJobs = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`https://paklabour-backend.vercel.app/job/get-job?query=${query}`);
      const data = await res.json();
      if (Array.isArray(data)) {
        setSearchResultJobs(data);
        setPreviousJobState(data);
      } else {
        setSearchResultJobs([]);
        setPreviousJobState([]);
      }
    } catch (error) {
      console.error("Error fetching jobs:", error);
      setSearchResultJobs([]);
    } finally {
      setIsLoading(false);
    }
  };
  
  const getWorkers = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`https://paklabour-backend.vercel.app/worker/get-workers?query=${query}`);
      const data = await res.json();
      if (Array.isArray(data)) {
        setSearchResultWorkers(data);
        setPreviousWorkerState(data);
      } else {
        setSearchResultWorkers([]);
        setPreviousWorkerState([]);
      }
    } catch (error) {
      console.error("Error fetching workers:", error);
      setSearchResultWorkers([]);
    } finally {
      setIsLoading(false);
    }
  };
  
  

  useEffect(() => {
    const fetchData = async () => {
      if (type === "jobs") {
        await getJobs();
      } else if (type === "workers") {
        await getWorkers();
      }
    };
    fetchData();
  }, [query, type]);

  return (
    <>
      <div className="container mx-auto h-[fit-content] w-full my-5">
        <div>
          <strong className="font-bold text-3xl mb-7 block">
            Search results for {query}
          </strong>
        </div>
        <div className=" border-b flex justify-between border-gray mb-5">
          <div className="tab-header  flex gap-6 ">
            <button
              onClick={() => {
                handleClickOnJobOrWorker("jobs");
              }}
              className={`${
                type === "jobs" ? "underline" : ""
              } underline-offset-4 decoration-brandcolor decoration-4 hover:font-bold`}
            >
              Jobs
            </button>
            <button
              onClick={() => {
                handleClickOnJobOrWorker("workers");
              }}
              className={`${
                type === "workers" ? "underline" : ""
              } underline-offset-4 decoration-brandcolor decoration-4 hover:font-bold`}
            >
              Workers
            </button>
          </div>
          <div className="flex flex-column sm:flex-row flex-wrap space-y-4 sm:space-y-0 items-center justify-between pb-4">
            <label htmlFor="table-search" className="sr-only">
              Location
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 rtl:inset-r-0 rtl:right-0 flex items-center ps-3 pointer-events-none">
                <i className="fa-solid fa-magnifying-glass"></i>
              </div>
              <input
                value={location}
                onChange={(e) => {
                  filterJobsAndWorkersByLocation(e);
                }}
                type="text"
                id="location"
                className="block p-2 ps-10 text-sm border border-gray-800 rounded-lg w-80 outline-none "
                placeholder="Search by location"
              />
            </div>
          </div>
        </div>

        {type === "jobs" ? (
          <Jobs data={{ query, isLoading, location, searchResultJobs }} />
        ) : (
          <Workers data={{ query, isLoading, location, searchResultWorkers }} />
        )}
      </div>
    </>
  );
}

export default SearchResults;
