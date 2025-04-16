import React, { useContext, useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { StateContext } from "../../context/StateContext";
import Alert from "../utils/Alert";
import Loading from "../utils/Loading";
import ActivityIndicator from "../utils/ActivityIndicator";

function WorkerAppliedJobs() {
  const [myAppliedJobs, setMyAppliedJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const {
    isAlertVisible,
    setIsAlertVisible,
    alertData,
    setAlertData,
    hideAlert,
    decodeJwtToken,
  } = useContext(StateContext);
  //get all the jobs
  const getMyAppliedJobs = async () => {
    setIsLoading(true);
  
    try {
      const { _id: userId } = await decodeJwtToken();
      if (!userId) throw new Error("Invalid user ID");
  
      const res = await fetch(`http://localhost:2000/worker/get-worker-applied-jobs/${userId}`);
  
      if (res.ok) {
        const data = await res.json();
        setMyAppliedJobs(data.appliedJobs || []);
      } else {
        const errorData = await res.json();
        setAlertData({
          title: "Server Error",
          message: errorData.message || "Something went wrong, please try again later",
          type: "error",
        });
        setIsAlertVisible(true);
        hideAlert();
      }
    } catch (error) {
      console.error("getMyAppliedJobs error:", error.message);
      setAlertData({
        title: "Network Error",
        message: "Could not connect to the server. Please check your internet connection.",
        type: "error",
      });
      setIsAlertVisible(true);
      hideAlert();
    } finally {
      setIsLoading(false);
    }
  };
  
  useEffect(() => {
    getMyAppliedJobs()
  }, []);

  return (
    <>
      {isAlertVisible && <Alert alertData={alertData} />}
      {/* worker Applied for jobs list */}
      <div>
        <div className="flex justify-between items-center my-10">
          <strong className="font-bold text-3xl block ml-24">
            Applied for Jobs
          </strong>
          <Link
            to={"/jobs"}
            className="bg-brandcolor text-lg rounded-full px-3 py-1 mr-24"
          >
            Apply for another job
          </Link>
        </div>
        <div className="container mx-auto mb-10">
          {isLoading ? (
            <ActivityIndicator />
          ) : (
            <div className="w-full">
              <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <div className="flex flex-column sm:flex-row flex-wrap space-y-4 sm:space-y-0 items-center justify-between pb-4">
                  <label htmlFor="table-search" className="sr-only">
                    Search
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 rtl:inset-r-0 rtl:right-0 flex items-center ps-3 pointer-events-none">
                      <i className="fa-solid fa-magnifying-glass"></i>
                    </div>
                    <input
                      type="text"
                      id="table-search"
                      className="block p-2 ps-10 text-sm border border-gray-800 rounded-lg w-80 outline-none "
                      placeholder="Search for applied job"
                    />
                  </div>
                </div>
                <table className="w-full text-sm text-left">
                  <thead className="text-xs">
                    <tr>
                      <th className="px-6 py-3 font-medium text-base">Title</th>
                      <th className="px-6 py-3 font-medium text-base">Posted by</th>
                      <th className="px-6 py-3 font-medium text-base">Duration</th>
                      <th className="px-6 py-3 font-medium text-base">Price</th>
                      <th className="px-6 py-3 font-medium text-base">
                        Applied on
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {myAppliedJobs.map((job) => {
                      return (
                        <>
                          <tr
                            key={job._id}
                            className="bg-white border-b hover:bg-stone-100 cursor-pointer"
                          >
                            <td
                              onClick={() => {
                                // handleOnJobClick(profile);
                              }}
                              className="px-6 py-4 font-normal underline"
                            >
                              {job.jobTitle.slice(0, 30)}
                            </td>
                            <td className="px-6 py-4">
                              {job.user.name}
                            </td>
                            <td className="px-6 py-4">
                              {job.jobDuration} days
                            </td>
                            <td className="px-6 py-4">
                              {job.jobPrice}
                            </td>
                            <td className="px-6 py-4">
                              {job.createdAt.slice(0, 10)}
                            </td>
                          </tr>
                        </>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {!isLoading && myAppliedJobs.length === 0 && (
                <div className="w-full text-center mt-4">
                  <p className="text-3xl">Not applied for any job. Apply now</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default WorkerAppliedJobs;
