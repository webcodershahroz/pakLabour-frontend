import React from "react";
import { Link } from "react-router-dom";

function Workers() {
  return (
    <>
      <div className="container mx-auto mb-10 flex gap-4 flex-wrap">
      <Link to={'/workers/shahroz'} className=" flex flex-col gap-2 w-72 items-center border border-stone-400 rounded cursor-pointer hover:bg-stone-100">
          <div className="relative w-full">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxowASx_actmSWTTuMdoVg6wk4ogpoGoQKhg&s"
              alt=""
              className="h-52 w-full border-b border-stone-400"
            />
            <img
              src="https://cdn.vectorstock.com/i/500p/53/42/user-member-avatar-face-profile-icon-vector-22965342.jpg"
              alt=""
              className="h-20 w-20 rounded-full absolute right-[36%] -bottom-10"
            />
          </div>
          <strong className="font-bold mt-8">Muhammad Shahroz</strong>
          <div className="flex items-center">
            <svg
              className="w-4 h-4 text-yellow-300 me-1"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 22 20"
            >
              <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
            </svg>
            <p className="ms-2 text-sm font-bold text-black">5.0</p>
            <span className="w-1 h-1 mx-1.5 bg-black rounded-full"></span>
            <p className="text-sm font-medium text-black">115 reviews</p>
          </div>
          <p className="text-justify p-2">
            I am a professional electrition Lorem ipsum, dolor sit amet
            consectetur adip.
          </p>
        </Link>
        <Link to={'/workers/awais_khalid'} className=" flex flex-col gap-2 w-72 items-center border border-stone-400 rounded cursor-pointer hover:bg-stone-100">
          <div className="relative w-full">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBnRX-5kBrtcIUs6xXcBR-Ueu61ndp68CBew&s"
              alt=""
              className="h-52 w-full border-b border-stone-400"
            />
            <img
              src="https://cdn.vectorstock.com/i/500p/53/42/user-member-avatar-face-profile-icon-vector-22965342.jpg"
              alt=""
              className="h-20 w-20 rounded-full absolute right-[36%] -bottom-10"
            />
          </div>
          <strong className="font-bold mt-8">Awais Khalid</strong>
          <div className="flex items-center">
            <svg
              className="w-4 h-4 text-yellow-300 me-1"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 22 20"
            >
              <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
            </svg>
            <p className="ms-2 text-sm font-bold text-black">4.9</p>
            <span className="w-1 h-1 mx-1.5 bg-black rounded-full"></span>
            <p className="text-sm font-medium text-black">114 reviews</p>
          </div>
          <p className="text-justify p-2">
            I am a professional electrition Lorem ipsum, dolor sit amet
            consectetur adip.
          </p>
        </Link>
        <Link to={'/workers/muhammad_awais'} className=" flex flex-col gap-2 w-72 items-center border border-stone-400 rounded cursor-pointer hover:bg-stone-100">
          <div className="relative w-full">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRY5Q2dehYcSatuSByM-xcyf0JVJ5nKgAS4SQ&s"
              alt=""
              className="h-52 w-full border-b border-stone-400"
            />
            <img
              src="https://cdn.vectorstock.com/i/500p/53/42/user-member-avatar-face-profile-icon-vector-22965342.jpg"
              alt=""
              className="h-20 w-20 rounded-full absolute right-[36%] -bottom-10"
            />
          </div>
          <strong className="font-bold mt-8">Muhammad Awais</strong>
          <div className="flex items-center">
            <svg
              className="w-4 h-4 text-yellow-300 me-1"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 22 20"
            >
              <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
            </svg>
            <p className="ms-2 text-sm font-bold text-black">4.95</p>
            <span className="w-1 h-1 mx-1.5 bg-black rounded-full"></span>
            <p className="text-sm font-medium text-black">87 reviews</p>
          </div>
          <p className="text-justify p-2">
            I am a professional electrition Lorem ipsum, dolor sit amet
            consectetur adip.
          </p>
        </Link>
        
      </div>
    </>
  );
}

export default Workers;
