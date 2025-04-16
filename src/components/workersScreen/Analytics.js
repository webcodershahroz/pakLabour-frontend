import React, { useContext, useEffect, useState } from "react";
import { StateContext } from "../../context/StateContext";
import Alert from "../utils/Alert";
import ActivityIndicator from "../utils/ActivityIndicator";

function Analytics() {
  const [workerAnalytics, setWorkerAnalytics] = useState({
    orderCompleted: 0,
    averageRating: 0, // Average from reviews
    totalEarnings: 0,
    withdrawAmount: 0,
  });
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
    setIsLoading(true);
    try {
      const userId = decodeJwtToken()._id;
      const res = await fetch(
        `http://localhost:2000/review/get-worker-analytics/${userId}`
      );

      if (res.status === 200) {
        const data = await res.json();
        setWorkerAnalytics(data.workerAnalytics);
      } 
    } catch (error) {
      console.log("Analytics fetch error:", error.message);
      setAlertData({
        title: "Network error",
        message: "Unable to connect to the server",
        type: "error",
      });
      setIsAlertVisible(true);
      hideAlert();
    } finally {
      setIsLoading(false);
    }
  };

  //handle click on withdraw button
  const handleWithdrawButtonClicked = async () => {
    setIsLoading(true);
    try {
      const userId = decodeJwtToken()._id;
      const payload = {
        workerUserProfileId: userId,
        amount: workerAnalytics.withdrawAmount,
      };

      const res = await fetch(`http://localhost:2000/pay/transfer-funds`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.status === 200) {
        setAlertData({
          title: "Withdraw successful",
          message: "Amount transferred successfully",
          type: "success",
        });
        setWorkerAnalytics((prev) => ({
          ...prev,
          withdrawAmount: 0,
        }));
      } else {
        setAlertData({
          title: "Withdraw failed",
          message: "Something went wrong. Try again later.",
          type: "error",
        });
      }
      setIsAlertVisible(true);
      hideAlert();
    } catch (error) {
      console.log("Withdraw error:", error.message);
      setAlertData({
        title: "Network error",
        message: "Unable to process your request",
        type: "error",
      });
      setIsAlertVisible(true);
      hideAlert();
    } finally {
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
      {workerAnalytics ? (
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
      ) : (
        <ActivityIndicator />
      )}
    </>
  );
}

export default Analytics;
