import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import ActivityIndicator from "../utils/ActivityIndicator";
import { StateContext } from "../../context/StateContext";
import Loading from "../utils/Loading";

function Jobs(props) {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <div className="container mx-auto mb-10">
          <div className="w-full flex flex-wrap gap-y-2 gap-x-3 sm:mx-2">
            {props.data.searchResultJobs.map((job) => {
              return (
                <>
                  <button
                    key={job._id}
                    onClick={() => {
                      //handle click on job
                      const params = new URLSearchParams();
                      params.append("title", job.title);
                      params.append("type", "job-details");
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
            {props.data.location.isLoading ? (
              <Loading />
            ) : props.data.location.length > 0 &&
              props.data.searchResultJobs.length === 0 ? (
              <div className="w-full text-center">
                <p className="text-3xl">
                  No jobs found in {props.data.location}
                </p>
              </div>
            ) : (
              !props.data.location.isLoading && props.data.searchResultJobs.length === 0 && (
                <div className="w-full text-center">
                  <p className="text-3xl">
                    No jobs found for {props.data.query}
                  </p>
                </div>
              )
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default Jobs;
