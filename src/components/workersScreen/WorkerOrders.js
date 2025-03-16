import React, { useContext, useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { StateContext } from "../../context/StateContext";
import Alert from "../utils/Alert";
import Loading from "../utils/Loading";
import ActivityIndicator from "../utils/ActivityIndicator";

function WorkerOrders() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const {
    isAlertVisible,
    setIsAlertVisible,
    alertData,
    setAlertData,
    hideAlert,
    decodeJwtToken,
  } = useContext(StateContext);

  //get all the jobs for worker side profile
  const getWorkerOrders = () => {
    setIsLoading(true);
    const userId = decodeJwtToken()._id;
    try {
      fetch(`http://localhost:2000/worker/get-worker-orders/${userId}`).then(
        async (res) => {
          if (res.status === 200) {
            const data = await res.json();
            setOrders(data.workerOrders);
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
          setIsLoading(false);
        }
      );
    } catch (error) {
      console.log("My worker profile error" + error.message);
      setIsLoading(false);
    }
  };

  //get all the jobs for post work side profile
  const getPostWorkOrders = () => {
    setIsLoading(true);
    const userId = decodeJwtToken()._id;
    try {
      fetch(`http://localhost:2000/worker/get-postwork-orders/${userId}`).then(
        async (res) => {
          if (res.status === 200) {
            const data = await res.json();
            setOrders(data.postWorkOrders);
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
          setIsLoading(false);
        }
      );
    } catch (error) {
      console.log("My worker profile error" + error.message);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const type = decodeJwtToken().type;
    if (type === "worker") getWorkerOrders();
    else if (type === "postWork") getPostWorkOrders();
  }, []);

  return (
    <>
      {isAlertVisible && <Alert alertData={alertData} />}
      {/* workerProfiles */}
      <div>
        <div className="flex justify-between items-center my-10">
          <strong className="font-bold text-3xl block ml-24">My Orders</strong>
          {/* <Link
            to={"/create-worker-profile"}
            className="bg-brandcolor text-lg rounded-full px-3 py-1 mr-24"
          >
            Create a worker profile
          </Link> */}
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
                      placeholder="Search for orders"
                    />
                  </div>
                </div>
                <table className="w-full text-sm text-left">
                  <thead className="text-xs">
                    <tr>
                      <th className="px-6 py-3 font-medium text-base">
                        Profile
                      </th>
                      <th className="px-6 py-3 font-medium text-base">
                        {decodeJwtToken().type === "postWork" ? "Worker" :'Client'}
                      </th>
                      <th className="px-6 py-3 font-medium text-base">Title</th>
                      <th className="px-6 py-3 font-medium text-base">
                        Start time
                      </th>
                      <th className="px-6 py-3 font-medium text-base">
                        End time
                      </th>
                      <th className="px-6 py-3 font-medium text-base">
                        Location
                      </th>
                      <th className="px-6 py-3 font-medium text-base">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order) => {
                      return (
                        <>
                          <tr
                            key={order._id}
                            className="bg-white border-b hover:bg-stone-100 cursor-pointer"
                          >
                            <td className="px-6 py-4 font-normal underline">
                              <img
                                src={`http://localhost:2000/${order.pid.workerPicture}`}
                                alt="P"
                                height={50}
                                width={50}
                              />
                            </td>
                            {decodeJwtToken().type === "postWork" ? (
                              <td className="px-6 py-4 flex items-center gap-1">
                                <img
                                  src={`http://localhost:2000/${order.wid.picture}`}
                                  className="rounded-full"
                                  alt="P"
                                  height={25}
                                  width={25}
                                />
                                <p>{order.wid.name}</p>
                              </td>
                            ) : (
                              <td className="px-6 py-4 flex items-center gap-1">
                                <img
                                  src={`http://localhost:2000/${order.uid.picture}`}
                                  className="rounded-full"
                                  alt="P"
                                  height={25}
                                  width={25}
                                />
                                <p>{order.uid.name}</p>
                              </td>
                            )}

                            <td className="px-6 py-4">
                              <p>{order.jobTitle.slice(0, 10)}</p>
                            </td>
                            <td className="px-6 py-4">
                              <p>{order.jobStartTime}</p>
                            </td>

                            <td className="px-6 py-4">{order.jobEndTime}</td>
                            <td className="px-6 py-4">{order.jobLocation}</td>
                            <td className="px-6 py-4">
                              <p className="bg-[#F7CB73] px-3 py-1 rounded-lg w-fit">
                                {order.jobStatus}
                              </p>
                            </td>
                          </tr>
                        </>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {orders.length === 0 && (
                <div className="w-full text-center mt-4">
                  <p className="text-3xl">You don't have any posted job</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default WorkerOrders;
