import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { StateContext } from "../../context/StateContext";
import Alert from "../utils/Alert";

function HireNowScreen() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const uidParam = searchParams.get("uid");
  const widParam = searchParams.get("wid");
  const pidParam = searchParams.get("pid");
  const [selectedJob, setSelectedJob] = useState({
    title: "",
    description: "",
    price: "",
    location: "",
  });
  const {
    isAlertVisible,
    setIsAlertVisible,
    alertData,
    setAlertData,
    hideAlert,
    decodeJwtToken,
  } = useContext(StateContext);
  const [isLoading, setIsLoading] = useState(false);
  const [myJobs, setMyJobs] = useState([]);

  //job states
  const [workerHireData, setWorkerHireData] = useState({
    title: "",
    description: "",
    price: "",
    location: "",
    startTime: "",
    endTime: "",
  });

  //handle text input change
  const handleTextInputChange = (e) => {
    const { name, value } = e.target;
    setWorkerHireData({ ...workerHireData, [name]: value });
  };

  const getMyJobs = async () => {
    setIsLoading(true); // Show loading spinner while fetching jobs
    try {
      const res = await fetch(
        `https://paklabour-backend.vercel.app/job/get-user-job/${uidParam}`
      );

      if (res.status === 200) {
        const data = await res.json();
        setMyJobs(data.jobs);
        console.log(data);
      } else {
        setAlertData({
          title: "Server error",
          message: "Something went wrong, please try again later",
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
      setIsLoading(false); // Hide loading spinner regardless of success or failure
    }
  };

  //funtion to hire worker
  const hireWorker = async () => {
    setIsLoading(true); // Show loading spinner while hiring worker
    const uid = await decodeJwtToken()._id;
    const payload = {
      uid,
      wid: widParam,
      pid: pidParam,
      jobId: selectedJob._id || Math.floor(Math.random() * 99999).toString(),
      jobTitle: workerHireData.title,
      jobDescription: workerHireData.description,
      jobLocation: workerHireData.location,
      jobStartTime: workerHireData.startTime,
      jobEndTime: workerHireData.endTime,
      jobPrice: workerHireData.price,
      jobStatus: "Pending",
    };

    try {
      const res = await fetch("https://paklabour-backend.vercel.app/hire/hire-now", {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (res.status === 200) {
        setAlertData({
          title: "Success",
          message: "Worker hired successfully!",
          type: "success",
        });
        setIsAlertVisible(true);
        hideAlert();

        // Delete job if the job was selected previously
        if(selectedJob._id){
          await deleteJob(payload.jobId);
        }

        navigate("/my-orders"); // Redirect to my orders page
      }
      //  else {
      //   setAlertData({
      //     title: "Error",
      //     message: "Something went wrong while hiring the worker.",
      //     type: "error",
      //   });
      //   setIsAlertVisible(true);
      //   hideAlert();
      // }
    } catch (error) {
      console.error("Error hiring worker:", error.message);
      setAlertData({
        title: "Error",
        message: "Unable to hire worker. Please try again.",
        type: "error",
      });
      setIsAlertVisible(true);
      hideAlert();
    } finally {
      setIsLoading(false); // Hide loading spinner regardless of success or failure
    }
  };

  //function to handle post button click
  const handleHireButtonClick = async () => {
    console.log(workerHireData);
    if (
      workerHireData.title.length > 0 &&
      workerHireData.description.length > 0 &&
      workerHireData.location.length > 0 &&
      workerHireData.startTime.length > 0 &&
      workerHireData.endTime.length > 0
    ) {
      if (workerHireData.price.length > 3) await hireWorker();
      else {
        setAlertData({
          title: "Price Limit",
          message: "Price must be greater than or equal to 1000",
          type: "warning",
        });
        setIsAlertVisible(true);
        hideAlert();
      }
    } else {
      setAlertData({
        title: "Empty Fields",
        message: "Please fill all the fields ",
        type: "warning",
      });
      setIsAlertVisible(true);
      hideAlert();
    }
  };

  //delete job using _id
  const deleteJob = async (_id) => {
    try {
      fetch(`https://paklabour-backend.vercel.app/job/delete-job/${_id}`, {
        method: "DELETE",
      }).then(async (res) => {
        //user has posted jobs
        if (res.status === 200) {
          setMyJobs((prevJobs) => prevJobs.filter((job) => job._id !== _id));
          setAlertData({
            title: "Deleted successfully",
            message: "Job deleted successfully",
            type: "success",
          });

          setIsAlertVisible(true);
          hideAlert();
        }
        //server error
        else {
          setAlertData({
            title: "Server error",
            message: "Something went wrong please try again later",
            type: "error",
          });

          setIsAlertVisible(true);
          hideAlert();
        }
      });
    } catch (error) {
      console.log("My jobs error" + error.message);
    }
  };

  useEffect(() => {
    getMyJobs();
    // eslint-disable-next-line
  }, []);
  return (
    <>
      {isAlertVisible && <Alert alertData={alertData} />}

      <h1 className="font-bold text-4xl mt-7 block ml-10">Hire a worker</h1>
      {myJobs.length && (
        <div className="container mx-auto border border-gray rounded-lg p-3 mb-3">
          <h2 className="font-medium text-2xl mt-7 block ml-10">My jobs</h2>
          <table className="w-full text-sm text-left my-3">
            <thead className="text-xs">
              <tr>
                <th className="">
                  <p className="px-6 py-3 font-medium text-base">Title</p>
                  <button
                    onClick={() => {
                      setSelectedJob({
                        title: "",
                        description: "",
                        price: "",
                        location: "",
                      });
                      setWorkerHireData({
                        title: "",
                        description: "",
                        price: "",
                        location: "",
                        startTime: "",
                        endTime: "",
                      });
                    }}
                  >
                    Clear
                  </button>
                </th>
                <th className="px-6 py-3 font-medium text-base">Description</th>
                <th className="px-6 py-3 font-medium text-base">Location</th>
                <th className="px-6 py-3 font-medium text-base">Price</th>
                <th className="px-6 py-3 font-medium text-base">Posted on</th>
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
                      <td className="px-6 py-4 font-normal underline flex gap-2 ">
                        <input
                          type="radio"
                          name="my-jobs"
                          checked={selectedJob._id === job._id}
                          onClick={() => {
                            setSelectedJob(job);
                            setWorkerHireData({
                              ...workerHireData,
                              title: job.title,
                              location: job.location,
                              description: job.description,
                              price: job.price,
                            });
                          }}
                          id={job._id}
                        />
                        <label htmlFor={job._id}>
                          {job.title.slice(0, 30)}
                        </label>
                      </td>
                      <td className="px-6 py-4">
                        {job.description.slice(0, 30)}...
                      </td>
                      <td className="px-6 py-4">{job.location}</td>
                      <td className="px-6 py-4">{job.price}</td>
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
      )}
      <div className="border border-gray mx-8 rounded px-10 py-2">
        <div className="pb-2 flex justify-start items-baseline flex-wrap">
          <div className="xl:w-1/3 md:w-1/3">
            <h2 className="text-base/7 font-semibold text-gray-900">
              Enter required details
            </h2>
            <p className="mt-1 text-sm/6 text-gray-600">
              Fill all the field carefully...
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 xl:w-2/3">
            <div className="sm:col-span-4">
              <label
                htmlFor="title"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Job title
              </label>
              <div className="mt-2">
                <div className="flex items-center rounded-md bg-white pl-3 outline outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-brandcolor">
                  <input
                    maxlength="50"
                    onChange={handleTextInputChange}
                    type="text"
                    value={workerHireData.title}
                    name="title"
                    id="title"
                    className="block min-w-0 grow py-1.5 pl-1 pr-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline focus:outline-0 sm:text-sm/6"
                    placeholder="Title of your job"
                  />
                </div>
              </div>
            </div>

            <div className="col-span-full">
              <label
                htmlFor="description"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Job description
              </label>
              <div className="mt-2">
                <textarea
                  maxLength="300"
                  onChange={handleTextInputChange}
                  value={workerHireData.description}
                  name="description"
                  id="description"
                  rows="3"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-brandcolor sm:text-sm/6"
                ></textarea>
              </div>
              <p className="mt-3 text-sm/6 text-gray-600">
                Write about your job
              </p>
            </div>

            <div className="sm:col-span-4">
              <label
                htmlFor="Price"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Price
              </label>
              <div className="mt-2">
                <div className="flex items-center rounded-md bg-white pl-3 outline outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-brandcolor">
                  <input
                    onChange={handleTextInputChange}
                    type="number"
                    value={workerHireData.price}
                    name="price"
                    id="price"
                    className="block min-w-0 grow py-1.5 pl-1 pr-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline focus:outline-0 sm:text-sm/6"
                    placeholder="Price : Rs 1000"
                  />
                </div>
              </div>
            </div>
            <div className="sm:col-span-4">
              <label
                htmlFor="location"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Location
              </label>
              <div className="mt-2">
                <div className="flex items-center rounded-md bg-white pl-3 outline outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-brandcolor">
                  <input
                    onChange={handleTextInputChange}
                    type="text"
                    name="location"
                    value={workerHireData.location}
                    id="location"
                    className="block min-w-0 grow py-1.5 pl-1 pr-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline focus:outline-0 sm:text-sm/6"
                    placeholder="Jhelum, Pakistan"
                  />
                </div>
              </div>
            </div>
            <div className="sm:col-span-4">
              <label
                htmlFor="start-time"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Duration
              </label>
              <div className="flex flex-wrap gap-2">
                <div className="mt-2 w-1/2">
                  <div className="flex items-center rounded-md bg-white pl-3 outline outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-brandcolor">
                    <input
                      onChange={handleTextInputChange}
                      placeholder="Start time"
                      type="date"
                      name="startTime"
                      id="startTime"
                      className="block min-w-0 grow py-1.5 pl-1 pr-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline focus:outline-0 sm:text-sm/6"
                    />
                  </div>
                </div>
                <div className="mt-2 w-1/2">
                  <div className="flex items-center rounded-md bg-white pl-3 outline outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-brandcolor">
                    <input
                      onChange={handleTextInputChange}
                      placeholder="End time"
                      type="date"
                      name="endTime"
                      id="endTime"
                      className="block min-w-0 grow py-1.5 pl-1 pr-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline focus:outline-0 sm:text-sm/6"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button
            type="button"
            className="text-sm/6 font-semibold text-gray-900"
          >
            Cancel
          </button>
          <button
            onClick={handleHireButtonClick}
            className={`rounded-md px-3 py-2 text-sm font-semibold text-black shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brandcolor ${
              isLoading ? "cursor-not-allowed bg-gray-400" : "bg-brandcolor"
            }`}
          >
            Hire
          </button>
        </div>
      </div>
    </>
  );
}

export default HireNowScreen;
