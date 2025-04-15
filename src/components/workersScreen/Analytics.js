import React, { useContext, useEffect, useState } from "react";
import { StateContext } from "../../context/StateContext";
import Alert from "../utils/Alert";
import ActivityIndicator from "../utils/ActivityIndicator";


function Analytics() {
  const [workerAnalytics, setWorkerAnalytics] = useState({});
  const {
    decodeJwtToken,
    isAlertVisible,
    setIsAlertVisible,
    alertData,
    setAlertData,
    hideAlert,
  } = useContext(StateContext);
  const [isLoading, setIsLoading] = useState(true);
  //get user analytics
  const getUserAnalytics = async () => {
    const userId = await decodeJwtToken()._id;
    setIsLoading(true);
    try {
      fetch(`http://localhost:2000/review/get-worker-analytics/${userId}`).then(
        async (res) => {
          const data = await res.json();
          setWorkerAnalytics(data.workerAnalytics);
          setIsLoading(false);
        }
      );
    } catch (error) {
      setIsLoading(false);
    }
  };

  //handle click on withdraw button
  const handleWithdrawButtonClicked = async () => {
    setIsLoading(true);
    const userId = await decodeJwtToken()._id;
    const payload = {
      workerUserProfileId: userId,
      amount: workerAnalytics.withdrawAmount,
    };
    setIsLoading(true);
    try {
      fetch(`http://localhost:2000/pay/transfer-funds`, {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
          "Content-Type": "application/json",
        },
      }).then(async (res) => {
        if (res.status === 200) {
          setAlertData({
            title: "Withdraw successfully",
            message: "Amount Transfer successfully ",
            type: "success",
          });
          setIsAlertVisible(true);
          hideAlert();
          setIsLoading(false);
          //set withdraw amount to 0
          workerAnalytics.withdrawAmount = 0
        }
      });
    } catch (error) {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getUserAnalytics();
    // eslint-disable-next-line
  }, []);
  return (
    <>
      {isAlertVisible && <Alert alertData={alertData} />}

      <strong className="font-bold text-3xl my-10 container block ml-24 mb-3">
        Analytics
      </strong>
      {workerAnalytics && workerAnalytics.averageRating ? (
        <div className="container mx-auto p-6 border-2 rounded-md mb-4">
          {/* Withdraw Section */}
          <div className="flex justify-between items-center bg-white p-6 mb-8">
            <div>
              <p className="text-xl text-gray-700">Withdrawable Amount</p>
              <h1 className="text-3xl font-bold">
                Rs. {workerAnalytics.withdrawAmount}
              </h1>
            </div>
            <button
              onClick={handleWithdrawButtonClicked}
              disabled={workerAnalytics.withdrawAmount === 0 || isLoading}
              className={`${
                workerAnalytics.withdrawAmount === 0 || isLoading
                  ? "cursor-not-allowed bg-gray-400"
                  : "bg-brandcolor hover:bg-brandcolor/90"
              } text-black font-semibold px-6 py-2`}
            >
              Withdraw Now
            </button>
          </div>
          {/* Analytics Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Completed Orders */}
            <div className="bg-white p-5 text-center border-r-2">
              <h2 className="text-xl font-semibold text-gray-700 mb-2">
                Completed Orders
              </h2>
              <p className="text-3xl font-bold ">
                {workerAnalytics.orderCompleted}
              </p>
            </div>

            {/* Pending Orders */}
            <div className="bg-white p-5 text-center border-r-2">
              <h2 className="text-xl font-semibold text-gray-700 mb-2">
                Average Ratings
              </h2>
              <p className="text-3xl font-bold">
                {JSON.stringify(workerAnalytics.averageRating).slice(0, 3)}
              </p>
            </div>

            {/* Total Earnings */}
            <div className="bg-white p-5 text-center">
              <h2 className="text-xl font-semibold text-gray-700 mb-2">
                Total Earnings
              </h2>
              <p className="text-3xl font-bold ">
                Rs. {workerAnalytics.totalEarnings}
              </p>
            </div>
          </div>
        </div>
      ): <ActivityIndicator/> }
    </>
  );
}

export default Analytics;
