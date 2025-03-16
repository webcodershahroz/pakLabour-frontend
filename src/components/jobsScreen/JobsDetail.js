import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import JobBids from "./JobBids";
import { StateContext } from "../../context/StateContext";

function JobsDetail() {
  const [searchParams] = useSearchParams();
  const titleParam = searchParams.get("title");
  const idParam = searchParams.get("id");
  const typeParam = searchParams.get("type");
  const [jobDetails, setJobDetails] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [photoCarousalIndex, setPhotoCarousalIndex] = useState(0);
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
    params.append("ref", "my-jobs");

    navigate(`/job?${params.toString()}`);
  };

  const handleCarousalNavigation = () => {
    // if(photoCarousalIndex )
    console.log(photoCarousalIndex);
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
                    <h2 class="text-3xl font-bold mb-2">{jobDetails.title}</h2>
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
                    <div>
                      <h2 className="font-bold text-gray-600">Work photo</h2>
                      <div className="flex flex-col items-center border border-2 border-gray-200 rounded-md my-4">
                        <div
                          id="controls-carousel"
                          class="relative w-full"
                        >
                          <div class="relative h-56 overflow-hidden rounded-lg md:h-96">
                            <div
                              class="duration-700 ease-in-out"
                              data-carousel-item
                            >
                              <img
                                src={`http://localhost:2000/${jobDetails.pictures[photoCarousalIndex]}`}
                                class="object-contain h-full absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
                                alt="..."
                              />
                            </div>
                          </div>
                          <button
                            onClick={() => {
                              setPhotoCarousalIndex((prev) => --prev);
                            }}
                            disabled={photoCarousalIndex === 0}
                            type="button"
                            class="absolute top-0 start-0 z-30 h-full px-4 cursor-pointer"
                            data-carousel-prev
                          >
                            <i class="fa-solid fa-arrow-left border border-2 border-gray-500 p-3 rounded-full"></i>
                          </button>
                          <button
                            onClick={() => {
                              setPhotoCarousalIndex((prev) => ++prev);
                            }}
                            disabled={
                              photoCarousalIndex ===
                              jobDetails.pictures.length - 1
                            }
                            type="button"
                            class="absolute top-0 end-0 z-30 h-full px-4 cursor-pointer"
                            data-carousel-next
                          >
                            <i class="fa-solid fa-arrow-right border border-2 border-gray-500 p-3 rounded-full "></i>
                          </button>
                        </div>
                        <div>
                          {`${photoCarousalIndex + 1}/${
                            jobDetails.pictures.length
                          }`}
                        </div>
                        {/* <div className="flex gap-2 flex-wrap mt-3">
                          {jobDetails.pictures.map((pu) => {
                            return (
                              <img
                                src={`http://localhost:2000/${pu}`}
                                className="object-contain"
                                height={100}
                                width={100}
                                alt="d"
                              />
                            );
                          })}
                        </div> */}
                      </div>
                    </div>

                    {isUserLoggedIn() && userDetails.type === "worker" ? (
                      <button
                        onClick={() => {
                          const params = new URLSearchParams();
                          params.append("title", titleParam);
                          params.append("id", idParam);

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
