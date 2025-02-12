import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { StateContext } from "../context/StateContext";
import Alert from "./utils/Alert";

function HireNowScreen() {
  const navigate = useNavigate();
  const {
    isAlertVisible,
    setIsAlertVisible,
    alertData,
    setAlertData,
    hideAlert,
    decodeJwtToken,
  } = useContext(StateContext);
  const [isLoading, setIsLoading] = useState(false);

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

  //funtion to hire worker
  const hireWorker = async () => {};

  //function to handle post button click
  const handleHireButtonClick = async () => {};
  return (
    <>
      {isAlertVisible && <Alert alertData={alertData} />}

      <strong className="font-bold text-4xl mt-7 block ml-10">
        Hire a worker
      </strong>
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
                      name="start-time"
                      id="start-time"
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
                      name="end-time"
                      id="end-time"
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
