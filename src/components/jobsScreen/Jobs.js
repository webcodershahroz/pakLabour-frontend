import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Loading from "../utils/Loading";

function Jobs(props) {
  const [SearchResultJobs, setSearchResultJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate= useNavigate();

  //function to get the jobs
  const getJobs = async () => {
    setIsLoading(true);
    try {
      fetch(`http://localhost:2000/job/get-job`).then(async (res) => {
        const data = await res.json();
        setSearchResultJobs(data);
        setIsLoading(false);
      });
    } catch (error) {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    //function call to getJobs
    const callGetJobs = async () => {
      await getJobs();
    };

    callGetJobs();
  }, []);
  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="container mx-auto mb-10">
          <div className="w-full flex flex-wrap gap-y-2 gap-x-3 sm:mx-2">
            {SearchResultJobs.map((job) => {
              return (
                <>
                  <button
                    key={job._id}
                    onClick={() => {
                      //handle click on job
                      const params = new URLSearchParams();
                      params.append("title", job.title);
                      params.append("type", 'job-details');
                      params.append("id", job._id);

                      navigate(`/job?${params.toString()}`);
                    }}
                    className="flex flex-col gap-3 p-5 hover:bg-stone-100 cursor-pointer rounded border border-stone-400 xl:w-[49%] text-left"
                  >
                    <p className="text-sm text-gray-600">
                      Posted on {job.createdAt.slice(0, 10)}
                    </p>
                    <strong className="w-1/2 text-xl font-medium text-gray-600">
                      {job.title}
                    </strong>
                    <span className="bg-stone-200 w-[fit-content] rounded-full px-2 text-gray-700">
                      <strong>Price: </strong>PKR {job.price}
                    </span>
                    <p>{job.description}</p>
                    <div>
                      {JSON.parse(job.searchTags).map((tag) => {
                        return (
                          <span className="bg-stone-200 w-[fit-content] rounded-full px-3 py-1 mr-3 text-gray-700">
                            <strong>{tag}</strong>
                          </span>
                        );
                      })}
                    </div>
                  </button>
                </>
              );
            })}
            {SearchResultJobs.length === 0  &&(
              <div className="w-full text-center">
                <p className="text-3xl">No jobs found for {props.query}</p>
              </div>
            )} 
          </div>
        </div>
      )}
    </>
  );
}

export default Jobs;
