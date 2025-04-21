import React, { useContext, useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { StateContext } from "../../context/StateContext";
import Alert from "../utils/Alert";
import Loading from "../utils/Loading";
import ActivityIndicator from "../utils/ActivityIndicator";

function WorkerProfiles() {
  const navigate = useNavigate();
  const [myWorkerProfile, setMyWorkerProfile] = useState([]);
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

  // get all the jobs posted by the worker
  const getMyWorkerProfile = async () => {
    setIsLoading(true);
    const userId = decodeJwtToken()._id;

    try {
      const res = await fetch(
        `https://paklabour-backend.vercel.app/worker/get-worker-profiles/${userId}`
      );

      if (res.status === 200) {
        const data = await res.json();
        setMyWorkerProfile(data.worker);
        console.log(data.worker);
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
      console.log("My worker profile error: " + error.message);
      setAlertData({
        title: "Network error",
        message: "Could not connect to the server",
        type: "error",
      });
      setIsAlertVisible(true);
      hideAlert();
    } finally {
      setIsLoading(false);
    }
  };

  

  // get all jobs the worker has applied to
  const getMyAppliedJobs = async () => {
    setIsLoading(true);
    const userId = decodeJwtToken()._id;

    try {
      const res = await fetch(
        `https://paklabour-backend.vercel.app/worker/get-worker-applied-jobs/${userId}`
      );

      if (res.status === 200) {
        const data = await res.json();
        setMyAppliedJobs(data.appliedJobs);
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
      console.log("My applied jobs error: " + error.message);
      setAlertData({
        title: "Network error",
        message: "Could not connect to the server",
        type: "error",
      });
      setIsAlertVisible(true);
      hideAlert();
    } finally {
      setIsLoading(false);
    }
  };

  //handle click on job listed in table
  const handleOnProfileClick = (profile) => {
    const params = new URLSearchParams();
    params.append("name", profile.user.name);
    params.append("id", profile._id);

    navigate(`/worker?${params.toString()}`);
  };

  useEffect(() => {
    getMyWorkerProfile();
    getMyAppliedJobs();
  }, []);

  return (
    <>
      {isAlertVisible && <Alert alertData={alertData} />}
      {/* workerProfiles */}
      <div>
        <div className="flex justify-between items-center my-10">
          <strong className="font-bold text-3xl block ml-24">
            My worker profiles
          </strong>
          <Link
            to={"/create-worker-profile"}
            className="bg-brandcolor text-lg rounded-md px-3 py-1 mr-24"
          >
            Create a worker profile
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
                      placeholder="Search for profile"
                    />
                  </div>
                </div>
                <table className="w-full text-sm text-left">
                  <thead className="text-xs">
                    <tr>
                      <th className="px-6 py-3 font-medium text-base">Title</th>
                      <th className="px-6 py-3 font-medium text-base">
                        Category
                      </th>
                      <th className="px-6 py-3 font-medium text-base">
                        Created on
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {myWorkerProfile.map((profile) => {
                      return (
                        <>
                          <tr
                            key={profile._id}
                            className="bg-white border-b hover:bg-stone-100 cursor-pointer"
                          >
                            <td
                              onClick={() => {
                                handleOnProfileClick(profile);
                              }}
                              className="px-6 py-4 font-normal underline flex items-center gap-1"
                            >
                              <img
                                src={`https://paklabour-backend.vercel.app/${profile.workerPicture}`}
                                alt="P"
                                height={50}
                                width={50}
                              />
                              {profile.workerTagline.slice(0, 30)}
                            </td>
                            <td className="px-6 py-4">
                              {profile.workerCategory}
                            </td>
                            <td className="px-6 py-4">
                              {profile.createdAt.slice(0, 10)}
                            </td>
                          </tr>
                        </>
                      );
                    })}
                  </tbody>
                </table>
              {!isLoading && myWorkerProfile.length === 0 && (
                <div className="w-full text-center mt-4">
                  <p className="text-3xl">No profiles? Create Now</p>
                </div>
              )}
              </div>

            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default WorkerProfiles;
