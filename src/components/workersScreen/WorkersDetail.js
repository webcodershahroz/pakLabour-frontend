import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate, useSearchParams } from "react-router-dom";

function WorkersDetail() {
  const [isLoading, setIsLoading] = useState(false);
  const [workerDetails, setWorkerDetails] = useState({});
  const [workerReviews, setWorkerReviews] = useState([]);

  const navigate = useNavigate();
  const [params] = useSearchParams();
  const idParams = params.get("id");
  const nameParams = params.get("name");
  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    type: "",
  });

  //decode jwt token from localstorage
  const decodeJwtToken = () => {
    const token = localStorage.getItem("token");
    const data = jwtDecode(token);
    return data.user;
  };

  //function that chect if user is logged in or not
  const isUserLoggedIn = () => {
    let isLoggedIn = localStorage.getItem("token");
    return isLoggedIn === null ? false : true;
  };

  //function that gets the worker details
  const getWorkerDetails = () => {
    setIsLoading(true);
    try {
      fetch(`http://localhost:2000/worker/get-worker/${idParams}`).then(
        async (res) => {
          const data = await res.json();
          setWorkerDetails(data.worker[0]);
          setIsLoading(false);
        }
      );
    } catch (error) {
      setIsLoading(false);
    }
  };

  //function to get reviews
  const getWorkerReviews = () => {
    setIsLoading(true);
    try {
      fetch(`http://localhost:2000/review/get-review/${idParams}`).then(
        async (res) => {
          if (res.status === 200) {
            const data = await res.json();
            setWorkerReviews(data.data);
            console.log(workerReviews)
          }
          else {

          }
        }
      );
    } catch (error) {
      setIsLoading(false);
    }
  };
  //function to get review posted time ago
  

  useEffect(() => {
    if (isUserLoggedIn()) {
      setUserDetails(decodeJwtToken());
    }
    getWorkerDetails();
    getWorkerReviews()
  }, []);

  return (
    <>
      <div>
        <div class="container mx-auto px-4 py-8">
          <p className="text-md mb-2 ml-1">
            <span className="font-bold">Category: </span>
            {workerDetails.workerCategory}
          </p>
          <div class="flex flex-wrap -mx-4">
            <div class="w-full md:w-1/2 px-4 mb-8">
              <img
                src={`http://localhost:2000/${workerDetails.workerPicture}`}
                alt="Product"
                class="w-full h-auto rounded-lg shadow-md mb-4"
                id="mainImage"
              />
            </div>

            <div class="w-full md:w-1/2 px-4">
              <h2 class="text-3xl font-bold mb-2">
                {workerDetails.workerTagline}
              </h2>
              <div class="flex mb-4 items-center gap-2">
                <img
                  src="https://cdn.vectorstock.com/i/500p/53/42/user-member-avatar-face-profile-icon-vector-22965342.jpg"
                  alt="User Avatar"
                  class="w-8 h-8 rounded-full"
                />
                <div>
                  <p class="text-gray-700">{workerDetails.workerName}</p>
                </div>
              </div>
              <div class="flex items-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  class="size-6 text-yellow-500"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                    clip-rule="evenodd"
                  />
                </svg>
                <span class="ml-2 text-gray-600">4.5 (120 reviews)</span>
              </div>
              <p class="text-gray-700 mb-6">
                {workerDetails.workerDescription}
              </p>
              {isUserLoggedIn() && userDetails.type === "postWork" ? (
                <button
                  onClick={() => navigate("/hire-worker")}
                  type="button"
                  class="text-white bg-black  font-medium rounded-lg px-5 py-2.5 me-2"
                >
                  Hire now
                </button>
              ) : (
                <p>
                  <span className="font-bold">Note:</span> Only post work
                  profiles can hire workers
                </p>
              )}
            </div>
          </div>

          <div class="w-full max-w-7xl px-4 md:px-5 lg:px-5 mx-auto">
            <div class="w-full flex-col justify-start items-start lg:gap-10 gap-3 inline-flex">
              <h2 class="text-gray-900 text-3xl font-bold font-manrope leading-normal">
                Reviews
              </h2>
              {workerReviews.map(review => {
                return (
                  <div class="w-full flex-col justify-start items-start gap-3 flex">
                    <div class="justify-start items-center gap-2.5 flex">
                      <div class="w-10 h-10 bg-gray-300 rounded-full justify-start items-start gap-2.5 flex">
                        <img
                          class="rounded-full object-cover"
                          src={review.userImgUrl}
                          alt="Jenny wilson image"
                        />
                      </div>
                      <div class="flex-col justify-start items-start gap-1 inline-flex">
                        <h5 class="text-gray-900 text-sm font-semibold leading-snug">
                          {review.userName}
                        </h5>
                        <h6 class="text-gray-500 text-xs font-normal leading-5">
                          {review.createdAt}
                        </h6>
                      </div>
                    </div>
                    <p class="text-gray-800 text-sm font-normal leading-snug">
                      {review.reviewText}
                    </p>
                    <hr />
                  </div>
                );
              })}
            </div>
            <div className="mt-5">
              <div class="py-2 px-4 mb-4 rounded-lg rounded-t-lg border w-full">
                <textarea
                  id="comment"
                  rows="6"
                  class="px-0 w-full text-sm text-gray-900 outline-none"
                  placeholder="Write a comment..."
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                class="text-sm py-2.5 px-4 font-medium text-center rounded-lg bg-brandcolor"
              >
                Post comment
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default WorkersDetail;
