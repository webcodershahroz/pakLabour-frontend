import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import JobBids from "./JobBids";
import { StateContext } from "../../context/StateContext";

function JobsDetail() {
  const [searchParams] = useSearchParams();
  const [jobDetails, setJobDetails] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const titleParam = searchParams.get("title");
  const idParam = searchParams.get("id");
  const typeParam = searchParams.get("type");
  const navigate = useNavigate();
  const { isUserLoggedIn, decodeJwtToken } = useContext(StateContext);
  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    type: "",
  });

  const handleClickOnJobOrBids = (type) => {
    //handle search button click
    const params = new URLSearchParams();
    params.append("title", titleParam);
    params.append("type", type);
    params.append("id", idParam);

    navigate(`/job?${params.toString()}`);
  };

  const getJobDetails = () => {
    setIsLoading(true);
    try {
      fetch(`http://localhost:2000/job/get-job/${idParam}`).then(
        async (res) => {
          if (res.status === 200) {
            const data = await res.json();
            console.log(data);
            setJobDetails(data.jobs[0]);
          }
          
          setIsLoading(false);
        }
      );
    } catch (error) {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isUserLoggedIn()) {
      setUserDetails(decodeJwtToken());
      getJobDetails();
    }
  }, []);

  return (
    <>
      {jobDetails && jobDetails.user && (
        <>
          <div className="container mx-auto h-[fit-content] w-full mt-8 mb-2">
            <div className="tab-header flex gap-6 border-b border-gray">
              <button
                onClick={() => {
                  handleClickOnJobOrBids("job-details");
                }}
                className={`${
                  typeParam === "job-details" ? "underline" : ""
                } underline-offset-4 decoration-brandcolor decoration-4 hover:font-bold`}
              >
                Job details
              </button>
              <button
                onClick={() => {
                  handleClickOnJobOrBids("job-bids");
                }}
                className={`${
                  typeParam === "job-bids" ? "underline" : ""
                } underline-offset-4 decoration-brandcolor decoration-4 hover:font-bold`}
              >
                Bids
              </button>
            </div>
          </div>
          {typeParam === "job-details" ? (
            <>
              <div class="container mx-auto px-4 py-8">
                <div className="text-md mb-2 flex gap-2 ">
                  <span className="font-bold">Categories: </span>
                  <div>
                    {jobDetails.searchTags &&
                      JSON.parse(jobDetails.searchTags).map((tag, index) => {
                        return (
                          <span>
                            {index ===
                            JSON.parse(jobDetails.searchTags).length - 1
                              ? tag
                              : tag + ", "}
                          </span>
                        );
                      })}
                  </div>
                </div>
                <div class="flex flex-wrap -mx-4">
                  <div class="md:w-3/4 px-4">
                    <h2 class="text-3xl font-bold mb-2">
                      {jobDetails.tagLine}
                    </h2>
                    <div>
                      <h2 className="font-bold text-gray-600">
                        About the job:
                      </h2>
                      <p class="text-gray-700 text-justify">
                        {jobDetails.description}
                      </p>
                    </div>
                    <div className="border px-10 py-5 rounded-lg w-fit my-3">
                      <h2 className="font-bold text-gray-600">Price:</h2>
                      <p class="text-gray-700 text-justify">
                        PKR {jobDetails.price}
                      </p>
                    </div>
                    {isUserLoggedIn() && userDetails.type === "worker" ? (
                      <button
                        onClick={() => {
                          const params = new URLSearchParams();
                          params.append("title", "Job title");
                          params.append("id", "4935kafjl2hda23");

                          navigate(`/apply-now?${params.toString()}`);
                        }}
                        type="button"
                        class="text-white bg-black  font-medium rounded-lg px-5 py-2.5 me-2"
                      >
                        Apply now
                      </button>
                    ) : (
                      <p>
                        <span className="font-bold">Note:</span> Only workers
                        can apply for job
                      </p>
                    )}
                  </div>
                  <aside className="h-fit border p-3 m-3">
                    <h2 className="font-bold">About the client:</h2>
                    <div class="flex mb-4 gap-2 flex-col">
                      <div className="flex items-center">
                        <img
                          src={`http://localhost:2000/${jobDetails.user.picture}`}
                          alt="User Avatar"
                          class="w-8 h-8 rounded-full"
                        />
                        <p class="text-gray-700">{jobDetails.user.name}</p>
                      </div>

                      <div>
                        <div>
                          <h3 className="text-sm font-medium text-gray-500 mt-2">
                            Location
                          </h3>
                          <p className="text-sm">{jobDetails.user.location}</p>
                        </div>
                      </div>
                    </div>
                  </aside>
                </div>
              </div>
            </>
          ) : (
            <JobBids />
          )}
        </>
      )}
    </>
  );
}

export default JobsDetail;
