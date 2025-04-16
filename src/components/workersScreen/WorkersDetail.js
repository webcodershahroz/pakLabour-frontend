import React, { useContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate, useSearchParams } from "react-router-dom";
import { StateContext } from "../../context/StateContext";
import Alert from "../utils/Alert";
import ActivityIndicator from "../utils/ActivityIndicator";

function WorkersDetail() {
  const [isLoading, setIsLoading] = useState(false);
  const [workerDetails, setWorkerDetails] = useState({});
  const [workerReviews, setWorkerReviews] = useState([]);
  const [reviewMessage, setReviewMessage] = useState("");
  const {
    isAlertVisible,
    setIsAlertVisible,
    alertData,
    setAlertData,
    hideAlert,
    decodeJwtToken,
    isUserLoggedIn,
  } = useContext(StateContext);
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const idParams = params.get("id");
  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    type: "",
  });

  //function that gets the worker details
  // Function to get worker details
  const getWorkerDetails = async () => {
    try {
      setIsLoading(true); // Show loading indicator
      const res = await fetch(
        `http://localhost:2000/worker/get-worker/${idParams}`
      );
      if (res.status === 200) {
        const data = await res.json();
        setWorkerDetails(data.worker[0]);
        console.log(data.worker[0]);
      } else {
        console.error("Failed to fetch worker details");
      }
    } catch (error) {
      console.error("Error fetching worker details:", error);
    } finally {
      setIsLoading(false); // Hide loading indicator
    }
  };

  // Function to post review message
  const postReviewMessage = async () => {
    const user = await decodeJwtToken()._id;

    const payload = {
      user,
      reviewedProfileId: idParams,
      reviewMessage,
    };

    setIsLoading(true);
    try {
      const res = await fetch(`http://localhost:2000/review/set-review`, {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (res.status === 200) {
        const date = new Date();
        setWorkerReviews((prev) => [
          ...prev,
          {
            reviewMessage,
            createdAt: date.toDateString(),
            user: {
              picture: decodeJwtToken().picture,
              name: decodeJwtToken().name,
            },
          },
        ]);
      } else {
        console.error("Failed to post review");
      }
    } catch (error) {
      console.error("Error posting review message:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Function to get worker reviews
  const getWorkerReviews = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(
        `http://localhost:2000/review/get-review/${idParams}`
      );
      if (res.status === 200) {
        const data = await res.json();
        setWorkerReviews(data.data);
      } else {
        console.error("Failed to fetch reviews");
      }
    } catch (error) {
      console.error("Error fetching reviews:", error);
    } finally {
      setIsLoading(false);
    }
  };

  //function to handle post comments button click
  const handlePostCommentButtonClick = () => {
    if (reviewMessage) postReviewMessage();
    else {
      setAlertData({
        title: "Empty field",
        message: "Message should not be empty",
        type: "warning",
      });
      setIsAlertVisible(true);
      hideAlert();
    }
  };

  //handle click on message button
  const handleMessageButtonClick = async () => {
    const userId = await decodeJwtToken()._id;
  
    const payload = {
      userId,
      newContact: workerDetails.user._id,
      contactAnalytics: workerDetails.workerAnalytics._id,
    };
  
    setIsLoading(true);
  
    try {
      const res = await fetch("http://localhost:2000/message/add-user-contact", {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      const data = await res.json();
      console.log(data);
  
      if (data.success) {
        navigate("/message");
      } else {
        setAlertData({
          title: "Error",
          message: "Something went wrong, try again",
          type: "error",
        });
        setIsAlertVisible(true);
        hideAlert();
      }
    } catch (error) {
      console.error("Error adding user contact:", error);
      setAlertData({
        title: "Error",
        message: "An error occurred, please try again later.",
        type: "error",
      });
      setIsAlertVisible(true);
      hideAlert();
    } finally {
      setIsLoading(false); // Ensure loading state is turned off
    }
  };
  
  //time ago change time to time ago
  function timeAgo(date) {
    const now = new Date();
    const past = new Date(date);
    const diffMs = now - past;
    const diffSec = Math.floor(diffMs / 1000);
    const diffMin = Math.floor(diffSec / 60);
    const diffHr = Math.floor(diffMin / 60);
    const diffDay = Math.floor(diffHr / 24);
  
    if (diffSec < 60) return 'Just now';
    if (diffMin < 60) return `${diffMin} minute(s) ago`;
    if (diffHr < 24) return `${diffHr} hour(s) ago`;
    if (diffDay < 2) return 'Yesterday';
    return `${diffDay} day(s) ago`;
  }

  useEffect(() => {
    if (isUserLoggedIn()) {
      setUserDetails(decodeJwtToken());
    }
    getWorkerDetails();
    getWorkerReviews();
  }, []);

  return (
    <>
      {isAlertVisible && <Alert alertData={alertData} />}
      {workerDetails && workerDetails.user ? (
        <div>
          <div className="container mx-auto px-4 py-8">
            <p className="text-md mb-2 ml-1">
              <span className="font-bold">Category: </span>
              {workerDetails.workerCategory}
            </p>
            <div className="flex flex-wrap -mx-4">
              <div className="w-full md:w-1/2 px-4 mb-8">
                <img
                  src={`http://localhost:2000/${workerDetails.workerPicture}`}
                  alt="Product"
                  className="w-full h-auto rounded-lg shadow-md mb-4"
                  id="mainImage"
                />
              </div>

              <div className="w-full md:w-1/2 px-4">
                <h2 className="text-3xl font-bold mb-2">
                  {workerDetails.workerTagline}
                </h2>
                <div className="flex mb-4 items-center gap-2">
                  <img
                    src={`http://localhost:2000/${workerDetails.user.picture}`}
                    alt="User Avatar"
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <p className="text-gray-700">{workerDetails.user.name}</p>
                    <p className="text-xs">
                      Last active :{" "}
                      {timeAgo(workerDetails.workerAnalytics.lastActive) || "Not Known"}
                    </p>
                  </div>
                </div>
                <div className="flex gap-3 items-center">
                  <h3 className="text-md font-medium text-gray-500">
                    Location:
                  </h3>
                  <p className="text-md text-gray-700">
                    {workerDetails.user.location || "Unknown"}
                  </p>
                </div>
                <div className="flex items-center mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="size-6 text-yellow-500"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  <span className="ml-2 text-gray-600">
                    {workerDetails.workerAnalytics.averageRating
                      .toFixed()}
                    ({workerReviews.length} Review)
                  </span>
                  <span className="font-bold text-xl ml-2">.</span>
                  <span className="ml-2 text-gray-600">
                    {workerDetails.workerAnalytics.orderCompleted || 0} Orders
                    completed
                  </span>
                </div>
                <p className="text-gray-700 mb-6">
                  {workerDetails.workerDescription}
                </p>
                {isUserLoggedIn() && userDetails.type === "postWork" ? (
                  <>
                    <button
                      onClick={() => {
                        const params = new URLSearchParams();
                        params.append("pid", idParams);
                        params.append("tagline", workerDetails.workerTagline);
                        params.append("wid", workerDetails.user._id);
                        params.append("uid", userDetails._id);

                        navigate(`/hire-worker?${params.toString()}`);
                      }}
                      type="button"
                      className="text-white bg-black font-medium rounded-lg px-5 py-2.5 me-2"
                    >
                      Hire now
                    </button>
                    <button
                      onClick={handleMessageButtonClick}
                      type="button"
                      className="text-black bg-brandcolor  font-medium rounded-lg px-5 py-2.5 me-2"
                    >
                      Message
                    </button>
                  </>
                ) : (
                  <p>
                    <span className="font-bold">Note:</span> Only post work
                    profiles can hire workers
                  </p>
                )}
              </div>
            </div>

            <div className="w-full max-w-7xl px-4 md:px-5 lg:px-5 mx-auto">
              <div className="w-full flex-col justify-start items-start lg:gap-10 gap-3 inline-flex">
                <h2 className="text-gray-900 text-3xl font-bold font-manrope leading-normal">
                  {workerReviews.length} Reviews
                </h2>
                {workerReviews.map((review) => {
                  return (
                    <div className="w-full flex-col justify-start items-start gap-3 flex">
                      <div className="justify-start items-center gap-2.5 flex">
                        <div className="w-10 h-10 bg-gray-300 rounded-full justify-start items-start gap-2.5 flex">
                          <img
                            className="rounded-full object-cover"
                            src={`http://localhost:2000/${review.user.picture}`}
                            alt="UP"
                          />
                        </div>
                        <div className="flex-col justify-start items-start gap-1 inline-flex">
                          <h5 className="text-gray-900 text-sm font-semibold leading-snug">
                            {review.user.name}
                          </h5>
                          <h6 className="text-gray-500 text-xs font-normal leading-5">
                            {timeAgo(review.createdAt)}
                          </h6>
                        </div>
                      </div>
                      <p className="text-gray-800 text-sm font-normal leading-snug">
                        {review.reviewMessage}
                      </p>
                      <hr />
                    </div>
                  );
                })}
              </div>
              <div className="mt-5">
                <div className="py-2 px-4 mb-4 rounded-lg rounded-t-lg border w-full">
                  <textarea
                    onChange={(e) => setReviewMessage(e.target.value)}
                    id="comment"
                    rows="6"
                    className="px-0 w-full text-sm text-gray-900 outline-none"
                    placeholder="Write a comment..."
                    required
                  ></textarea>
                </div>
                <button
                  onClick={handlePostCommentButtonClick}
                  type="submit"
                  class="text-sm py-2.5 px-4 font-medium text-center rounded-lg bg-brandcolor"
                >
                  Post comment
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <ActivityIndicator />
      )}
    </>
  );
}

export default WorkersDetail;
