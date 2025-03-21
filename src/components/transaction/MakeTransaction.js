import React, { useContext, useEffect, useRef, useState } from "react";
import Alert from "../utils/Alert";
import { StateContext } from "../../context/StateContext";
import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";

function MakeTransaction() {
  const {
    isAlertVisible,
    alertData,
    setAlertData,
    hideAlert,
    setIsAlertVisible,
  } = useContext(StateContext);
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();
  const [phoneno, setPhoneno] = useState("");
  const [stateData, setStateData] = useState({});
  const [searchParams] = useSearchParams();
  const statusCheck = useRef(null);
  const navigate = useNavigate();

  const handleNextButtonClicked = () => {
    if (phoneno.match("[0-9]{4}-[0-9]{7}")) makeTransaction();
    else {
      setAlertData({
        title: "Invalid phone no",
        message: "Enter a valid phone no below to continue",
        type: "warning",
      });

      setIsAlertVisible(true);
      hideAlert();
    }
  };

  const makeTransaction = () => {
    setIsLoading(true)
    const amount = stateData.jobPrice;
    const reciverPhoneno = stateData.pid.workerPhoneno.replace('-','');
    const payload = {
      amount,
      reciverPhoneno,
      phoneno: phoneno.replace('-',''),
    };
    console.log(payload);
    fetch("http://localhost:2000/pay/transaction", {
      method: "POST",
      body: JSON.stringify(payload),
      header: {
        "Content-Type": "applicatin/json",
      },
    }).then(res => {
      // if(res.status === 200)
        navigate('/give-review',{state:stateData})
      // else{
      //   setAlertData({
      //     title: "Error",
      //     message: "Something went wrong try again later",
      //     type: "error",
      //   });
        
      //   setIsAlertVisible(true);
      //   hideAlert();
      // }
      setIsLoading(false)
    })
  };

  useEffect(() => {
    setStateData(location.state);
  }, []);

  return (
    <>
      {isAlertVisible && <Alert alertData={alertData} />}

      {stateData.jobTitle && (
        <div className="h-[100vh] w-[100%] mb-10 mt-20">
          <div className=" px-6 w-[70vw] mx-auto lg:py-0 my-10">
            <div className="bg-white rounded-lg shadow dark:border dark:border-gray-700">
              <div className="flex items-center justify-center flex-wrap p-6 space-y-4 md:space-y-6 sm:p-8">
                {/* <div className="seprator w-[1px] h-full p-1 bg-black"></div> */}

                <div className="w-1/2">
                  <div className="mb-3">
                    <h1 className="text-xl font-bold md:text-2xl ">
                      Payment through JazzCash
                    </h1>
                    <p className="text-sm font-normal">Enter phone number</p>
                  </div>

                  <div className="my-7">
                    <label
                      htmlFor="phoneno"
                      className="block text-sm/6 font-medium text-gray-900"
                    >
                      Phone no.
                    </label>
                    <div className="mt-2">
                      <div className="flex items-center rounded-md bg-white pl-3 outline outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-brandcolor">
                        <input
                          onChange={(e) => setPhoneno(e.target.value)}
                          type="tel"
                          name="phoneno"
                          id="phoneno"
                          pattern="[0-9]{4}-[0-9]{7}"
                          required
                          className="block min-w-0 grow py-1.5 pl-1 pr-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline focus:outline-0 sm:text-sm/6"
                          placeholder="0349-5898836"
                        />
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={handleNextButtonClicked}
                    className={`w-full flex items-center justify-center py-2 rounded-full font-medium ${
                      isLoading
                        ? "cursor-not-allowed bg-gray-400"
                        : "bg-brandcolor"
                    }`}
                    // to={"/auth/create-new-account"}
                    disabled={isLoading}
                  >
                    Next
                  </button>
                </div>
                <div className="w-px h-[280px] mx-10 bg-black"></div>

                <div className="w-1/3">
                  <div className="mb-3">
                    <h1 className="text-xl font-bold md:text-2xl ">
                      {stateData.jobTitle}
                    </h1>
                    <p className="text-sm font-normal">
                      {stateData.jobDescription}
                    </p>
                    <p className="text-xs">
                      From {stateData.jobStartTime} to {stateData.jobEndTime} in
                      PKR {stateData.jobPrice} at {stateData.jobLocation}{" "}
                    </p>
                  </div>
                  <div className="mb-3">
                    <h2 className="font-bold text-gray-600">Order with:</h2>
                    <div className="flex gap-2">
                      <img
                        height={20}
                        width={20}
                        src={`http://localhost:2000/${stateData.wid.picture}`}
                        alt=""
                      />{" "}
                      <p>{stateData.wid.name}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default MakeTransaction;
