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
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
            class="size-6 text-yellow-500">
            <path fill-rule="evenodd"
              d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
              clip-rule="evenodd" />
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
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
            class="size-6 text-yellow-500">
            <path fill-rule="evenodd"
              d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
              clip-rule="evenodd" />
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
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
            class="size-6 text-yellow-500">
            <path fill-rule="evenodd"
              d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
              clip-rule="evenodd" />
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
