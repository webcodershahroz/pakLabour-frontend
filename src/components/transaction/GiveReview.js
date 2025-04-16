import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { StateContext } from "../../context/StateContext";
import Alert from "../utils/Alert";

function GiveReview() {
  const [isLoading, setIsLoading] = useState(false);
  const [ratings, setRatings] = useState("");
  const [review, setReview] = useState("");
  const [stateData, setStateData] = useState({});
  const location = useLocation();
  const navigate = useNavigate();
  const {
    isAlertVisible,
    alertData,
    setAlertData,
    hideAlert,
    setIsAlertVisible,
    decodeJwtToken,
  } = useContext(StateContext);

  const handleDoneButtonClicked = async () => {
    console.log("clicked");
    // setIsLoading(true);
    if (ratings.match("[0-4]{1}.[0-9]{1}") && review.length > 0) {
      await updateRatings();
      setIsLoading(false);

    } else {
      setAlertData({
        title: "Warning",
        message: "Enter a valid rating or write a review",
        type: "warning",
      });

      setIsAlertVisible(true);
      hideAlert();
    }
  };

  //function to post review message
  const postReviewMessage = async () => {
    const user = await decodeJwtToken()._id;
    const payload = {
      user,
      reviewedProfileId: stateData.pid._id,
      reviewMessage: review,
    };

    try {
      const res = await fetch(`http://localhost:2000/review/set-review`, {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (res.ok) {
        await updateOrderStatus();
      } else {
        console.error("Failed to post review.");
      }
    } catch (err) {
      console.error("Error posting review:", err);
    }
  };

  const updateOrderStatus = async () => {
    const payload = {
      orderId: stateData._id,
    };

    try {
      const res = await fetch(
        `http://localhost:2000/hire/update-order-status`,
        {
          method: "POST",
          body: JSON.stringify(payload),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (res.ok) {
        // await deleteJob(stateData.jobId);
      window.location.href = "/my-orders";

      } else {
        console.error("Failed to update order status.");
      }
    } catch (err) {
      console.error("Error updating order status:", err);
    }
  };

  const updateRatings = async () => {
    const userId = stateData.wid._id
    const payload = {
      user: userId,
      averageRating: Number(ratings),
    };

    console.log("Updating ratings with:", payload);

    try {
      const res = await fetch(`http://localhost:2000/review/update-analytics`, {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (res.ok) {
        await postReviewMessage();
      } else {
        console.error("Failed to update ratings.");
      }
    } catch (err) {
      console.error("Error updating ratings:", err);
    }
  };

  // const deleteJob = async (_id) => {
  //   try {
  //     const res = await fetch(`http://localhost:2000/job/delete-job/${_id}`, {
  //       method: "DELETE",
  //     });

  //     if (res.ok) {
  //       setAlertData({
  //         title: "Success",
  //         message: "Transaction successfully completed",
  //         type: "success",
  //       });
  //       setIsAlertVisible(true);
  //       hideAlert();
  //     } else {
  //       console.error("Failed to delete job.");
  //     }
  //   } catch (err) {
  //     console.error("Error deleting job:", err);
  //   }
  // };

  useEffect(() => {
    setStateData(location.state);
  }, []);

  return (
    <>
      {isAlertVisible && <Alert alertData={alertData} />}

      <div className="h-[100vh] w-[100%] mb-10 mt-20">
        <div className=" px-6 w-[50vw] mx-auto lg:py-0 my-10">
          <div className="bg-white rounded-lg shadow dark:border dark:border-gray-700">
            <div className=" p-6 space-y-4 md:space-y-6 sm:p-8">
              <div>
                <div className="mb-3">
                  <h1 className="text-xl font-bold md:text-2xl ">
                    Leave a review
                  </h1>
                  <p className="text-sm font-normal">
                    Give feedback for service
                  </p>
                </div>

                <div className="my-7">
                  <label
                    htmlFor="phoneno"
                    className="block text-sm/6 font-medium text-gray-900"
                  >
                    Ratings
                  </label>
                  <div className="mt-2">
                    <div className="flex items-center rounded-md bg-white pl-3 outline outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-brandcolor">
                      <input
                        onChange={(e) => setRatings(e.target.value)}
                        type="text"
                        name="ratings"
                        id="ratings"
                        pattern="[0-9]{4}-[0-9]{7}"
                        required
                        className="block min-w-0 grow py-1.5 pl-1 pr-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline focus:outline-0 sm:text-sm/6"
                        placeholder="4.5"
                      />
                    </div>
                  </div>
                </div>
                <div className="my-7">
                  <label
                    htmlFor="phoneno"
                    className="block text-sm/6 font-medium text-gray-900"
                  >
                    Review
                  </label>
                  <div className="mt-2">
                    <div className="flex items-center rounded-md bg-white pl-3 outline outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-brandcolor">
                      <input
                        onChange={(e) => setReview(e.target.value)}
                        value={review}
                        type="text"
                        name="review"
                        id="review"
                        required
                        className="block min-w-0 grow py-1.5 pl-1 pr-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline focus:outline-0 sm:text-sm/6"
                        placeholder="Great, ..."
                      />
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleDoneButtonClicked}
                  className={`w-full flex items-center justify-center py-2 rounded-full font-medium ${
                    isLoading
                      ? "cursor-not-allowed bg-gray-400"
                      : "bg-brandcolor"
                  }`}
                  // to={"/auth/create-new-account"}
                  // disabled={isLoading}
                >
                  Done
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default GiveReview;
