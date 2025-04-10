import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ActivityIndicator from "../utils/ActivityIndicator";
import Loading from "../utils/Loading";

function Workers(props) {
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(props.data.isLoading);
    console.log(isLoading);
  }, [props.data.isLoading]);

  return (
    <>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <div className="container mx-auto mb-10 flex gap-4 flex-wrap">
          {props.data.searchResultWorkers.map((worker) => {
            return (
              <button
                onClick={() => {
                  const params = new URLSearchParams();
                  params.append("name", worker.user.name.toLowerCase());
                  params.append("id", worker._id);

                  navigate(`/worker?${params.toString()}`);
                }}
                className=" flex flex-col gap-2 w-72 items-center border border-stone-400 rounded cursor-pointer hover:bg-stone-100"
              >
                <div className="relative w-full">
                  <img
                    src={`http://localhost:2000/${worker.workerPicture}`}
                    alt=""
                    className="h-52 w-full border-b border-stone-400"
                  />
                  <img
                    src={`http://localhost:2000/${worker.user.picture}`}
                    alt="UP"
                    className="h-20 w-20 rounded-full absolute right-[36%] -bottom-10"
                  />
                </div>
                <strong className="font-bold mt-8"> {worker.user.name} </strong>
                <div className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="size-6 text-yellow-500"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  <p className="ms-2 text-sm font-bold text-black">
                    {worker.workerAnalytics.averageRating
                      .toString()
                      .slice(0, 3)}
                  </p>
                  <span className="w-1 h-1 mx-1.5 bg-black rounded-full"></span>
                  <p className="text-sm font-medium text-black">
                    ({worker.workerAnalytics.orderCompleted})
                  </p>
                </div>
                <p className="text-justify p-2">{worker.workerTagline}</p>
              </button>
            );
          })}
          {!isLoading && props.data.searchResultWorkers.length === 0 && (
            <div className="w-full text-center">
              <p className="text-3xl">
                {props.data.location.length > 0
                  ? `No workers found in ${props.data.location}`
                  : `No worker found for ${props.data.query}`}
              </p>
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default Workers;
