import React, { useContext, useState } from "react";
import Alert from "./utils/Alert";
import { useNavigate, useSearchParams } from "react-router-dom";
import { StateContext } from "../context/StateContext";

function ApplyNowScreen() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const titleParam = searchParams.get("title");
  const idParam = searchParams.get("id");
  const [isLoading, setIsLoading] = useState(false);
  const {
    isAlertVisible,
    setIsAlertVisible,
    alertData,
    setAlertData,
    hideAlert,
    decodeJwtToken,
  } = useContext(StateContext);

  //job states
  const [applyNowData, setApplyNowData] = useState({
    title: titleParam,
    description: "",
    price: "",
    duration: "",
  });

  //handle text input change
  const handleTextInputChange = (e) => {
    const { name, value } = e.target;
    setApplyNowData({ ...applyNowData, [name]: value });
  };

  //funtion to hire worker
  const hireWorker = async () => {
    setIsLoading(true)
    const user = await decodeJwtToken()._id;
    const payload = {
      user,
      jobId: idParam,
      jobTitle: applyNowData.title,
      jobDescription: applyNowData.description,
      jobDuration: applyNowData.duration,
      jobPrice: applyNowData.price,
    };
    fetch("http://localhost:2000/apply/apply-now", {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      if (res.status === 200) {
        setAlertData({
          title: "Success",
          message: "Applied successfully for the job",
          type: "success",
        });
        setIsAlertVisible(true);
        hideAlert();
      } else {
        setAlertData({
          title: "Error",
          message: "Something went wrong",
          type: "error",
        });
        setIsAlertVisible(true);
        hideAlert();
      }
      setIsLoading(false)
    });
  };

  //function to handle post button click
  const handleHireButtonClick = async () => {
    if (
      applyNowData.description.length > 0 &&
      applyNowData.location.length > 0 &&
      applyNowData.duration.length > 0
    ) {
      if (applyNowData.price.length > 3) await hireWorker();
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
  return (
    <>
      {isAlertVisible && <Alert alertData={alertData} />}

      <strong className="font-bold text-4xl mt-7 block ml-10">
        {titleParam}
      </strong>
      <div className="border border-gray mx-8 rounded px-10 py-2">
        <div className="pb-2 flex justify-start items-baseline flex-wrap">
          <div className="xl:w-1/3 md:w-1/3">
            <h2 className="font-bold text-3xl mt-7 mb-4">Apply for job</h2>
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
                    // onChange={handleTextInputChange}
                    value={titleParam}
                    type="text"
                    disabled
                    name="title"
                    id="title"
                    className="block min-w-0 grow py-1.5 pl-1 pr-3 text-base text-gray-400 placeholder:text-gray-400 focus:outline focus:outline-0 sm:text-sm/6"
                  />
                </div>
              </div>
            </div>

            <div className="col-span-full">
              <label
                htmlFor="description"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Description
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
                Write about your skills related to job
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
                htmlFor="start-time"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Duration
              </label>
              <div className="mt-2 w-1/2">
                <div className="flex items-center rounded-md bg-white pl-3 outline outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-brandcolor">
                  <input
                    onChange={handleTextInputChange}
                    placeholder="Duration in days : 30"
                    type="number"
                    name="duration"
                    id="duration"
                    className="block min-w-0 grow py-1.5 pl-1 pr-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline focus:outline-0 sm:text-sm/6"
                  />
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
            disabled={isLoading}
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

export default ApplyNowScreen;
