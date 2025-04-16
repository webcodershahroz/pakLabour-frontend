import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import myPic from "../../img/profile-photo.jpg";
import ActivityIndicator from "../utils/ActivityIndicator";

function JobBids() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const jobTitle = searchParams.get("title");
  const idParam = searchParams.get("id");
  const [JobBids, setJobBids] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getJobBids = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`http://localhost:2000/apply/get-job-bids/${idParam}`);
      
      if (res.status === 200) {
        const data = await res.json();
        setJobBids(data.bids);
        console.log(data);
      } else {
        console.error("Failed to fetch job bids. Status:", res.status);
      }
    } catch (error) {
      console.error("Error fetching job bids:", error.message);
    } finally {
      setIsLoading(false);
    }
  };
  

  useEffect(() => {
    getJobBids();
  }, []);
  return (
    <>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <div className="container mx-auto h-fit my-4">
          <h1 className="font-bold text-3xl my-6">{jobTitle}</h1>
          {JobBids.map((bid) => {
            return (
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => {
                    const params = new URLSearchParams();
                    params.append("name", bid.user.name);
                    params.append("id", bid.pid);

                    navigate(`/worker?${params.toString()}`);
                  }}
                  className="flex flex-col p-5 hover:bg-stone-100 cursor-pointer rounded border border-stone-400 xl:w-[49%] h-fit"
                >
                  <div className="flex gap-3">
                    <img
                      src={`http://localhost:2000/${bid.user.picture}`}
                      height={100}
                      width={100}
                      alt=""
                    />
                    <div className="flex flex-col items-start">
                      <p className="text-sm text-gray-600">
                        {bid.workerLocation}
                      </p>
                      <strong className="text-2xl font-medium text-gray-700">
                        {bid.user.name}
                      </strong>
                      <span className="text-gray-500 font-bold">
                        PKR {bid.jobPrice}
                        <span className="text-sm font-normal">
                          {" "}in{" "}
                          {bid.jobDuration == 1
                            ? bid.jobDuration + " day"
                            : bid.jobDuration + " days"}
                        </span>
                      </span>
                      <div className="flex">
                        <span className=" w-[fit-content] rounded-full py-1 mr-3 text-gray-700">
                          <strong>{bid.jobCategory} </strong>
                        </span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <p className="text-justify my-4">{bid.jobDescription}</p>
                  </div>
                </button>
              </div>
            );
          })}
          {!isLoading && JobBids.length === 0 && (
            <div className="w-full text-center mt-4">
              <p className="text-3xl">No Biddings yet</p>
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default JobBids;
