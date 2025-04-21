import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { StateContext } from "../../context/StateContext";
import Alert from "../utils/Alert";
import ActivityIndicator from "../utils/ActivityIndicator";
function MyJobs() {
  const navigate = useNavigate();
  const [myJobs, setMyJobs] = useState([]);
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
  const getJobs = async () => {
    setIsLoading(true); // Show loading spinner
    const userId = decodeJwtToken()._id;
  
    try {
      const res = await fetch(`https://paklabour-backend.vercel.app/job/get-user-job/${userId}`);
  
      if (res.status === 200) {
        const data = await res.json();
        setMyJobs(data.jobs);
        console.log(data.jobs);
      } else {
        setAlertData({
          title: "Server error",
          message: "Something went wrong, please try again later.",
          type: "error",
        });
        setIsAlertVisible(true);
        hideAlert();
      }
    } catch (error) {
      console.error("My jobs error:", error.message);
      setAlertData({
        title: "Error",
        message: "Unable to fetch jobs. Please try again.",
        type: "error",
      });
      setIsAlertVisible(true);
      hideAlert();
    } finally {
      setIsLoading(false); // Ensure loading state is turned off after request completion
    }
  };
  

  // //delete job using _id
  // const deleteJob = (_id) => {
  //   try {
  //     fetch(`https://paklabour-backend.vercel.app/job/delete-job/${_id}`, {
  //       method: "DELETE",
  //     }).then(async (res) => {
  //       //user has posted jobs
  //       if (res.status === 200) {
  //         setMyJobs((prevJobs) => prevJobs.filter((job) => job._id !== _id));
  //         setAlertData({
  //           title: "Deleted successfully",
  //           message: "Job deleted successfully",
  //           type: "success",
  //         });

  //         setIsAlertVisible(true);
  //         hideAlert();
  //       }
  //       //server error
  //       else {
  //         setAlertData({
  //           title: "Server error",
  //           message: "Something went wrong please try again later",
  //           type: "error",
  //         });

  //         setIsAlertVisible(true);
  //         hideAlert();
  //       }
  //     });
  //   } catch (error) {
  //     console.log("My jobs error" + error.message);
  //   }
  // };
  //handle click on job listed in table
  const handleOnJobClick = (job) => {
    const params = new URLSearchParams();
    params.append('title',job.title);
    params.append('type','job-details');
    params.append('id',job._id);

    navigate(`/job?${params.toString()}`);
  };

  useEffect(()=>{
    getJobs()
    // eslint-disable-next-line
  },[])


  return (
    <>
      {isAlertVisible && <Alert alertData={alertData} />}

      <div className="flex justify-between items-center my-10">
        <strong className="font-bold text-3xl block ml-24">My jobs</strong>
        <Link
          to={"/post-job"}
          className="bg-brandcolor text-lg rounded-md px-3 py-1 mr-24"
        >
          Post a job
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
                    placeholder="Search for posted jobs"
                  />
                </div>
              </div>
              <table className="w-full text-sm text-left">
                <thead className="text-xs">
                  <tr>
                    <th className="px-6 py-3 font-medium text-base">Title</th>
                    <th className="px-6 py-3 font-medium text-base">Description</th>
                    <th className="px-6 py-3 font-medium text-base">Location</th>
                    <th className="px-6 py-3 font-medium text-base">Price</th>
                    <th className="px-6 py-3 font-medium text-base">
                      Posted on
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {myJobs.map((job) => {
                    return (
                      <>
                        <tr
                          key={job._id}
                          className="bg-white border-b hover:bg-stone-100 cursor-pointer"
                        >
                          <td
                            onClick={() => {
                              handleOnJobClick(job);
                            }}
                            className="px-6 py-4 font-normal underline"
                          >
                            {job.title.slice(0, 30)}
                          </td>
                          <td className="px-6 py-4">
                            {job.description.slice(0,30)}...
                          </td>
                          <td className="px-6 py-4">
                            {job.location}
                          </td>
                          <td className="px-6 py-4">
                            {job.price}
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

            {!isLoading && myJobs.length === 0 && (
              <div className="w-full text-center mt-4">
                <p className="text-3xl">No jobs. Post a new job</p>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
}

export default MyJobs;
