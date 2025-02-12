import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import JobBids from "./JobBids";
import { StateContext } from "../../context/StateContext";

function JobsDetail() {
  const [searchParams] = useSearchParams();
  const title = searchParams.get("title");
  const id = searchParams.get("id");
  const type = searchParams.get("type");
  const navigate = useNavigate();
  const { isUserLoggedIn, decodeJwtToken } = useContext(StateContext);
   const [userDetails, setUserDetails] = useState({
      name: "",
      email: "",
      type: "",
    });
  

  const handleClickOnJobOrWorker = (type) => {
    //handle search button click
    const params = new URLSearchParams();
    params.append("title", title);
    params.append("type", type);
    params.append("id", id);

    navigate(`/job?${params.toString()}`);
  };

   useEffect(() => {
      if (isUserLoggedIn()) {
        setUserDetails(decodeJwtToken());
      }
    }, []);

  return (
    <>
      <div className="container mx-auto h-[fit-content] w-full mt-8 mb-2">
        <div className="tab-header flex gap-6 border-b border-gray">
          <button
            onClick={() => {
              handleClickOnJobOrWorker("job-details");
            }}
            className={`${
              type === "job-details" ? "underline" : ""
            } underline-offset-4 decoration-brandcolor decoration-4 hover:font-bold`}
          >
            Job details
          </button>
          <button
            onClick={() => {
              handleClickOnJobOrWorker("job-bids");
            }}
            className={`${
              type === "job-bids" ? "underline" : ""
            } underline-offset-4 decoration-brandcolor decoration-4 hover:font-bold`}
          >
            Bids
          </button>
        </div>
      </div>
      {type === "job-details" ? (
        <div class="container mx-auto px-4 py-8">
          <p className="text-md mb-2 ">
            <span className="font-bold">Category: </span>Electrition{" "}
          </p>
          <div class="flex flex-wrap -mx-4">
            <div class="md:w-3/4 px-4">
              <h2 class="text-3xl font-bold mb-2">
                I am a professional electrition Lorem ipsum, dolor sit amet
                consectetur adip.
              </h2>
              <div>
                <h2 className="font-bold text-gray-600">About the job:</h2>
                <p class="text-gray-700 text-justify">
                  Experience premium sound quality and industry-leading noise
                  cancellation with these wireless headphones. Perfect for music
                  lovers and frequent travelers. Lorem ipsum dolor, sit amet
                  consectetur adipisicing elit. Enim sint maxime non nulla
                  commodi alias, mollitia deleniti repellat id. Soluta ad ipsum,
                  commodi, enim minus obcaecati eveniet, debitis cupiditate
                  asperiores similique perferendis tempora nostrum quo ullam
                  praesentium quasi. Ad libero at culpa, necessitatibus aliquam
                  atque rerum eum soluta dolorem animi blanditiis cupiditate
                  reiciendis voluptate ratione alias dicta nobis nesciunt,
                  dolorum numquam. Repellat sunt voluptates doloremque dolores
                </p>
              </div>
              <div className="border px-10 py-5 rounded-lg w-fit my-3">
                <h2 className="font-bold text-gray-600">Price:</h2>
                <p class="text-gray-700 text-justify">PKR 20000</p>
              </div>
              {isUserLoggedIn() && userDetails.type === "worker" ? (
                <button
                  onClick={()=>{
                    const params = new URLSearchParams()
                    params.append("title","Job title")
                    params.append("id","4935kafjl2hda23")

                    navigate(`/apply-now?${params.toString()}`)
                  }}
                  type="button"
                  class="text-white bg-black  font-medium rounded-lg px-5 py-2.5 me-2"
                >
                  Apply now
                </button>
              ) : (
                <p><span className="font-bold">Note:</span> Only workers can apply for job</p>
              )}
            </div>
            <aside className="h-fit border p-3 m-3">
              <h2 className="font-bold">About the client:</h2>
              <div class="flex mb-4 gap-2 flex-col">
                <div className="flex items-center">
                  <img
                    src="https://cdn.vectorstock.com/i/500p/53/42/user-member-avatar-face-profile-icon-vector-22965342.jpg"
                    alt="User Avatar"
                    class="w-8 h-8 rounded-full"
                  />
                  <p class="text-gray-700">Muhammad Shahroz Shahzad</p>
                </div>
                <div className="flex items-center">
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
                  <p className="ms-2 text-sm font-bold text-black">5.0</p>
                  <span className="w-1 h-1 mx-1.5 bg-black rounded-full"></span>
                  <p className="text-sm font-medium text-black">115 reviews</p>
                </div>
                <div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mt-2">
                      Pakistan, Punjab
                    </h3>
                    <p className="text-sm">Jhelum, Dina , ChakAkka</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mt-2">
                      40 Orders
                    </h3>
                    <p className="text-sm">35 completed orders</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mt-2">
                      PKR 300000 spent
                    </h3>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      ) : (
        <JobBids />
      )}
    </>
  );
}

export default JobsDetail;
